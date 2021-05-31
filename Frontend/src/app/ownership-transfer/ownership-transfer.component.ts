import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-ownership-transfer',
  templateUrl: './ownership-transfer.component.html',
  styleUrls: ['./ownership-transfer.component.css']
})
export class OwnershipTransferComponent implements OnInit {
  dropdownSettings : IDropdownSettings ;
  dropdownOwnerSettings : IDropdownSettings ;
  dropdownBoat: any;
  dropdownOwnerList_filted = [];
  dropdownOwnerList = [];
  url = "http://65.2.28.16/api/Boat"
  OwnerUrl = "http://65.2.28.16/api/Owner" 
  owners: any=[];
  boats: any=[];
  dropdownList = [];
  dropdownList_filted = [];
  dropdownOwn: any;


  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router, private scroll: ViewportScroller) { 
  }
  ngOnInit(): void {
    this.sidemenuloder();
    this.getOwners()
    this.getBoats()
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
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
this.dropdownOwnerSettings = {
  singleSelection: true,
  idField: 'item_id',
  textField: 'item_text',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 50,
  allowSearchFilter: true,
  closeDropDownOnSelection : true,
  noDataAvailablePlaceholderText : "No data available" 
  //maxHeight : 100        
 
};
  }
  getOwners(){
   
    this.http.get<any>(`${this.OwnerUrl}/GetOwners`).subscribe(data => {
  this.owners = data['response']
 
  this.dropdownOwnerList = data.response;                    
             var ownerArray = [];
             data.response.forEach(element => {
                   var obj2 = Object();
                   obj2.item_id = element._id,
                   obj2.item_text = element.First_Name
                   ownerArray.push(obj2);
 
             });
             this.dropdownOwnerList_filted = ownerArray;  
   }, err => {
   })
  }
  onItemOwnerSelect(item: any) {
   
  }
  onOwnerSelectAll(items: any) {
    
  }
  getBoats(){
    var obj = Object();
    obj.alphabet = "";
    this.http.get<any>(`${this.OwnerUrl}/GetBoat`).subscribe(data => {
  this.boats = data['response'];
  this.dropdownList = data.response;                    
             var tempArray = [];
             data.response.forEach(element => {
                   var obj2 = Object();
                   obj2.item_id = element._id,
                   obj2.item_text = element.Boat_Name
                   tempArray.push(obj2);
 
             });
             this.dropdownList_filted = tempArray;  
  
   }, err => {
   })
  }
  onboatSelect(items: any) { 
 
  }
  onboatAll(items: any) { 
   
  }
  sidemenuloder(){    
    $("#a-menu-Owners-main").attr("aria-expanded","true");        
    $("#a-menu-Owners-main").removeClass("collapsed");
    $("#id-submenu-child-Owners-Ownership-Transfer").
    css({"background": "white", "color": "black",
    "padding": "inherit","border-radius": "inherit","margin-right": "-9px"});   
    $("#owner").addClass("show");
  }

}
