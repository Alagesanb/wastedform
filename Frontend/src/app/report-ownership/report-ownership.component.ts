import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-ownership',
  templateUrl: './report-ownership.component.html',
  styleUrls: ['./report-ownership.component.css']
})
export class ReportOwnershipComponent implements OnInit {
  adminlogin: any;

  
  constructor(private router: Router,) { }

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
