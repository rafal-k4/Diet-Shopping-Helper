

export function ColumnName(name: string) {
  return (target: any, propertyKey: string | symbol) => {
    console.log(target, propertyKey, name);
  };
}
