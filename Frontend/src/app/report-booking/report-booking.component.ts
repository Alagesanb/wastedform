import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-report-booking',
  templateUrl: './report-booking.component.html',
  styleUrls: ['./report-booking.component.css']
})
export class ReportBookingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
  }

}
