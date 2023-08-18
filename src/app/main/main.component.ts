import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { NavigationItemType } from '../models/enums.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  isSearchSelection = true;
  tripInfo: any[] = [];
  selectedTrip!: any;

  selectedItemType = NavigationItemType.Search;
  navigationItemType = NavigationItemType;

  searchForm = new FormGroup({
    query: new FormControl(),
    from: new FormControl(),
    to: new FormControl(),
  });
  stops: any;
  fromStops: any;
  toStops: any;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getAllStops().subscribe((response: any) => {
      this.stops = this.fromStops = this.toStops = response;
    });
  }

  onStopSelected(stop: any, dropdown: 'from' | 'to') {
    if (dropdown == 'from') {
      this.toStops = this.stops.filter(
        (s: { stopId: any }) => s.stopId != stop.stopId
      );
    } else {
      this.fromStops = this.stops.filter(
        (s: { stopId: any }) => s.stopId != stop.stopId
      );
    }
  }

  searchTripsByQuery(query:string){
    this.appService
          .getTripInfoBySearchString(query)
          .subscribe((tripData: any[]) => {
            this.tripInfo = tripData;
          });
  }

  searchForTrips() {
    if (this.searchForm.value.from && this.searchForm.value.to) {
      this.appService
        .getTripDetailsByFromAndTwo(
          this.searchForm.value.from,
          this.searchForm.value.to
        )
        .subscribe((response: any[]) => {
          this.tripInfo = response;
        });
    }
  }

  selectTrip(tripId: any) {
    this.appService.getTripDetails(tripId).subscribe((response: any) => {
      this.selectedTrip = response;
      setTimeout(() => {
        this.initializeMap();
      }, 100);
    });
  }

  initializeMap() {
    var leaflet = (window as any).L;
    var tripLocation = [
      this.selectedTrip.latitude,
      this.selectedTrip.longitude,
    ];
    var map = leaflet.map('map').setView(tripLocation, 13);

    leaflet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(map);

    leaflet
      .marker(tripLocation)
      .addTo(map)
      .bindPopup('Your Trip is here!')
      .openPopup();

    navigator.geolocation.getCurrentPosition(
      (success: any) => {
        var currentLocation = [
          success.coords.latitude,
          success.coords.longitude,
        ];
        var latlang = [[tripLocation, currentLocation]];

        var polyline = leaflet.polyline(latlang, { color: 'orange' });

        polyline.addTo(map);

        leaflet
          .marker(currentLocation)
          .addTo(map)
          .bindPopup('You are here!')
          .openPopup();
      },
      () => { }
    );
  }

  getTripsByLocation() {
    navigator.geolocation.getCurrentPosition(
      (success: any) => {
        this.appService.getTripsByLocation(success.coords.latitude, success.coords.longitude).subscribe((response) => {
          this.tripInfo = response
        });
      },
      () => { }
    );
  }

  setSelectedPane(isSearchSelection: boolean) {
    this.isSearchSelection = isSearchSelection;
    this.resetSelection();
  }

  setSelectedItem(selectedItemType: NavigationItemType) {
    this.selectedItemType = selectedItemType;
    this.resetSelection();
    if (this.selectedItemType === NavigationItemType.SmartSearch) {
      this.getTripsByLocation();
    }
  }

  isNavigationItemType(navigationItemType: NavigationItemType) {
    return this.selectedItemType === navigationItemType;
  }

  resetSelection(isForceFetch = false) {
    this.selectedTrip = null;
    this.tripInfo = [];
    this.searchForm.reset();
    if (isForceFetch) {
      this.getTripsByLocation();
    }
  }

  get isFormValid() {
    return this.searchForm.value.to && this.searchForm.value.from;
  }

  get isTopSpacingRequired() {
    return this.isNavigationItemType(NavigationItemType.SourceDestination);
  }
}
