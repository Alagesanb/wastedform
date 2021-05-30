import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-report-boat',
  templateUrl: './report-boat.component.html',
  styleUrls: ['./report-boat.component.css']
})
export class ReportBoatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
  }

}
