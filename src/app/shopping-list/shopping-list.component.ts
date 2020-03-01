import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';
import { DietHarmonogramModel } from '../Models/DietHarmonogramModel';
import { DayOfWeek } from '../Infrastructure/DayOfWeek';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, AfterViewInit {


  public days = DayOfWeek;
  public dietDays: DietHarmonogramModel[];
  @ViewChild('form')
  form: NgForm;

  oneCheckbox: any;

  constructor(private dietHarmonogramService: DietHarmonogramService) { }

  ngOnInit(): void {
    this.dietHarmonogramService.getDietHarmonogramData({ fillRelatedObjects: true }).subscribe(x => {
      this.dietDays = x;
    });

  }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(x => {
      console.log(x);
    })
  }

}
