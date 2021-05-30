import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-available-boat',
  templateUrl: './report-available-boat.component.html',
  styleUrls: ['./report-available-boat.component.css']
})
export class ReportAvailableBoatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
  }

}
