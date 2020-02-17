

export function ColumnName(name: string) {
  return (target: any, propertyKey: string) => {
    console.log(target, propertyKey, name);
    console.log(target.constructor.name);
    console.log(ColumnNameProvider.getKeyName(target,propertyKey));
  };
}

export class ColumnNameProvider {

  private static propertyToColumnName: Map<string, string>  = new Map();

  static RegisterColumnName(target: any, property: string, name: string) {
    let keyName = this.getKeyName(target, property);
    let keys: string[] = this.propertyToColumnName.get(keyName);
    if(!keys) {
      
    }
  }

  static getKeyName(target: any, property: string) {
    return `${target.constructor.name}.${property}`;
  }
}
