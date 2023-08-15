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

  selectedPane = 1;
  stops: Array<any> = [];

  fromStops: Array<any> = [];
  toStops: Array<any> = [];

  tripInfo: any[] = [];
  selectedTrip!: any;

  searchForm = new FormGroup({
    query: new FormControl(),
    from: new FormControl(),
    to: new FormControl()
  });

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getAllStops().subscribe(response => {
      this.stops = this.fromStops = this.toStops = response;
      this.initializeApp();
    });
  }

  onStopSelected(stop: any, dropdown: 'from' | 'to') {
    if (dropdown == 'from') {
      this.toStops = this.stops.filter(s => s.stopId != stop.stopId);
    }
    else {
      this.fromStops = this.stops.filter(s => s.stopId != stop.stopId);
    }
  }

  initializeApp() {
    this.searchForm.get('query')?.valueChanges.subscribe(data => {
      this.selectedTrip = null;
      this.tripInfo = [];
      if (data && data.length >= 3) {
        this.appService.getTripInfoBySearchString(data).subscribe(tripData => this.tripInfo = tripData);
      }
    });
  }

  searchForTrips() {
    if (this.searchForm.value.from && this.searchForm.value.to) {
      this.appService.getTripDetailsByFromAndTwo(this.searchForm.value.from, this.searchForm.value.to).subscribe(response => this.tripInfo = response);
    }
  }

  getTripsByLocation() {
    this.setSelectedPane(3);

    navigator.geolocation.getCurrentPosition(
      (success: any) => {
        var currentLocation = [
          success.coords.latitude,
          success.coords.longitude,
        ];
        this.appService.getTripsByLocation(currentLocation[0] + '', currentLocation[1] + '').subscribe((response) => {
          this.tripInfo = response
        });
      },
      () => {}
    );
  }

  selectTrip(tripId: any) {
    this.appService.getTripDetails(tripId).subscribe(response => {
      this.selectedTrip = response;
      setTimeout(() => {
        this.initializeMap();
      }, 100);
    });
  }

  initializeMap() {
    var leaflet = (window as any).L;
    var tripLocation = [this.selectedTrip.latitude, this.selectedTrip.longitude]
    var map = leaflet.map('map').setView(tripLocation, 13);

    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    leaflet.marker(tripLocation).addTo(map)
      .bindPopup('Your Trip is here!')
      .openPopup();


    navigator.geolocation.getCurrentPosition((success: any) => {
      var currentLocation = [success.coords.latitude, success.coords.longitude];
      var latlang = [
        [tripLocation, currentLocation]
      ];

      var polyline = leaflet.polyline(latlang, { color: 'orange' });

      polyline.addTo(map);

      leaflet.marker(currentLocation).addTo(map)
        .bindPopup('You are here!')
        .openPopup();
    }, () => {
    });
  }

  setSelectedPane(selectedPane: number) {
    this.selectedPane = selectedPane;
    this.resetSelection();
  }

  resetSelection() {
    this.selectedTrip = null;
    this.tripInfo = [];
    this.searchForm.reset();
  }

  get isFormValid() {
    return this.searchForm.value.to && this.searchForm.value.from;
  }
}
