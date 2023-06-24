import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'manaprayanam';

  searchString!: string;

  tripInfo: any[] = [];
  selectedTrip!: any;

  searchForm = new FormGroup({
    query: new FormControl()
  });

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.searchForm.get('query')?.valueChanges.subscribe(data => {
      this.selectedTrip = null;
      this.tripInfo = [];
      if (data && data.length >= 3) {
        this.appService.getTripInfoBySearchString(data).subscribe(tripData => this.tripInfo = tripData);
      }
    });
  }

  selectTrip(tripId: any) {
    this.appService.getTripDetails(tripId).subscribe(response => this.selectedTrip = response);
  }

  resetSelection() {
    this.selectedTrip = null;
    this.tripInfo = [];
    this.searchForm.reset();
  }

}
