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
  url_Boat = "http://65.2.28.16/api/Boat"
  url_Boat_Shedule = "http://65.2.28.16/api/Schedule";
  Booking: any=[];
  newBooking: any=[];
  todaysBooking: any=[];
  Cancellations: any=[];
  imgUrl = "http://65.2.28.16/api/uploads/"
  Cancels: any=[];
  adminlogin: any;

  New_Booking_Count:any = 0;
  Todays_Booking_Count:any = 0;
  Cancellations_Count:any = 0;
  Stand_by_Booking_Count:any = 0;

  searchLoction: any = '';
  searchLoction_Boat: any = '';
  loctions: any=[];
  Location_Name_dropDown: any = "Select Location";
  Boat_Name_dropDown :any = "Select Boat";
  allBoats: any;
  dropdown_Boat_List: any = [];
  Stand_by_Booking :any = [];

  public_LocationType_id :any = null;
  public_baotType_Single_id :any = null;
  searchText: any = '';

  constructor(private httpClient: HttpClient,private http: HttpClient ,private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) {
     }
  ngOnInit(): void {
      this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
      if(this.adminlogin==false){
        this.router.navigate(['']);
      }
  this.getBooking();
  //this.getCancellations();
  this.getLoction();
  this.getAllBoat();

        sessionStorage.setItem("relodePg_book-for-owner","1");
        sessionStorage.setItem("Adminbooking-relodePg","1");
        sessionStorage.setItem("boat-maintenance-reload","1");
        sessionStorage.setItem("view-boat-reload","1");

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

   getFormattedDate_WithOut_Zero_Time(dateVal) {
    var newDate = new Date(dateVal);

    var sMonth = this.padValue(newDate.getMonth() + 1);
    var sDay = this.padValue(newDate.getDate());
    var sYear = newDate.getFullYear();  
    
    return sDay + "-" + sMonth + "-" + sYear;
}

 padValue(value) {
  return (value < 10) ? "0" + value : value;
}




  getBooking(){
    this.http.get<any>(`${this.url}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
     
      
      this.Booking = data['response']
      this.Booking.forEach(element => {
        
       
      var date = new Date(element.Current_Time);
      var upadtedate = new Date(element.Updated_time);
       

      var dates = date.getDate()
      var todaysDate = new Date();

      var updatedates = upadtedate.getDate();
      var todaysDates = todaysDate.getDate();

      var to_date = new Date();
      var to_date_only = this.getFormattedDate_WithOut_Zero_Time(to_date);// to_date.getDay();

      var start_Date = new Date(element.start);
      var start_Date_only = this.getFormattedDate_WithOut_Zero_Time(start_Date); //start_Date.getDay();

      

    if(to_date_only  == start_Date_only ){

      var obj_s = Object();

      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

      this.todaysBooking.push(obj_s);


      }      

     



    //obj2 = element; 
      

      }
    if(updatedates  == todaysDates ){      
      var obj_s = Object();

      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 
      this.newBooking.push(obj_s);


      }      

      
    }

    if(element.Is_StandByBooking == true){

      var obj_s = Object();

      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

      this.Stand_by_Booking.push(obj_s);


      }      


    }

    //this to start..................





    });

    

    this.Cancellations = data['Cancelledresponse']
    this.Cancellations.forEach(element => {
      var obj4 = Object();
      var date = new Date(element.Current_Time);
      var dates = date.getDate()
      var todaysDate = new Date();
      var todaysDates = todaysDate.getDate()
      if(dates  == todaysDates )
      {
        
        var obj_s = Object();
    
        if(element.BoatDetails.length !== 0){
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
  
        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
         this.Cancels.push(obj_s);
  
  
        }      
        
        
        // obj4 = element       
        //     this.Cancels.push(obj4);
        
      }
  
  
    });
  
    this.Cancellations_Count = this.Cancels.length;
    this.New_Booking_Count = this.newBooking.length;
    this.Todays_Booking_Count = this.todaysBooking.length;
    this.Stand_by_Booking_Count = this.Stand_by_Booking.length;

   }, err => {
   })
  }
  

  // getCancellations(){
  //   this.http.get<any>(`${this.url}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
     

  
  //  }, err => {
  //  })
  // }

  getLoction(){
    this.http.get<any>(`${this.url_Boat}/GetLocation`).subscribe(data => {    
     
  this.loctions = data['response']
  
   }, err => {
   })
  }

  getAllBoat(){

    var obj = Object();
             obj.alphabet = "";
           this.http.post<any>(`${this.url_Boat_Shedule}/GetBoatNames`, obj).subscribe(data => { 
             this.dropdown_Boat_List = data.response;                   
                     
             }, err => {
               console.log(err);
             })

  }
  getLoctionTypeId_Boat(loc){

    
  this.public_baotType_Single_id = loc._id;

    this.newBooking = [];
    this.Stand_by_Booking = [];
    this.todaysBooking = [];
    
    this.http.get<any>(`${this.url}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
     
      this.Booking = data['response']
      this.Booking.forEach(element => {
        var obj2 = Object();
        var obj3 = Object();
      var date = new Date(element.Current_Time);
      var upadtedate = new Date(element.Updated_time);

      var dates = date.getDate();
      var todaysDate = new Date();

      var updatedates = upadtedate.getDate();
      var todaysDates = todaysDate.getDate();


      var to_date = new Date();
      var to_date_only = this.getFormattedDate_WithOut_Zero_Time(to_date);// to_date.getDay();

      var start_Date = new Date(element.start);
      var start_Date_only = this.getFormattedDate_WithOut_Zero_Time(start_Date); //start_Date.getDay();




      if(to_date_only  == start_Date_only ){

        var obj_s = Object();
  
        if(element.BoatDetails.length !== 0){
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;

        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
         this.todaysBooking.push(obj_s);
  

        }      
  
        
        }
    
    if(updatedates  == todaysDates ){      
      var obj_s = Object();

      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 
      this.newBooking.push(obj_s);

      }      

      

    }

    
    if(element.Is_StandByBooking == true){

      var obj_s = Object();

      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

      this.Stand_by_Booking.push(obj_s);


      }      


    }
  
  
  
  });


  ///

  this.Cancellations = data['Cancelledresponse']
  this.Cancellations.forEach(element => {
    var obj4 = Object();
    var date = new Date(element.Current_Time);
    var dates = date.getDate()
    var todaysDate = new Date();
    var todaysDates = todaysDate.getDate()
    if(dates  == todaysDates )
    {
      
      var obj_s = Object();
  
      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;
      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

       this.Cancels.push(obj_s);


      }     
           
    }


  });

  //

    this.Boat_Name_dropDown = loc.Boat_Name;    
    
  if(this.public_LocationType_id == null)
  {    
    this.newBooking = this.newBooking.filter(x => x.Boat_Id == loc._id);
    this.todaysBooking = this.todaysBooking.filter(x => x.Boat_Id == loc._id);
    this.Cancels = this.Cancels.filter(x => x.Boat_Id == loc._id);
    this.Stand_by_Booking = this.Stand_by_Booking.filter(x => x.Boat_Id == loc._id);
  }
  else
  {

    this.newBooking = this.newBooking.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);
    this.todaysBooking = this.todaysBooking.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);
    this.Cancels = this.Cancels.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);
    this.Stand_by_Booking = this.Stand_by_Booking.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);


  }
    
    this.New_Booking_Count = this.newBooking.length;
    this.Todays_Booking_Count = this.todaysBooking.length;
    this.Cancellations_Count = this.Cancels.length;
    this.Stand_by_Booking_Count = this.Stand_by_Booking.length;

   }, err => {
   });

  }

  getLoctionTypeId(loc){

  this.public_LocationType_id = loc._id;
 
   
   
    this.newBooking = [];
    this.Stand_by_Booking = [];
    this.todaysBooking = [];
    
    this.http.get<any>(`${this.url}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
     
      this.Booking = data['response']
      this.Booking.forEach(element => {
        var obj2 = Object();
        var obj3 = Object();
      var date = new Date(element.Current_Time);
      var upadtedate = new Date(element.Updated_time);

      var dates = date.getDate();
      var todaysDate = new Date();

      var updatedates = upadtedate.getDate();
      var todaysDates = todaysDate.getDate();

      var to_date = new Date();
      var to_date_only = this.getFormattedDate_WithOut_Zero_Time(to_date);// to_date.getDay();

      var start_Date = new Date(element.start);
      var start_Date_only = this.getFormattedDate_WithOut_Zero_Time(start_Date); //start_Date.getDay();



      if(to_date_only  == start_Date_only ){

        var obj_s = Object();
  
        if(element.BoatDetails.length !== 0){
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;

        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;

        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
         this.todaysBooking.push(obj_s);

        }      
  
       
  
        }
    
      if(updatedates  == todaysDates ){      
        var obj_s = Object();

        if(element.BoatDetails.length !== 0){

        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;

        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;

        if(element.OwnerDetails.length !== 0){

          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];

        } 
        this.newBooking.push(obj_s);

        }      

        

      }

      if(element.Is_StandByBooking == true){

        var obj_s = Object();
  
        if(element.BoatDetails.length !== 0){
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
  
        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
  
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
        this.Stand_by_Booking.push(obj_s);
  
  
        }      
  
  
      }

    });


    //.....

    
  this.Cancellations = data['Cancelledresponse']
  this.Cancellations.forEach(element => {
    var obj4 = Object();
    var date = new Date(element.Current_Time);
    var dates = date.getDate()
    var todaysDate = new Date();
    var todaysDates = todaysDate.getDate()
    if(dates  == todaysDates )
    {
      
      var obj_s = Object();
  
      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;
      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

       this.Cancels.push(obj_s);


      }     
           
    }


  });


    //.......

     
    this.Location_Name_dropDown = loc.Boat_Location;   

  if(this.public_baotType_Single_id == null){

    this.newBooking = this.newBooking.filter(x => x.Location_Id == loc._id);
    this.todaysBooking = this.todaysBooking.filter(x => x.Location_Id == loc._id);
    this.Cancels = this.Cancels.filter(x => x.Location_Id == loc._id);
    this.Stand_by_Booking = this.Stand_by_Booking.filter(x => x.Location_Id == loc._id);

  }
  else
  {

    this.newBooking = this.newBooking.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);
    this.todaysBooking = this.todaysBooking.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);
    this.Cancels = this.Cancels.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);
    this.Stand_by_Booking = this.Stand_by_Booking.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);


  }   

    this.New_Booking_Count = this.newBooking.length;
    this.Todays_Booking_Count = this.todaysBooking.length;
    this.Cancellations_Count = this.Cancels.length;
    this.Stand_by_Booking_Count = this.Stand_by_Booking.length;



   }, err => {
   });
 
 
  }




}
