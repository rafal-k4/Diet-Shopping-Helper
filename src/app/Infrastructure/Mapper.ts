

export class Mapper<TResult> {

  private type: new () => TResult;

  constructor(inputType: new () => TResult) {
    this.type = inputType;
  }

  ToModel(input: Array<Array<string>>): Array<TResult> {

    let asd = new this.type();

    input.forEach(tableRow => {
      tableRow.forEach(tableRecord => {
        //console.log(tableRecord);
      });
    });

    return null;
  }

  Create<TResult>(input: {new (): TResult;}): TResult {
    return new input();
  }

  Create2<T>(input: new () => T): T {

    let something = new input();

    let asd = Object.getOwnPropertyNames(something);
    // console.log(asd);

    //let asd = Reflect.getPrototypeOf(something);

    // const objectKeys = Object.keys(something) as Array<keyof T>;
    // for (let key of objectKeys)
    // {
    //    console.log('key:' + key);
    // }


    return something;
  }


  Test() {

    //console.log(Object.getOwnPropertyNames(new Sasss()));
  }
}


class Sasss {

  public dda: string;

  constructor(dda: string) {
    this.dda = dda;
  }
}
