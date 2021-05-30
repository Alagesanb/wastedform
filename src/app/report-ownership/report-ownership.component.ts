import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-ownership',
  templateUrl: './report-ownership.component.html',
  styleUrls: ['./report-ownership.component.css']
})
export class ReportOwnershipComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
  }

}
