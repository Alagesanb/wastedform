import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';//'ng-multiselect-dropdown';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-book-for-owner',
  templateUrl: './book-for-owner.component.html',
  styleUrls: ['./book-for-owner.component.css']
})
export class BookForOwnerComponent implements OnInit {

  moment:any;
   tui:any;
  
   url = "http://65.2.28.16/api/Schedule/";
   url_Owner = "http://65.2.28.16/api/Owner/";
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

  constructor(private fb: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {

    
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");

    ReloadPages_book_for_owner();
 
     sessionStorage.removeItem('AdminSelectBoat');
     sessionStorage.removeItem('Owner_SelectOwner');
     sessionStorage.setItem("pageIdentiFiction","book-for-owner");

     //cls-Boat-name
     //cls-Boat-Owner
     //$(".cls-Boat-Owner").change(function() {
      //$(document).on("click",".cls-Boat-Owner",function() {
        //debugger;
          //alert("test");
        //    $(".cls-Boat-name").empty();
      //var eddd =  $(this).children('span').first().text();
     // var getdatasId = $(this).children('.multiselect-dropdown > span').eq(1);
        //$('.cls-Boat-Owner').find('div').each(function(){
         // debugger;
         //console.log(getdatasId);
         //alert(getdatasId);
          //var getdatasId = $(this).attr('span');
        //  if(typeof getdatasId !== "undefined"){

           // debugger;
           // alert(getdatasId);
         // }


       // });

     // });

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
       
    this.dropdownList_filted = []; 
    sessionStorage.removeItem('AdminSelectBoat');
     var details = this.SelectOwner_dropdownList.find(x => x._id == item.item_id);     
     this.public_selectBoatId = details._id; 
     this.Fun_getallDropDownDatas(details._id);   
     sessionStorage.setItem("Owner_SelectOwner",JSON.stringify(details));
   
   
  }

  onItemSelect(item: any) {
   
    var finddate = this.dropdownList.find(x => x._id == item.item_id);
    this.set_BoatType = finddate.Boattype_Name;
    sessionStorage.setItem("AdminSelectBoat",JSON.stringify(finddate));    
    //this.Fun_getallDropDownDatas(this.public_selectBoatId);
   
  }

  onDeSelect_boat(items: any) {
    sessionStorage.removeItem('AdminSelectBoat');
     
  }

 

  Fun_getallDropDownDatas_Owner(){ 
   
    this.http.get<any>(`${this.url_Owner}ViewAllOwners`).subscribe(data => { 
      this.SelectOwner_dropdownList = data.response;                          
      var tempArry = [];
      data.response.forEach(element => {
            var obj2 = Object();
            obj2.item_id = element._id,
            obj2.item_text = element.First_Name
            tempArry.push(obj2);

      });
      this.dropdownList_filted_Owner = tempArry;           
    
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
      
        }, err => {
          console.log(err);
        })
  }

}
