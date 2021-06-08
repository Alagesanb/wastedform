import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner"; 
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-archive-boat',
  templateUrl: './archive-boat.component.html',
  styleUrls: ['./archive-boat.component.css']
})
// CreateComponent for archive boat//Done By Alagesan on 20.05.2021

export class ArchiveBoatComponent implements OnInit {
  url = "http://65.2.28.16/api/Boat"
  allBoats: any=[];
  searchText: any = '';
  imgUrl = "http://65.2.28.16/api/uploads/"
  Location_Name_dropDown: any = "Location";
  loctions: any=[];
  searchLoction: any = '';
  adminlogin: any;

  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,private SpinnerService: NgxSpinnerService) { 
   
  }
  // CreateComponent for archive boat//Done By Alagesan on 20.05.2021
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
    this.getArchiveBoat()
    this.getLoction()
  }
  
  sidemenuloder(){
    $("#a-menu-boat-main").attr("aria-expanded","true");        
    $("#a-menu-boat-main").removeClass("collapsed");
    $("#id-submenu-child-boat-Archive-Boats").
    css({"background": "white", "color": "black",
    "padding": "inherit","border-radius": "inherit","margin-right": "-9px"});
    $("#boat").addClass("show");
  }
getArchiveBoat(){
  this.SpinnerService.show();  
  var obj={
    Boat_Status: "Archive"
  }
  this.http.post<any>(`${this.url}/GetAllArchieveBoatDetails`,  obj   ).subscribe(data => {
    console.log(data)
    this.allBoats = data['response']
    if(data.status == true){
      this.SpinnerService.hide();  
    } 
      if(data.status==false){
        this.SpinnerService.hide();  
        alert(data.message)
      }
      }, err => {
        console.log(err);
      })
}
getLoction(){
  this.http.get<any>(`${this.url}/GetLocation`).subscribe(data => {
   
this.loctions = data['response']
console.log(this.loctions)
 }, err => {
 })
}
getLoctionTypeId(id){

  this.Location_Name_dropDown = id.Boat_Location;

 
 var boadtId = {
   Location_Id : id._id,
   Boat_Status: "Archive"
 }
 this.http.post<any>(`${this.url}/GetArchieveBoatDetailsInLocation`,  boadtId   ).subscribe(data => {
   
   this.allBoats = data['response']
     }, err => {
       console.log(err);
     })

  }
}
