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
// Create Component for cancellation//Done By Alagesan on 20.05.2021	

export class CancellationComponent implements OnInit {

  cancellationUrl = "http://65.2.28.16/api/Schedule"  
  imagePath= "http://65.2.28.16/api/uploads/";
  cancellationInfo: any;
  searchLoction: any = '';
  adminlogin: any;
  searchLoctions: any = '';
  Location_Name_dropDown: any = "Location";
  url = "http://65.2.28.16/api/Boat";
  loctions: any=[];
  bookingPushData: any[];
  cancellationData: any=[];

  constructor(private http: HttpClient, private router: Router,) { }
  
// Create Component for cancellation//Done By Alagesan on 20.05.2021	

  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    sessionStorage.setItem("relodePg_book-for-owner","1");
    sessionStorage.setItem("Adminbooking-relodePg","1");
    sessionStorage.setItem("boat-maintenance-reload","1");
    sessionStorage.setItem("view-boat-reload","1");
    this.getCancelInfo();
this.getLoction()
  }
  getLoction(){
    this.http.get<any>(`${this.url}/GetLocation`).subscribe(data => {
     
  this.loctions = data['response']
  console.log(this.loctions)
   }, err => {
   })
  }
  getCancelInfo(){
    this.http.get<any>(`${this.cancellationUrl}/ViewCancelledBooking`).subscribe(data => {
     
    this.cancellationInfo = data['response'];
this.cancellationData = this.cancellationInfo
    console.log(this.cancellationInfo);

   }, err => {
   })
  }
  getLoctionTypeId(ids){
    this.bookingPushData =[]
    // this.bookingInfo =[]
    // this.getBooking()
    console.log(ids._id)
    // this.bookingDats = this.bookingInfo
    this.Location_Name_dropDown = ids.Boat_Location;
// console.log(this.bookingInfo)

    this.cancellationData.forEach(boat => {
      
			if(ids._id == boat.BoatDetails[0].Location_Id){
	      console.log(boat.BoatDetails[0].Location_Id)

        this.bookingPushData.push(boat)
        
			}
      });
      
console.log(this.bookingPushData)
this.cancellationInfo = this.bookingPushData
console.log(this.cancellationInfo)
    // console.log(id)
  }

  // Location dropdown clear for cancellation //Done By Alagesan on 25.06.2021	
  pageRefresh(){
    location.reload();
  }

}
