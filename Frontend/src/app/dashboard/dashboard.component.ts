import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url = "http://65.2.28.16/api/Schedule"
  Booking: any=[];
  newBooking: any=[];
  todaysBooking: any=[];
  Cancellations: any=[];
  imgUrl = "http://65.2.28.16/api/uploads/"
  Cancels: any=[];

  constructor(private httpClient: HttpClient,private http: HttpClient ,private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) {
     }
  ngOnInit(): void {
this.getBooking()
this.getCancellations()
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");


    function selectDate(date) {
      $('.calendar-wrapper').updateCalendarOptions({
        date: date
      });
      
var defaultConfig = {
  weekDayLength: 1,
  date: new Date(),
  onClickDate: selectDate,
  showYearDropdown: true,
};

$('.calendar-wrapper').calendar(defaultConfig);

$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".dropdown-menu li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  
});

    }
  }
  getBooking(){
    this.http.get<any>(`${this.url}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
      console.log(data)
  this.Booking = data['response']

  this.Booking.forEach(element => {
    var obj2 = Object();
    var obj3 = Object();
   var date = new Date(element.Current_Time);
   var upadtedate = new Date(element.Updated_time);

   var dates = date.getDate()
   var todaysDate = new Date();

   var updatedates = upadtedate.getDate()
   var todaysDates = todaysDate.getDate()
if(dates  == todaysDates ){
//  obj2.Boat_Name = element.BoatDetails[0].Boat_Name,  
//  obj2.start_NoTime = element.start_NoTime,  
//  obj2.end_NoTime = element.end_NoTime,  
//  obj2.Boat_Image = element.BoatDetails[0].Boat_Image[0],  
//  obj2.First_Name = element.OwnerDetails[0].First_Name,  
//  obj2.Parking_Ability = element.OwnerDetails[0].Parking_Ability,  
 obj2 = element 

    this.todaysBooking.push(obj2);

   }
if(updatedates  == todaysDates ){
  // obj3.Boat_Name = element.Boat_Name,  
  // obj3.start_NoTime = element.start_NoTime,  
  // obj3.end_NoTime = element.end_NoTime,  
  // obj3.Boat_Image = element.BoatDetails[0].Boat_Image[0],  
  // obj3.First_Name = element.OwnerDetails[0].First_Name,  
  // obj3.Parking_Ability = element.OwnerDetails[0].Parking_Ability, 
  obj3 = element 

     this.newBooking.push(obj3);
 }

});
console.log(this.todaysBooking)
console.log(this.newBooking)

   }, err => {
   })
  }
  getCancellations(){
    this.http.get<any>(`${this.url}/ViewCancelledBooking`).subscribe(data => {
      console.log(data)
  this.Cancellations = data['response']
  this.Cancellations.forEach(element => {
    var obj4 = Object();
    var date = new Date(element.Current_Time);
    var dates = date.getDate()
    var todaysDate = new Date();
    var todaysDates = todaysDate.getDate()
    if(dates  == todaysDates ){
      //  obj2.Boat_Name = element.BoatDetails[0].Boat_Name,  
      //  obj2.start_NoTime = element.start_NoTime,  
      //  obj2.end_NoTime = element.end_NoTime,  
      //  obj2.Boat_Image = element.BoatDetails[0].Boat_Image[0],  
      //  obj2.First_Name = element.OwnerDetails[0].First_Name,  
      //  obj2.Parking_Ability = element.OwnerDetails[0].Parking_Ability,  
      obj4 = element 
      
          this.Cancels.push(obj4);
      
         }


  });
  console.log(this.Cancels)
   }, err => {
   })
  }
}
