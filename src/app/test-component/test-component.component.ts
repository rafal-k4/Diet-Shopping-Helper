import { Component, OnInit } from '@angular/core';
import { GoogleSpreadsheetServiceService } from '../google-spreadsheet-service.service';
import { MappingProfileService } from '../mapping-profile.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  constructor(private sourceData: GoogleSpreadsheetServiceService,
              private mappingProfile: MappingProfileService) { }

  ngOnInit(): void {
    this.sourceData.GetData();
  }

}
