import { Component, OnInit } from '@angular/core';
import { DietHarmonogramService } from '../diet-harmonogram.service';


@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  constructor(private dietHarmonogramService: DietHarmonogramService) { }

  ngOnInit(): void {
    this.dietHarmonogramService.GetDietHarmonogramData();
  }

}
