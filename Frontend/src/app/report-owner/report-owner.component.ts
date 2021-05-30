import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-owner',
  templateUrl: './report-owner.component.html',
  styleUrls: ['./report-owner.component.css']
})
export class ReportOwnerComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
  }

}
