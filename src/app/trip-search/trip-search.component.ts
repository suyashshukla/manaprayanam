import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-trip-search',
  templateUrl: './trip-search.component.html'
})
export class TripSearchComponent implements OnInit {

  @Output() isSearchPerformed = new EventEmitter<string>();

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.initializeApp();
  }

  searchForm = new FormGroup({
    query: new FormControl(),
  });

  initializeApp() {
    this.searchForm.get('query')?.valueChanges.subscribe(data => {
      if (data && data.length >= 3) {
        this.isSearchPerformed.emit(data);
      }
    });
  }
}
