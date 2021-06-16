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
      console.log(data)
  
  this.allOwners = data['response']
  this.getAllBoatdata()

  // console.log(this.boatTypes)
   }, err => {
   })
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
