import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.css']
})
export class CancellationComponent implements OnInit {

  cancellationUrl = "http://65.2.28.16/api/Schedule"  
  imagePath= "http://65.2.28.16/api/uploads/";
  cancellationInfo: any;
  searchLoction: any = '';
  adminlogin: any;

  constructor(private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    sessionStorage.setItem("relodePg_book-for-owner","1");
    sessionStorage.setItem("Adminbooking-relodePg","1");
    sessionStorage.setItem("boat-maintenance-reload","1");

    this.getCancelInfo();

  }

  getCancelInfo(){
    this.http.get<any>(`${this.cancellationUrl}/ViewCancelledBooking`).subscribe(data => {
     
    this.cancellationInfo = data['response'];

    console.log(this.cancellationInfo);

   }, err => {
   })
  }

}
