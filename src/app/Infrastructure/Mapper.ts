import { ProductModel } from '../Models/ProductModel';



export class Mapper<TResult> {


  ToModel(input: Array<Array<string>>): Array<TResult> {

    let result: Array<TResult> = [];

    let asd = {} as TResult;




    // var something = Reflect.getPrototypeOf(asd);
    // console.log(something);

    input.forEach(tableRow => {
      tableRow.forEach(tableRecord => {
        console.log(tableRecord);
      });
    });

    return result;
  }

  Create<TResult>(input: {new (): TResult;}): TResult {
    return new input();
  }

  Create2<T>(input: new () => T): T {

    let something = new input();

    let asd = Object.getOwnPropertyNames(something);
    console.log(asd);

    //let asd = Reflect.getPrototypeOf(something);

    // const objectKeys = Object.keys(something) as Array<keyof T>;
    // for (let key of objectKeys)
    // {
    //    console.log('key:' + key);
    // }


    return something;
  }


  Test() {

    console.log(Object.getOwnPropertyNames(new Sasss()));
  }
}


class Sasss {

  public dda: string;

  constructor(dda: string) {
    this.dda = dda;
  }
}
