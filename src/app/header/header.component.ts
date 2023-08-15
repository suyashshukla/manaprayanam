import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isSearchSelection = true;
  tripInfo: any[] = [];
  selectedTrip!: any;
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.initializeApp();
  }
  
  searchForm = new FormGroup({
    query: new FormControl(),
    from: new FormControl(),
    to: new FormControl()
  });

  initializeApp(){
    this.searchForm.get('query')?.valueChanges.subscribe(data => {
      this.selectedTrip = null;
      this.tripInfo = [];
      if (data && data.length >= 3) {
        this.appService.getTripInfoBySearchString(data).subscribe(tripData => this.tripInfo = tripData);
      }
    });
  }
}
