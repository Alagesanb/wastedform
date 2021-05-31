import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';//'ng-multiselect-dropdown';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css']
})
export class AdminBookingComponent implements OnInit {

  
   moment:any;
   tui:any;
  
   url = "http://65.2.28.16/api/Schedule/";
   dropdownList = [];
   dropdownList_filted = [];
   selectedItems = [];
   dropdownSettings : IDropdownSettings ;
 
   set_BoatType = "";
 
   constructor(private fb: FormBuilder,private http: HttpClient) { 
     //this.createForm();
   }
 
   ngOnInit(): void {

    sessionStorage.setItem("relodePg_book-for-owner","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 
     ReloadPages();
 
     sessionStorage.removeItem('AdminSelectBoat');
     sessionStorage.setItem("pageIdentiFiction","AdminBooking");

       function ReloadPages(){
           
           //var sss = public_URL;
          
           var datasessions = sessionStorage.getItem("Adminbooking-relodePg");
           
           if(datasessions == null)
           {
               
               sessionStorage.setItem("Adminbooking-relodePg","0");
               location.reload();
 
           }
           else if(datasessions == "1"){
             sessionStorage.setItem("Adminbooking-relodePg","0");
               location.reload();
 
           }
           //sessionStorage.setItem("relodePg","1");//
 
       }
 
        this.Fun_getallDropDownDatas();
        
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
         
       }
       onItemSelect(item: any) {
 
         var finddate = this.dropdownList.find(x => x._id == item.item_id);
         this.set_BoatType = finddate.Boattype_Name;
         sessionStorage.setItem("AdminSelectBoat",JSON.stringify(finddate));
        
        
       }
       onSelectAll(items: any) {
         
       }

       
 
        
         Fun_getallDropDownDatas(){
           var obj = Object();
             obj.alphabet = "";
           this.http.post<any>(`${this.url}GetBoatNames`, obj).subscribe(data => { 
             this.dropdownList = data.response;                    
             var tempArry = [];
             data.response.forEach(element => {
                   var obj2 = Object();
                   obj2.item_id = element._id,
                   obj2.item_text = element.Boat_Name
                   tempArry.push(obj2);
 
             });
             this.dropdownList_filted = tempArry;           
           
             }, err => {
               console.log(err);
             })
       }
 
      
 
      
   }
 