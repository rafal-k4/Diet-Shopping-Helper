import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GoogleSpreadsheetServiceService {

  constructor(private client: HttpClient) { }

  GetData(): void {
    console.log('test');
    const result = this.client.get('https://sheets.googleapis.com/v4/spreadsheets/14XfoviNIHEKwYuDQmpftSTXMgzYkOg6opGgelDVd3u4/values/'
    + 'SampleData?key=AIzaSyAUtMby0c79odjBvwWhjkSKhyLLvhB0APo');

    let subs = result.subscribe(x => console.log(x));

    console.log(subs);
  }
}
