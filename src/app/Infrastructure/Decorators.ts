

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
    const key: string = this.propertyToColumnName.get(keyName);

    console.log(key);

    return (!key) ? key : '';
  }

  private static getKeyName(target: any, property: string) {
    return `${target.constructor.name}.${property}`;
  }
}
