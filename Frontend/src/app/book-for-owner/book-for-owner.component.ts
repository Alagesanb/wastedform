import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';//'ng-multiselect-dropdown';
// import environment for all owners Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-book-for-owner',
  templateUrl: './book-for-owner.component.html',
  styleUrls: ['./book-for-owner.component.css']
})
// Create Component for book for owner //Done By Alagesan on 21.05.2021	
export class BookForOwnerComponent implements OnInit {

  moment:any;
   tui:any;
    // Add Base URL for all owners  Done By Alagesan	on 06.07.2021
    EnvironmentURL:string = environment.url;
   url = this.EnvironmentURL+"api/Schedule/";
   url_Owner = this.EnvironmentURL+"api/Owner/";
   url_Days = this.EnvironmentURL+"api/Days/";
   //public_Day_URL = this.EnvironmentURL+"api/Days/";
   dropdownList = [];
   SelectOwner_dropdownList = [];
   dropdownList_filted = [];
   dropdownList_filted_Owner = [];
   selectedItemsRoot_BoatName =[];
   selectedItems = [];
   dropdownSettings : IDropdownSettings ;
   dropdownSettings_Owner : IDropdownSettings;
   set_BoatType = "";
   public_selectBoatId :any;

   PENDING_SUMMER_WEEKDAYS:any = 0;
   PENDING_SUMMER_WEEKENDS: any = 0;
   PENDING_WINTER_WEEKDAYS: any = 0;
   PENDING_WINTER_WEEKENDS: any = 0;

   dropdownList_filted_model: any;
   boat_anniversary_date: string;
   pre_launch_date: string;

  constructor(private fb: FormBuilder,private http: HttpClient) { }

// Create Component for book for owner //Done By Alagesan on 21.05.2021	

  ngOnInit(): void {

    //var 
    
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");
    ReloadPages_book_for_owner();
    //GetAllUnAvailableDays();
 
     sessionStorage.removeItem('AdminSelectBoat');
     sessionStorage.removeItem('Owner_SelectOwner');
     sessionStorage.setItem("pageIdentiFiction","book-for-owner");
        

       function ReloadPages_book_for_owner(){
           
           //var sss = public_URL;//
          
           var datasessions = sessionStorage.getItem("relodePg_book-for-owner");
           
           if(datasessions == null)
           {
               
               sessionStorage.setItem("relodePg_book-for-owner","0");
               location.reload();
 
           }
           else if(datasessions == "1"){
             sessionStorage.setItem("relodePg_book-for-owner","0");
               location.reload();
 
           }
          
 
       }

       
       this.Fun_getallDropDownDatas_Owner();

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

       

       this.dropdownSettings_Owner = {
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
        
      

  }


  onItemSelect_Owner(item: any) {

    this.dropdownList_filted_model ="";
       
    this.dropdownList_filted = []; 
    sessionStorage.removeItem('AdminSelectBoat');
     var details = this.SelectOwner_dropdownList.find(x => x._id == item.item_id);     
     this.public_selectBoatId = details._id; 
     this.Fun_getallDropDownDatas(details._id);   
     sessionStorage.setItem("Owner_SelectOwner",JSON.stringify(details));
     sessionStorage.removeItem('SettNextBookingDays_boat');

     this.PENDING_SUMMER_WEEKDAYS = 0; 
     this.PENDING_SUMMER_WEEKENDS = 0;
     this.PENDING_WINTER_WEEKDAYS = 0;
     this.PENDING_WINTER_WEEKENDS = 0;

   
   
  }

  onItemSelect(item: any) {
   
    var finddate = this.dropdownList.find(x => x._id == item.item_id);
    this.set_BoatType = finddate.Boattype_Name;
    sessionStorage.setItem("AdminSelectBoat",JSON.stringify(finddate)); 
    this.GetNextBookingDaysByBoatId(item.item_id);
    

    
    //this.Fun_getallDropDownDatas(this.public_selectBoatId);
   
  }

  onDeSelect_boat(items: any) {
    sessionStorage.removeItem('AdminSelectBoat');
     
  }
  //onDeSelect_Owner
  onDeSelect_Owner(items: any) {
    sessionStorage.removeItem('Owner_SelectOwner');
     
  }

  GetNextBookingDaysByBoatId(Boat_Id){

    sessionStorage.removeItem('SettNextBookingDays_boat');

    var obj = Object();
        obj.Boat_Id = Boat_Id;
        //url_Days = this.EnvironmentURL+"api/Days/GetNextBookingDaysByBoatId"
      this.http.post<any>(`${this.url_Days}GetNextBookingDaysByBoatId`, obj).subscribe(results => {           
        if(results.status == true)
        {
          var temp_resp = results.response;
          if (typeof temp_resp  !== 'undefined' && temp_resp.length > 0) {
            sessionStorage.setItem("SettNextBookingDays_boat",JSON.stringify(temp_resp[0]));
            this.getpendingDays_Calculation();
          }
          else
          {
            alert("Next Booking Days are not assigned to this boat. Please go to settings and unlock the next booking days.");
            location.reload();

          }
           
        }
                
      
        }, err => {
          console.log(err);
        })

  }

 

  Fun_getallDropDownDatas_Owner(){ 
   
    this.http.get<any>(`${this.url_Owner}ViewAllOwners`).subscribe(data => { 
      this.SelectOwner_dropdownList = data.response;   
      console.log(data.response);                       
      var tempArry = [];
      data.response.forEach(element => {
            var obj2 = Object();
            obj2.item_id = element._id,
            // Concatination firstname and lastname for book for owner//Done By Alagesan on 29.06.2021
            obj2.item_text = (element.First_Name).concat(" ", element.Last_Name);
            tempArry.push(obj2);

      });
      this.dropdownList_filted_Owner = tempArry;
      
      this.GetAllUnAvailableDays();
    
      }, err => {
        console.log(err);
      })
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

   


  Fun_getallDropDownDatas(owner_drp_Id){ 
    
    
     
    this.dropdownList = [];       
    this.set_BoatType = "";
      var obj = Object();
        obj.owner_id = owner_drp_Id;
      this.http.post<any>(`${this.url_Owner}GetBoatNameByOwnerId`, obj).subscribe(data => { 
        
                            
        var tempArry = [];
        var tempArry2 = [];
               
        data.response.forEach(element => {

          element.BoatDetails.forEach(element2 => {
            if(element2.IsActive == true){

            
            var obj2 = Object();
              obj2.item_id = element2._id,
              obj2.item_text = element2.Boat_Name
              tempArry.push(obj2);

              var obj3 = Object();
              obj3._id = element2._id,
              obj3.Boattype_Name = element2.Boattype_Name,
              obj3.Boat_Name = element2.Boat_Name
              tempArry2.push(obj3);
            }

          });
              

        });
        this.dropdownList_filted = tempArry; 
        this.dropdownList = tempArry2;  
        
      
        }, err => {
          console.log(err);
        })
  }


  getpendingDays_Calculation()
  {
    
    this.PENDING_SUMMER_WEEKDAYS = 0; 
    this.PENDING_SUMMER_WEEKENDS = 0;
    this.PENDING_WINTER_WEEKDAYS = 0;
    this.PENDING_WINTER_WEEKENDS = 0;
    this.boat_anniversary_date = "";
    this.pre_launch_date = "";
    var Owner_tmp = JSON.parse(sessionStorage.getItem("Owner_SelectOwner")); 

    var Boat_tmp = JSON.parse(sessionStorage.getItem("AdminSelectBoat")); 

    var obj = Object();
        obj.Owner_Id = Owner_tmp._id;
        obj.Boat_Id = Boat_tmp._id;
      this.http.post<any>(`${this.url}GetAllPendingDaysOfOwner`, obj).subscribe(data => { 

        
        
        if(data.status == true){

          var dt = data.Response;
          console.log(dt);
          var BookedDays = dt.BookedDays;
          var AllocatedDays = dt.AllocatedDays;
          console.log(BookedDays);
          //Pre launch date and boat anniversary date for book for owner Done By Alagesan on 29.07.2021
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

  locationReload(){
    location.reload();
  }


}
