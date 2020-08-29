import { Injectable } from '@angular/core';
import { SelectedDayIndicator } from './Models/SelectedDayIndicator';
import { Reflection } from './Infrastructure/Reflection';
import { DayOfWeek } from './Infrastructure/DayOfWeek';

@Injectable({
  providedIn: 'root'
})
export class DaySelectorService {

  private selectedDays: SelectedDayIndicator[] = [];

  constructor(private reflectionHelper: Reflection) { 
    const weekDays = this.reflectionHelper.getValuesOfEnum(DayOfWeek);
    for(const d of weekDays) {
      this.selectedDays.push({
        day: d,
        isSelected: false
      });
    }
  }

  public GetSelectedDays(): SelectedDayIndicator[] {
    return this.selectedDays;
  }
}
