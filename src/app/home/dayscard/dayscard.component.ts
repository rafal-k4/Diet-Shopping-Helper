import { Component, Input } from '@angular/core';
import { DietHarmonogramModel } from 'src/app/Models/DietHarmonogramModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dayscard',
  templateUrl: './dayscard.component.html',
  styleUrls: ['./dayscard.component.css']
})
export class DayscardComponent {

  @Input() dietHarmonogram$: Observable<DietHarmonogramModel[]>;

  constructor() { }


}
