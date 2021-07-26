  // CreateComponent for ownership transfer//Done By Alagesan on 20.05.2021

import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
// import environment for ownership transfer Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
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
  // Add Base URL for ownership transfer  Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;
  url = this.EnvironmentURL+"api/Boat"
  OwnerUrl = this.EnvironmentURL+"api/Owner" 
  owners: any=[];
  boats: any=[];
  dropdownList = [];
  dropdownList_filted = [];
  dropdownNewBoat: any;
  dropdownOwn: any;

  adminlogin: any;
  expDateCurrentOwner: any = [];
  startDateNewOwner: any = [];
  form: FormGroup;

  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router, private scroll: ViewportScroller) { 
    this.createForm();
  }

  // CreateComponent for ownership transfer//Done By Alagesan on 20.05.2021

  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    this.sidemenuloder();
    this.getOwners()
    // this.getBoats()
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");
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

setInterval(function () {

  if ($("#datepicker-3").val() == "NaN/NaN/NaN") {
    $("#datepicker-3").val("");
  }
  if ($("#datepicker-4").val() == "NaN/NaN/NaN") {
    $("#datepicker-4").val("");
  }


}, 500);

$('#datepicker-3').Zebra_DatePicker({
  pair: $('#datepicker-4')
});

$('#datepicker-4').Zebra_DatePicker({
  direction: 1,
});



  }

  createForm() {
    this.form = this.fb.group({
      exp_date_of_current_owner: new FormControl('', [Validators.required,]),
      start_date_of_new_owner: new FormControl('', [Validators.required,]), 

    });
  }
  get df() { return this.form.controls; }
  // Change the exp date of current owner for ownership transfer//Done By Alagesan on 26.07.2021
  focusOutSFrom($event) {
    this.expDateCurrentOwner = $event.target.value;
    var sssd = new Date(this.expDateCurrentOwner);
    let expdate = (sssd.getDate() + '/' + (sssd.getMonth() + 1) + '/' + sssd.getFullYear());
    this.form.get('exp_date_of_current_owner').setValue(expdate);
  }

  // Change the start date of new owner for ownership transfer//Done By Alagesan on 26.07.2021
  focusOutSTo($event) {
    
    this.startDateNewOwner = $event.target.value;
    var td = new Date(this.startDateNewOwner);
    let startDate = (td.getDate() + '/' + (td.getMonth() + 1) + '/' + td.getFullYear());
    this.form.get('start_date_of_new_owner').setValue(startDate);
  }

  getOwners(){
   
    this.http.get<any>(`${this.OwnerUrl}/GetOwners`).subscribe(data => {
  this.owners = data['response']
 
  this.dropdownOwnerList = data.response;                    
             var ownerArray = [];
             data.response.forEach(element => {
                   var obj2 = Object();
                   obj2.item_id = element._id,
                     // Concatination firstname and lastname for ownership transfer//Done By Alagesan on 29.06.2021
                   obj2.item_text = (element.First_Name).concat(" ", element.Last_Name);
                   ownerArray.push(obj2);
 
             });
             this.dropdownOwnerList_filted = ownerArray;  
   }, err => {
   })
  }
  onItemNewOwnerSelect(item: any) {
   
  }
  onItemOwnerSelect(item: any) {
    console.log(item.item_id)
    this.Fun_getallDropDownDatas(item.item_id)
  }
  onOwnerSelectAll(items: any) {
    
  }

  Fun_getallDropDownDatas(owner_drp_Id){ 
    
     
    this.dropdownList = [];       
      var obj = Object();
        obj.owner_id = owner_drp_Id;
      this.http.post<any>(`${this.OwnerUrl}/GetBoatNameByOwnerId`, obj).subscribe(data => { 
        
                            
        var tempArry = [];
        var tempArry2 = [];
               
        data.response.forEach(element => {

          element.BoatDetails.forEach(element2 => {
            if(element2.IsActive == true){

            
            var obj2 = Object();
              obj2.item_id = element2._id,
              obj2.item_text = element2.Boat_Name
              tempArry.push(obj2);

            }

          });
              

        });
        this.dropdownList_filted = tempArry; 
        
      
        }, err => {
          console.log(err);
        })
  }

  // getBoats(){
  //   var obj = Object();
  //   obj.alphabet = "";
  //   this.http.get<any>(`${this.OwnerUrl}/GetBoat`).subscribe(data => {
  // this.boats = data['response'];
  // this.dropdownList = data.response;                    
  //            var tempArray = [];
  //            data.response.forEach(element => {
  //                  var obj2 = Object();
  //                  obj2.item_id = element._id,
  //                  obj2.item_text = element.Boat_Name
  //                  tempArray.push(obj2);
 
  //            });
  //            this.dropdownList_filted = tempArray;  
  
  //  }, err => {
  //  })
  // }
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
