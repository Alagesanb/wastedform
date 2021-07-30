import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';//'ng-multiselect-dropdown';
// import environment for owner dashboard Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
// Create Component for owner dashboard //Done By Alagesan on 17.05.2021

export class OwnerDashboardComponent implements OnInit {
  ownerlogin: boolean;
  dropdownSettings : IDropdownSettings ;
  // Add Base URL for owner dashboard  Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;
  url_Owner = this.EnvironmentURL+"api/Owner/";
  url_Days = this.EnvironmentURL+"api/Days/";
  imgUrl = this.EnvironmentURL+"api/uploads/"
  urlViewBookingDetails = this.EnvironmentURL+"api/Schedule"

  dropdownList_filted = [];
  dropdownList = [];
  viewBookingDetailsdata: any=[];
  viewBookingByOwnerIddata: any=[];
  viewCancelBookingByOwnerIddata: any=[];
  searchText: any = '';
  url = this.EnvironmentURL+"api/Schedule/";
  PENDING_SUMMER_WEEKDAYS:any = 0;
  PENDING_SUMMER_WEEKENDS: any = 0;
  PENDING_WINTER_WEEKDAYS: any = 0;
  PENDING_WINTER_WEEKENDS: any = 0;

  dropdownList_filted_model: any;
  boat_anniversary_date: string;
  pre_launch_date: string;

  constructor(private router: Router,private http: HttpClient) { }

// Create Component for owner dashboard //Done By Alagesan on 17.05.2021

  ngOnInit(): void {
    this.ownerlogin = JSON.parse(sessionStorage.getItem("userlogin"));
    if(this.ownerlogin==false){
      this.router.navigate(['/owner-login/']);
    }

    ReloadPages();   

    function ReloadPages(){
           
      //var sss = public_URL;
     
      var datasessions = sessionStorage.getItem("owner-dashboard-relodePg");
      
      if(datasessions == null)
      {
          
          sessionStorage.setItem("owner-dashboard-relodePg","0");
          location.reload();

      }
      else if(datasessions == "1"){
        sessionStorage.setItem("owner-dashboard-relodePg","0");
          location.reload();

      }
      //sessionStorage.setItem("relodePg","1");//

  }

  sessionStorage.removeItem('SettNextBookingDays_boat');
    sessionStorage.setItem("pageIdentiFiction","owner-dashboard-Reservation");

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection : true,
      noDataAvailablePlaceholderText : "No data available" 
      //maxHeight : 100        
     
    };

    var $calendar;
    $(document).ready(function () {
      let container = $("#container").simpleCalendar({
        fixedStartDay: 0, // begin weeks by sunday
        disableEmptyDetails: true,
        events: [
          // generate new event after tomorrow for one hour
          {
            startDate: new Date(new Date().setHours(new Date().getHours() + 24)).toDateString(),
            endDate: new Date(new Date().setHours(new Date().getHours() + 25)).toISOString(),
            summary: 'Visit of the Eiffel Tower'
          },
          // generate new event for yesterday at noon
          {
            startDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 12, 0)).toISOString(),
            endDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 11)).getTime(),
            summary: 'Restaurant'
          },
          // generate new event for the last two days
          {
            startDate: new Date(new Date().setHours(new Date().getHours() - 48)).toISOString(),
            endDate: new Date(new Date().setHours(new Date().getHours() - 24)).getTime(),
            summary: 'Visit of the Louvre'
          }
        ],
  
      });
      $calendar = container.data('plugin_simpleCalendar')
    });









    this.Owner_Log_getallDropDownDatas_Boat();
    this.getViewBookingDetailsWithBoatAndOwner();
    this.getviewbookingByOwnerId();












  }

  onItemSelect(item: any) {
   
    var Filterboat = this.dropdownList.find(x => x._id == item.item_id);
    //this.set_BoatType = finddate.Boattype_Name;
    //sessionStorage.setItem("AdminSelectBoat",JSON.stringify(finddate)); 
   // this.GetNextBookingDaysByBoatId(item.item_id);

   //var sorte this.dropdownList_filted = tempArry; 
   sessionStorage.setItem("Owner_pg_boatListed",JSON.stringify(Filterboat));
   this.GetNextBookingDaysByBoatId(item.item_id)
    
   this.getpendingDays_Calculation(item.item_id);

    //this.Fun_getallDropDownDatas(this.public_selectBoatId);
   
  }


  GetNextBookingDaysByBoatId(Boat_Id){

    sessionStorage.removeItem('SettNextBookingDays_boat');

    var obj = Object();
        obj.Boat_Id = Boat_Id;        
      this.http.post<any>(`${this.url_Days}GetNextBookingDaysByBoatId`, obj).subscribe(results => {           
        if(results.status == true)
        {
          var temp_resp = results.response;
          if (typeof temp_resp  !== 'undefined' && temp_resp.length > 0) {
            sessionStorage.setItem("SettNextBookingDays_boat",JSON.stringify(temp_resp[0]));
          }
          else
          {
            alert("Next Booking Days are not assigned to this boat. Please contact Admin.");
            location.reload();

          }
           
        }
                
      
        }, err => {
          console.log(err);
        })

  }






  onDeSelect_boat(items: any) {
    //sessionStorage.removeItem('AdminSelectBoat');
     
  }

  Owner_Log_getallDropDownDatas_Boat(){     
   
   var owner_drp_Id = JSON.parse(sessionStorage.getItem("Ownerlogin"));
        
    this.dropdownList = [];       
   // this.set_BoatType = "";
      var obj = Object();
        obj.owner_id = owner_drp_Id._id;
      this.http.post<any>(`${this.url_Owner}GetBoatNameByOwnerId`, obj).subscribe(data => { 
        
                            
        var tempArry = [];
        var tempArry2 = [];
               
        data.response.forEach(element => {

          element.BoatDetails.forEach(element2 => {
            var obj2 = Object();
              obj2.item_id = element2._id,
              obj2.item_text = element2.Boat_Name
              tempArry.push(obj2);

              var obj3 = Object();
              obj3._id = element2._id,
              obj3.Boattype_Name = element2.Boattype_Name,
              obj3.Boat_Name = element2.Boat_Name
              tempArry2.push(obj3)

          });
              

        });
        this.dropdownList_filted = tempArry; 
        this.dropdownList = tempArry2;
        sessionStorage.setItem("Owner_pg_boatListed",JSON.stringify(tempArry2)); 

        this.GetAllUnAvailableDays();
      
        }, err => {
          console.log(err);
        })
  }

  getviewbookingByOwnerId(){
    var owner_drp_Id = JSON.parse(sessionStorage.getItem("Ownerlogin"));
    console.log(owner_drp_Id)
    let obj = {
      User_Id:owner_drp_Id._id
    }
   // Cancel booking for owner dashboard Done By Alagesan on 21.07.2021
   this.http.post<any>(`${this.urlViewBookingDetails}/ViewCancelledBookingById`, obj).subscribe(data => { 
      console.log(data);
      this.viewCancelBookingByOwnerIddata  = data['response'];
      console.log(this.viewCancelBookingByOwnerIddata );
    }, err => {
      console.log(err);
    })
   // Owner booking for owner dashboard Done By Alagesan on 21.07.2021
    this.http.post<any>(`${this.urlViewBookingDetails}/ViewBookingById`, obj).subscribe(data => { 
      console.log(data);
      this.viewBookingByOwnerIddata  = data['response'];
      console.log(this.viewBookingByOwnerIddata );
    }, err => {
      console.log(err);
    })
  }

  getViewBookingDetailsWithBoatAndOwner(){
   // View booking details  API integrations for owner dashboard Done By Alagesan on 13.07.2021
    this.http.get<any>(`${this.urlViewBookingDetails}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
      this.viewBookingDetailsdata = data['response']
      console.log(this.viewBookingDetailsdata);
 
   }, err => {
   })
  }

  locationReload(){
    location.reload();
  }

  GetAllUnAvailableDays(){


    this.http.get<any>(`${this.url_Days}GetUnAvailabeDaysOfBoats`).subscribe(data => { 
     
  
      sessionStorage.setItem("GetAllUnAvailableDays_Owners",JSON.stringify(data));             
  
  
      this.http.get<any>(`${this.url_Days}GetUnAvailabeDaysOfBoats`).subscribe(datas => { 
     
        if(datas.status == true){
      
          var tmp_1 = datas.response;
          var tmp_arry_1 = [];
  
          $.each(datas.response, function(index, val) {        
  
            var obj = Object();
            obj.Boat_Id =  val.Boat_Id[0];//a1.toString();
            obj.Boat_Name = val.Boat_Name[0];//a2.toString();
            obj.UnAvailableDates = val.UnAvailableDates;
            obj._id = val._id;
            tmp_arry_1.push(obj);
  
          });
          sessionStorage.setItem("GetUnAvailabeDaysOfBoats_Owners",JSON.stringify(tmp_arry_1));
           
         }    
    
      }, err => {
        console.log(err);
      })
  
    
      }, err => {
        console.log(err);
      })
  
      
     }

     getpendingDays_Calculation(boatId)
  {
    //Pre launch date and boat anniversary date for book for owner Done By Alagesan on 29.07.2021
    this.PENDING_SUMMER_WEEKDAYS = 0; 
    this.PENDING_SUMMER_WEEKENDS = 0;
    this.PENDING_WINTER_WEEKDAYS = 0;
    this.PENDING_WINTER_WEEKENDS = 0;
    this.boat_anniversary_date = "";
    this.pre_launch_date = "";
    // var Owner_tmp = JSON.parse(sessionStorage.getItem("Owner_SelectOwner")); 

    // var Boat_tmp = JSON.parse(sessionStorage.getItem("AdminSelectBoat")); 
    var owner_drp_Id = JSON.parse(sessionStorage.getItem("Ownerlogin"));
    console.log(owner_drp_Id)
    
    var Boat_tmp = JSON.parse(sessionStorage.getItem("Owner_pg_boatListed"));
    console.log(Boat_tmp);
    var obj = Object();
        obj.Owner_Id = owner_drp_Id._id;
        obj.Boat_Id = boatId;
        console.log(obj);
      this.http.post<any>(`${this.url}GetAllPendingDaysOfOwner`, obj).subscribe(data => { 

        console.log(data);
        
        if(data.status == true){

          var dt = data.Response;
          console.log(dt);
          var BookedDays = dt.BookedDays;
          var AllocatedDays = dt.AllocatedDays;
          console.log(BookedDays);

          // this.PENDING_SUMMER_WEEKDAYS = AllocatedDays[0].Summer_WeekDays ; 
          // this.PENDING_SUMMER_WEEKENDS = AllocatedDays[0].Summer_WeekEndDays ;
          // this.PENDING_WINTER_WEEKDAYS = AllocatedDays[0].Winter_WeekDays ;
          // this.PENDING_WINTER_WEEKENDS = AllocatedDays[0].Winter_WeekEndDays ;

          if(BookedDays[0].BoatDetails.length > 0){
            this.boat_anniversary_date = BookedDays[0].BoatDetails[0].Launch_Date;
            console.log(this.boat_anniversary_date);
            this.pre_launch_date = BookedDays[0].BoatDetails[0].PreLaunch_Date;
            console.log(this.pre_launch_date);
          }
          if(BookedDays.length == 0){
          this.PENDING_SUMMER_WEEKDAYS = AllocatedDays[0].Summer_WeekDays ; 
          this.PENDING_SUMMER_WEEKENDS = AllocatedDays[0].Summer_WeekEndDays ;
          this.PENDING_WINTER_WEEKDAYS = AllocatedDays[0].Winter_WeekDays ;
          this.PENDING_WINTER_WEEKENDS = AllocatedDays[0].Winter_WeekEndDays ;

          }
          
          else{

          this.PENDING_SUMMER_WEEKDAYS = AllocatedDays[0].Summer_WeekDays - BookedDays[0].Summer_WeekDays; 
          this.PENDING_SUMMER_WEEKENDS = AllocatedDays[0].Summer_WeekEndDays - BookedDays[0].Summer_WeekEndDays;
          this.PENDING_WINTER_WEEKDAYS = AllocatedDays[0].Winter_WeekDays - BookedDays[0].Winter_WeekDays;
          this.PENDING_WINTER_WEEKENDS = AllocatedDays[0].Winter_WeekEndDays - BookedDays[0].Winter_WeekEndDays;
          }


          /*
          book day
                "Summer_WeekDays": 0,
                "Summer_WeekEndDays": 0,
                "Winter_WeekDays": 5,
                "Winter_WeekEndDays": 1
          
          */
         /*
                "Summer_WeekDays": 23,
                "Summer_WeekEndDays": 30,
                "Winter_WeekDays": 28,
                "Winter_WeekEndDays": 38

         */


        }
        else{
          alert("data not fount");
        }
        
        
       
      
        }, err => {
          console.log(err);
        })
    

  }
  




}

// Create Component for owner dashboard //Done By Alagesan on 17.05.2021
