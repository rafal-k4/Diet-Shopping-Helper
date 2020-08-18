import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { NgForm } from '@angular/forms';
import { map, delay, flatMap, shareReplay } from 'rxjs/operators';
import { Observable, of, from, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ProductModel } from '../Models/ProductModel';
import { Reflection } from '../Infrastructure/Reflection';
import { AvailableDietsService } from '../available-diets.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, AfterViewInit {

  public longLastingProducts$: Observable<ProductModel[]>;
  public shortExpirationDateProducts$: Observable<ProductModel[]>;

  public days = DayOfWeek;
  public dietDays$: Observable<DietHarmonogramModel[]>;
  @ViewChild('dietDaysForm') form: NgForm;


  constructor(
    private dietHarmonogramService: DietHarmonogramService,
    private availableDiets: AvailableDietsService,
    private reflectionHelper: Reflection) { }

  ngOnInit(): void {

    const testSubj = new Subject<string>();
    const testBehaviorSubj = new BehaviorSubject<string>('Initial BEHAVIOR value');

    const testBehSubj = new BehaviorSubject<string>(null);


    const obs = testBehSubj.pipe(
      flatMap(x => {
        if (x) {
          return of(x);
        } else {
          return this.getAnotherObservable();
        }
        console.log(x, 'Inside testSubj flatMAP');
        return x;
      })
    );

    // testSubj.subscribe(x => {
    //   console.log(x, 'Inside testSubj SUBSCRIBE')
    // });

    obs.subscribe(x => {
      console.log(x, 'Inside obs SUBSCRIBE')
    })

    testBehSubj.next('BBBB')

    // const observable$ = testSubj.pipe(
    //   flatMap(x => this.getAnotherObservable())
    // );
    // const observable2$ = testSubj.asObservable();
    // const observable3$ = testBehaviorSubj.asObservable();

    testSubj.next('111');
    testBehaviorSubj.next('111')

    // observable3$.subscribe(x => {
    //   console.log(`obs3$ ${x}`);
    // })

    // observable2$.subscribe(x => {
    //   console.log(`obs2$ ${x}`);
    // })

    // observable$.subscribe(x => {
    //   console.log(`obs1$ ${x}`);
    // });

    testSubj.next('222');
    testSubj.next('333');
    testBehaviorSubj.next('222')
    testBehaviorSubj.next('333')

    // this.dietDays$ = this.availableDiets.getSelectedDietName()
    // .pipe(
    //   flatMap(dietName => this.dietHarmonogramService.getDietHarmonogramData(dietName)),
    //   shareReplay()
    // );

    // this.dietDays$.subscribe(x => {
    //   //console.log(`inside ShoppingListComponent:ngOnInit:dietDays$ value:`, x);
    // });

    // this.availableDiets.getSelectedDietName().subscribe(x => {
    //   //console.log(`inside ShoppingListComponent:ngOnInit:availableDiets.getSelectedDietName() value:`, x);
    // });
  }
  getAnotherObservable(): Observable<string> {
    return of('Initial VALUE');
  }

  ngAfterViewInit(): void {

    const selectedDays$ = this.form.valueChanges.pipe(
      delay(1), // delay(1) is neccessary because The valueChanges event fires
                // immediately after the new value is updated but before the change is bubbled up to its parent
                // without delay(1), dietDays is holding previous value
      flatMap(x => this.dietDays$),
      map(x => x.filter(y => y.isSelected))
    );

    const combinedProducts$ = selectedDays$.pipe(
      map(x => this.MergeAllProductIntoOneList(x))
    );

    this.longLastingProducts$ = combinedProducts$.pipe(
      map(x => {
        return x.filter(y => y.ProductDictionary.IsLongLastingProduct === true);
      }),
      map(x => {
        return x.sort(this.SortLogicCompareFunction);
      })
    );

    this.shortExpirationDateProducts$ = combinedProducts$.pipe(
      map(x => {
        return x.filter(y => y.ProductDictionary.IsLongLastingProduct === false);
      }),
      map(x => {
        return x.sort(this.SortLogicCompareFunction);
      })
    );

  }

  private SortLogicCompareFunction(a: ProductModel, b: ProductModel): number {
    return a.ProductDictionary.ProductName.localeCompare(b.ProductDictionary.ProductName);
  }

  private MergeAllProductIntoOneList(input: DietHarmonogramModel[]): ProductModel[] {
    const result: ProductModel[] = [];

    for (const dietDay of input) {
      for (const product of dietDay.Products) {

        const existingElement = result.find(x => x.ProductDictionaryId === product.ProductDictionaryId);

        if (existingElement) {
          result[result.indexOf(existingElement)].Weight = Number(result[result.indexOf(existingElement)].Weight) + Number(product.Weight);
        } else {

          result.push(this.reflectionHelper.deepClone(product));
        }
      }
    }

    return result;
  }

}
