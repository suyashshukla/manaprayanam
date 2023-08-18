import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavigationItemType } from '../models/enums.model';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html'
})
export class BottomNavigationComponent implements OnInit {
  isSearchSelection = true;
  tripInfo: any[] = [];
  selectedTrip!: any;
  navigationItemType = NavigationItemType;
  selectedItemType = NavigationItemType.Search;
  @Output() itemSelected = new EventEmitter<NavigationItemType>();

  searchForm = new FormGroup({
    query: new FormControl(),
    from: new FormControl(),
    to: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  setSelectedPane(selectedItemType: NavigationItemType) {
    this.selectedItemType = selectedItemType;
    this.itemSelected.emit(selectedItemType);
  }

  isItemSelected(itemType: NavigationItemType){
    return this.selectedItemType === itemType;
  }

  resetSelection() {
    this.selectedTrip = null;
    this.tripInfo = [];
    this.searchForm.reset();
  }
}
