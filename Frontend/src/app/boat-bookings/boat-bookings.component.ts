import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';

declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-boat-bookings',
  templateUrl: './boat-bookings.component.html',
  styleUrls: ['./boat-bookings.component.css']
})
// Create Component for boat bookings//Done By Alagesan on 20.05.2021
export class BoatBookingsComponent implements OnInit {

  BookingUrl = "http://65.2.28.16/api/Schedule";
  imagePath= "http://65.2.28.16/api/uploads/";
  url = "http://65.2.28.16/api/Boat";

  bookingInfo: any;
  searchLoction: any = '';
  previousDate:any;
  launchDate:any;
  launchDates: string;
  preLaunchDates: string;
  form: FormGroup;
  boatbookingform: FormGroup;
  submitted = false;
  LanchTYpe: any;
  allBookings: any;

  Location_Name_dropDown: any = "Location";
  Launch_Date_DropDown: any = "Launch Date";
  adminlogin: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router,) { }

// Create Component for boat bookings//Done By Alagesan on 20.05.2021
  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    this.boatbookingform = this.fb.group({
    From_Date: new FormControl('', [Validators.required,]),
    To_Date: new FormControl('', [Validators.required,]),
    DateType: new FormControl('', []),
    });

    sessionStorage.setItem("relodePg_book-for-owner","1");
    sessionStorage.setItem("Adminbooking-relodePg","1");
    sessionStorage.setItem("boat-maintenance-reload","1");
    sessionStorage.setItem("view-boat-reload","1");

    setInterval(function() {

     
 

      if($("#datepicker").val() == "NaN/NaN/NaN"){
        $("#datepicker").val("");
      }
      if($("#datepicker-2").val() == "NaN/NaN/NaN"){
        $("#datepicker-2").val("");
      }
    
           
  }, 500);

  $('#datepicker').Zebra_DatePicker({
    
    //format: 'm/d/yyyy',
    direction: true,
    pair: $('#datepicker-2')
    

});

$('#datepicker-2').Zebra_DatePicker({
  //format: 'm/d/yyyy',
  direction: 1,

});
 
    this.getBooking();

  }

  setLanDates(obj){

    


    this.LanchTYpe = obj.target.innerHTML

    this.Launch_Date_DropDown = obj.target.innerHTML;

   

  }
  
  fromDate($event)
  {
    this.previousDate = $event.target.value;

    var preLS = new Date( this.previousDate);
    this.preLaunchDates = preLS.getFullYear() + '-'+(preLS.getMonth()+1)+'-' + (preLS.getDate());
    console.log(this.preLaunchDates);
    this.boatbookingform.get('From_Date').setValue(this.preLaunchDates);
  }
  toDate($event)
  {
    this.launchDate = $event.target.value;

    var sumerS = new Date( this.launchDate);
    this.launchDates = sumerS.getFullYear()+ '-'+(sumerS.getMonth()+1)+'-' + (sumerS.getDate()) ;

    console.log( this.launchDates );
    this.boatbookingform.get('To_Date').setValue(this.launchDates);

  }

  lunchdateChange(newValue) {
    console.log(newValue);
  }

  getSearchData(){
    this.submitted = true;
    this.boatbookingform.get('From_Date').setValue(this.preLaunchDates);
    this.boatbookingform.get('To_Date').setValue(this.launchDates);
   
    if (this.boatbookingform.invalid) {
      return;
  }
   
   
    this.boatbookingform.get('DateType').setValue(this.LanchTYpe);
    this.http.post<any>(`${this.url}/LaunchFilter`,  this.boatbookingform.value   ).subscribe(data => {
      this.bookingInfo = data['response']
        }, err => {
          console.log(err);
        })

  }
  
  getBooking(){
    this.http.get<any>(`${this.BookingUrl}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
     
    this.bookingInfo = data['response'];

    console.log(this.bookingInfo);

   }, err => {
   })
  }

}
