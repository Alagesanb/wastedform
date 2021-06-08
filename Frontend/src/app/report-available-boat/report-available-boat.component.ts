// Create Component for available boat report //Done By Alagesan on 21.05.2021	

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-available-boat',
  templateUrl: './report-available-boat.component.html',
  styleUrls: ['./report-available-boat.component.css']
})
export class ReportAvailableBoatComponent implements OnInit {
  adminlogin: any;

  constructor( private router: Router,) { }
// Create Component for available boat report //Done By Alagesan on 21.05.2021	

  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
  }

}
