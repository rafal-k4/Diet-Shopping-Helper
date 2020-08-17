

export function columnName(name: string) {
  return (target: any, propertyKey: string) => {
      ColumnNameProvider.registerColumnName(target, propertyKey, name);
  };
}

export class ColumnNameProvider {

  private static propertyToColumnName: Map<string, string>  = new Map();

  static registerColumnName(target: any, property: string, name: string): void {
    const keyName = this.getKeyName(target, property);
    const keys: string = this.propertyToColumnName.get(keyName);

    if (!keys) {
      this.propertyToColumnName.set(keyName, name);
    }
  }

  static getColumnNameDecoratorValue(target: any, property: string): string {
    const keyName = this.getKeyName(target, property);
    const decoratorValue: string = this.propertyToColumnName.get(keyName);

    return decoratorValue ? decoratorValue : property;
  }

  private static getKeyName(target: any, property: string) {
    // Key must be unique!
    // javascript files compiled from typescript by Angular are MINIFIED
    // as a result target.constructor.name mostly is just 't', the original class name is minified.
    // So when two properties in different classes has same name for example Id, only one Key will be added
    // which in most cases will result in BUGS! (one scenario was that select options doesn't had Id Values)
    // and what is important they are pretty nasty BUGS, because only detectable after .ts file compilation
    //
    // as a fix, instead of target.constructor.name (which can be repeatable due to minifiaction), we can use target.constructor.toString()
    // result of this is key similar to this: key: "class t{constructor(t="",e=""){this.id=t,this.displayname=e}}.displayname"
    //                                        value: "SheetDisplayName"
    // so key right now will be class with its constructor implementation -> which should be unique!

    return `${(target.constructor.toString() as string).toLowerCase()}.${property.toLowerCase()}`;
  }
}
