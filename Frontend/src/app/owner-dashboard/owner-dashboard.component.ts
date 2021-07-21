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

}

// Create Component for owner dashboard //Done By Alagesan on 17.05.2021
