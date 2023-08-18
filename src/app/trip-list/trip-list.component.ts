import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html'
})
export class TripListComponent implements OnInit {

  @Input() tripInfo: any[] = [];
  @Input() isVisible = true;
  @Input() queryString = null;

  constructor() { }

  ngOnInit(): void {
  }

  selectTrip(tripId: any) {

  }

}
