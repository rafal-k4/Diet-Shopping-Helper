import { Component, Input } from '@angular/core';
import { DietHarmonogramModel } from 'src/app/Models/DietHarmonogramModel';
import { Observable } from 'rxjs';
import { DayOfWeek } from 'src/app/Infrastructure/DayOfWeek';

@Component({
  selector: 'app-dayscard',
  templateUrl: './dayscard.component.html',
  styleUrls: ['./dayscard.component.css']
})
export class DayscardComponent {

  days = DayOfWeek;

  @Input() dietHarmonogram$: Observable<DietHarmonogramModel[]>;

  constructor() { }


}
