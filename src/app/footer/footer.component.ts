import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NavigationItemType } from '../models/enums.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isSearchSelection = true;
  tripInfo: any[] = [];
  selectedTrip!: any;
  navigationItemType = NavigationItemType;
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
   // this.isSearchSelection = isSearchSelection;
    //this.resetSelection();
    this.itemSelected.emit(selectedItemType);
  }

    resetSelection() {
    this.selectedTrip = null;
    this.tripInfo = [];
    this.searchForm.reset();
  }
}
