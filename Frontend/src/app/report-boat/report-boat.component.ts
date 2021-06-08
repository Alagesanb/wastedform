// Create Component for boat report //Done By Alagesan on 25.05.2021	
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-report-boat',
  templateUrl: './report-boat.component.html',
  styleUrls: ['./report-boat.component.css']
})
export class ReportBoatComponent implements OnInit {
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
 sessionStorage.setItem("view-boat-reload","1");
  }

}
// Create Component for boat report //Done By Alagesan on 25.05.2021	
