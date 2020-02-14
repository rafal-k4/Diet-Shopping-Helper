


export class Mapper<TResult> {


  ToModel(input: Array<Array<string>>): Array<TResult> {

    let result: Array<TResult> = [];

    let asd = new {} as TResult;

    var something = Reflect.getPrototypeOf(asd);
    console.log(something);

    input.forEach(tableRow => {
      tableRow.forEach(tableRecord => {
        console.log(tableRecord);
      });
    });

    return result;
  }
}
