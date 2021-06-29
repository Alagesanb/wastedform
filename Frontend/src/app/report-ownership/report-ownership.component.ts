// Create Component for ownership report //Done By Alagesan on 25.05.2021	
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-report-ownership',
  templateUrl: './report-ownership.component.html',
  styleUrls: ['./report-ownership.component.css']
})
export class ReportOwnershipComponent implements OnInit {
  dropdownOwnerSettings : IDropdownSettings ;
  dropdownOwner: any;
  dropdownOwnerList_filted = [];
  dropdownOwnerList = [];
  OwnerUrl = "http://65.2.28.16/api/Owner" 
  owners: any=[];
  adminlogin: any;

  
  constructor(private router: Router,private http: HttpClient ,) { }

  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");

    this.getOwners()

    // Add owner multiselect dropdown for ownership report //Done By Alagesan on 20.06.2021

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
    
    };

  }

// Add the get owners function for ownership report //Done By Alagesan on 20.06.2021
  getOwners(){
   
  this.http.get<any>(`${this.OwnerUrl}/GetOwners`).subscribe(data => {
  this.owners = data['response']
 
  this.dropdownOwnerList = data.response;                    
             var ownerArray = [];
             data.response.forEach(element => {
                   var obj2 = Object();
                   obj2.item_id = element._id,
                  // Concatination firstname and lastname for ownership report//Done By Alagesan on 29.06.2021
                   obj2.item_text = (element.First_Name).concat(" ", element.Last_Name);
                   ownerArray.push(obj2);
 
             });
             this.dropdownOwnerList_filted = ownerArray;  
   }, err => {
   })
  }

  onItemOwnerSelect(item: any) {
    console.log(item.item_id)
  }
  onOwnerSelectAll(items: any) {
    
  }

}
// Create Component for ownership report //Done By Alagesan on 25.05.2021	
