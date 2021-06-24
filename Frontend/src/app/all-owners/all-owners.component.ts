import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-all-owners',
  templateUrl: './all-owners.component.html',
  styleUrls: ['./all-owners.component.css']
})
export class AllOwnersComponent implements OnInit {
  form: FormGroup;
  url = "http://65.2.28.16/api/Owner";
  pathImage = "http://65.2.28.16/api/uploads/";
  allOwners: any=[];
  searchLoction: any = '';
  ownerId: any;
  getResponce: any;
  boats: any=[];
  allboatdata: any=[];
  imgUrl = "http://65.2.28.16/api/uploads/"
  adminlogin: any;
  pageOfItems: Array<any>;

  Summer_WeekDays : any;
  Summer_WeekEndDays : any;
  Winter_WeekDays : any;
  Winter_WeekEndDays : any;
  Total_Days : any;

  visibleIndices = new Set<number>();

  //visibleIndices:any = false;

  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
   }

  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    this.sidemenuloder();
    sessionStorage.setItem("relodePg_book-for-owner","1");
    sessionStorage.setItem("Adminbooking-relodePg","1");
     sessionStorage.setItem("boat-maintenance-reload","1");
     sessionStorage.setItem("view-boat-reload","1");
    this.getAllOwners()
    $(".custom-file-input").on("change", function() {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
    this.getBoats()
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  sidemenuloder(){    
    $("#a-menu-Owners-main").attr("aria-expanded","true");        
    $("#a-menu-Owners-main").removeClass("collapsed");
    $("#id-submenu-child-Owners-All-Owners").
    css({"background": "white", "color": "black",
    "padding": "inherit","border-radius": "inherit","margin-right": "-9px"});
    $("#owner").addClass("show");

  }
  getBoatTypeId(boat){
   console.log(boat)
  }

  getBoats(){
    this.http.get<any>(`${this.url}/GetBoat`).subscribe(data => {
  this.boats = data['response']
  console.log(this.boats)
   }, err => {
   })
  }

  getAllOwners(){
    this.http.get<any>(`${this.url}/ViewAllOwners`).subscribe(data => {
      
      //......................

      this.http.get<any>(`${this.url}/GetAllOwnerssWithBoatDetails`).subscribe(data2 => {
        
       //this.allboatdata = data2['result'] 

       this.getAllBoatData_BindingArry(data['response'], data2['result'], data2['OwnerAllocatedDays']);


      
 
     }, err => {
     })

      //.................
  



  //this.allOwners = data['response']
  //this.getAllBoatdata()

   console.log(this.allOwners);
   }, err => {
   })
  }


  getAllBoatData_BindingArry(data1, data2, data3){

    var Number = 1000;
    var OwnerBaseNumber = 1;

    data1.forEach(element => {
       var boat_Summer_Details = [];
       var first_timeExicute = 0;
       Number = Number + 1;
      

      var obj = Object();
      obj.Profile_Image = element.Profile_Image;
      obj.Profile_ImageOriginalName = element.Profile_ImageOriginalName;
      obj.Notes = element.Notes;
      obj.Status = element.Status;
      obj.Current_Time = element.Current_Time;
      obj.Updated_time = element.Updated_time;
      obj.Owner_id = element._id;
      obj.First_Name = element.First_Name;
      obj.Last_Name = element.Last_Name;
      obj.Home_Address = element.Home_Address;
      obj.Email = element.Email;
      obj.Password = element.Password;
      obj.Mobile = element.Mobile;
      obj.Family_Name = element.Family_Name;
      obj.Parking_Ability = element.Parking_Ability;
      obj.Sailing_Ability = element.Sailing_Ability;
      obj.Housekeeping = element.Housekeeping;
      obj.Emergency_Contact_Name = element.Emergency_Contact_Name;
      obj.Emergency_Contact_Mobile = element.Emergency_Contact_Mobile;
      obj.Block = element.Block;
      obj.IsActive = element.IsActive;
      obj.created = element.created;

      
      var tmp_bot_and_summer = data2.filter(x => x.Owner_Id == element._id);

      if(tmp_bot_and_summer.length > 0){     

      tmp_bot_and_summer[0].BoatDetails.forEach(element2 => {
        Number = Number + 1 ;

        if(first_timeExicute == 0){
          this.visibleIndices.add(Number);
          first_timeExicute = 1;

        }  

          

        var obj3 = Object();
          obj3.OwnerBaseNumber = OwnerBaseNumber;
          obj3.dynamicNumber = Number;
          obj3.Boat_id = element2[0]._id;
          obj3.Boat_Name = element2[0].Boat_Name;

          var tmp_manage_owr = data3.find(x => x.Owner_Id == element._id && x.Boat_Id == element2[0]._id);
          var Summer_WeekDays;
          var Summer_WeekEndDays;
          var Winter_WeekDays;
          var Winter_WeekEndDays;
          var Total_Days;


          if(tmp_manage_owr != null)
          {
            Summer_WeekDays = tmp_manage_owr.Summer_WeekDays;
            Summer_WeekEndDays = tmp_manage_owr.Summer_WeekEndDays;
            Winter_WeekDays = tmp_manage_owr.Winter_WeekDays;
            Winter_WeekEndDays = tmp_manage_owr.Winter_WeekEndDays;
            Total_Days = Summer_WeekDays + Summer_WeekEndDays + Winter_WeekDays + Winter_WeekEndDays;
          }
          else{

           Summer_WeekDays = 0;
           Summer_WeekEndDays = 0;
           Winter_WeekDays = 0;
           Winter_WeekEndDays = 0;
           Total_Days = 0;

          }
          
            obj3.Summer_WeekDays = Summer_WeekDays;         
            obj3.Summer_WeekEndDays = Summer_WeekEndDays;          
            obj3.Winter_WeekDays = Winter_WeekDays;          
            obj3.Winter_WeekEndDays = Winter_WeekEndDays;          
            obj3.Total_Days = Total_Days;
         
           
        
        
        boat_Summer_Details.push(obj3);

      });
    }

      obj.Boat_Summer_Details = boat_Summer_Details;
          
      
      this.allOwners.push(obj);

      OwnerBaseNumber = OwnerBaseNumber + 1;
      
    });
    
  }

  Boatbase_SummerDetails(owner,boat){

    var tmp1 = [];
    owner.forEach(element => {
      tmp1.push(element.dynamicNumber);      
    });

    tmp1.forEach(element => {
      this.visibleIndices.delete(element);
    });

       this.visibleIndices.add(boat.dynamicNumber);
     
  }

 

  getAllBoatdata(){
    this.http.get<any>(`${this.url}/GetAllOwnerssWithBoatDetails`).subscribe(data => {
      console.log(data)
  this.allboatdata = data['result'] 
    if(this.allOwners){
      console.log(this.allOwners)
        this.allOwners.forEach(owner => {
          var obj2 = Object();
            this.allboatdata.forEach(boat => {
            if(owner._id == boat.Owner_Id){
              owner.boatName = boat.BoatDetails[0][0].Boat_Name
              owner.Summer_WeekDays = boat.BoatDetails[0][0].Summer_WeekDays
              owner.Summer_WeekEndDays = boat.BoatDetails[0][0].Summer_WeekEndDays
              owner.Total_Days = boat.BoatDetails[0][0].Total_Days
              owner.Winter_WeekDays = boat.BoatDetails[0][0].Winter_WeekDays
              owner.Winter_WeekEndDays = boat.BoatDetails[0][0].Winter_WeekEndDays

            }
          });
        });
  
}
console.log(this.allOwners)
  // console.log(this.boatTypes)
   }, err => {
   })
  }


  deleteownerModel(id){
    this.ownerId = id
    $('#removeBoat').trigger('click');

  }
  viewOwner(owner){
    sessionStorage.setItem('ownerData', JSON.stringify(owner));   // if it's object

    this.router.navigate(['view-owner/']);
  }
  editOwner(owner){
    sessionStorage.setItem('ownerData', JSON.stringify(owner));   // if it's object

    this.router.navigate(['edit-owner/']);
  }
  deleteOwner(){
    var boadtId = {
      _id : this.ownerId
    }
    this.http.post<any>(`${this.url}/DeleteOwner`,  boadtId   ).subscribe(data => {
        if(data.status==false){
        alert(data.message)
        }
        else if(data.status==true){
          this.getResponce = data.message
          $('#removeBoat').trigger('click');  
          $('#pop-up-btn').trigger('click');
          this.getAllOwners()
        } 
        }, err => {
          console.log(err);
        })
  }
}
