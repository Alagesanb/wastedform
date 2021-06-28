import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import {GetServiceService} from 'src/app/get-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  url = "http://65.2.28.16/api/Boat"
  shareUrl = "http://65.2.28.16/api/Days"
  allShareUrl = 'http://65.2.28.16/api/Days';
  OwnerUrl = "http://65.2.28.16/api/Owner"
  //Add special days for settings page //Done By Alagesan on 23.06.2021
  specialDaysUrl = "http://65.2.28.16/api/AddSpecialDaysRout"
  specialDaysform: FormGroup;
  specialDaysSubmitted = false;
  startDate: any=[];
  endDate: any=[];

  //Add boat location for settings page //Done By Alagesan on 24.06.2021
  addBoatLocationform: FormGroup;
  boatLocationSubmitted = false;

  //Add boat type for settings page //Done By Alagesan on 25.06.2021
  addBoatTypeform: FormGroup;
  addBoatTypesubmitted = false;

  boats: any=[];
  allBoatsType: any =[];
  searchText: any = '';
  form: FormGroup;
  Shareform: FormGroup;
  Consecutiveform: FormGroup;
  Bookingform: FormGroup;
  submitted = false;
  shareSubmitted = false;
  ConsecutiveSubmitted = false;
  BookingSubmitted = false;
  getResponce: any;
  boatTypeId: any;
  modelTitle: string;
  shareAllocation: any=[];
  set_BoatType = "";
  dropdownList = [];
  dropdownList_filted = [];
  selectedItems = [];
  dropdownSettings : IDropdownSettings ;
  dropdownSettings_CONSECUTIVEDAYS : IDropdownSettings ;
  dropdownSettings_UNAVAILABLE_DATE : IDropdownSettings ;
  getBoat: any=[];
  CONSECUTIVEDAYS_selected_Boat :any;
  SUMMER_CONSECUTIVE_DAYS_ALLOWED : any;
  WINTER_CONSECUTIVE_DAYS_ALLOWED : any;
  NEXT_BOOKING_DAYS_ALLOWED: any;
  UNAVAILABLE_DATE_userSelect = [];
  dropdownOwn: any;
  bookdropdownOwn: any;
  adminlogin: any;
  GetBoatDetailsByBoatId_AllocatedDays: any;


  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private ps: GetServiceService) {
      this.createForm();
      this.createShareForm();
      this.createConsecutiveForm();
      this.createBookingForm();
      this.createSpecialDaysForm() ;
      this.createBoatLocationForm();
      this.createBoatTypeForm();

     }

  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");
 sessionStorage.removeItem('UNAVAILABLE_DATE_userSelect_Boat');
 //UNAVAILABLE_DATE_userSelect_Boat

   var url = 'http://65.2.28.16/api/Boat/';
   var public_url_days = "http://65.2.28.16/api/Days/";

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
  };

  this.dropdownSettings_CONSECUTIVEDAYS = {
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

  this.dropdownSettings_UNAVAILABLE_DATE = {
    singleSelection: false,
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


   $(document).on("click","#test-element",function() {
    alert("click bound to document listening for #test-element");
   });

  // Updated multiselect dropdown for settings //Done By Alagesan on 13.06.2021	
   $(document).on("click",".selected-item a",function() {
    console.log( this.getBoat);
      // this.Shareform.get('No_of_Shares').setValue("");
      // this.Shareform.get('No_of_SummerWeekDays').setValue("");
      // this.Shareform.get('No_of_SummerWeekEndDays').setValue("");
      // this.Shareform.get('No_of_WinterWeekDays').setValue("");
      // this.Shareform.get('No_of_WinterWeekEndDays').setValue("");
   });
   

   binding_Boat();
    function binding_Boat(){
      $.ajax({
        url: url +'GetallBoatTypeDetails',
        type: 'get',
        dataType: 'json',
        //data: JSON.stringify(person),
        contentType: 'application/json',
        success: function (data) {

            if(data.status == true)
            {
              var bindingTableData;
              var bindingNumber = 1;
              var firstChek = 0;

              


              $.each(data.response , function(index, val) { 

                if(firstChek == 0){
                  
                  bindingTableData = '<tr><td>'+bindingNumber +'</td><td>'+val.Boat_Type+'\
                  </td><td>'+ val.Type_Description +'</td><td><ul class="table-action">\
                  <li><a (click)=editBoat(data) class=""><i class="far fa-edit" aria-hidden="true">\
                  </i></a></li><li><a (click)=deleteBoatModel(data)><i class="far fa-trash-alt" aria-hidden="true">\
                  </i></a></li></ul></td></tr>';
                  firstChek = 1;

                }
                else{
                bindingTableData += '<tr><td>'+bindingNumber +'</td><td>'+val.Boat_Type+'</td><td>'+ val.Type_Description +'</td><td><ul class="table-action"><li><a (click)=editBoat(data) class=""><i class="far fa-edit" aria-hidden="true"></i></a></li><li><a (click)=deleteBoatModel(data)><i class="far fa-trash-alt" aria-hidden="true"></i></a></li></ul></td></tr>';


                }

                bindingNumber = bindingNumber + 1;


              });

              var sriptTemp = '<script>$(document).ready(function(){$("#example").DataTable({responsive:{details:{display: $.fn.dataTable.Responsive.display.modal({header: function ( row ){var data = row.data(); return "Details for "+data[0]+" "+data[1];} }),renderer: $.fn.dataTable.Responsive.renderer.tableAll( {tableClass:"table"})}}} );} );</script>'


              var bindingTabledataFirst ='<table id="example"class="table table-striped table-bordered dt-responsive nowrap" style="width:100%"><thead><tr><th>SL No</th><th>BOAT TYPE</th><th>DESCRIPTION</th><th>ACTION</th></tr></thead><tbody id="id-tbody-allBoats">'+bindingTableData+'</tbody></table>'+sriptTemp+'';

              $("#temp-data-bindings").html(bindingTabledataFirst);
            
            }
            else
            {
              
            }

        }
       
    });      
      
    }
    
    $("input[type='number']").inputSpinner()
      $('#example').DataTable( {
          responsive: {
              details: {
                  display: $.fn.dataTable.Responsive.display.modal( {
                      header: function ( row ) {
                          var data = row.data();
                          return 'Details for '+data[0]+' '+data[1];
                      }
                  } ),
                  renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
                      tableClass: 'table'
                  } )
              }
          }
      } );
      jQuery(document).ready(function() {
        // executes when HTML-Document is loaded and DOM is ready
       
         
         
         jQuery('.btn1[href^=#]').click(function(e){
           e.preventDefault();
           var href = jQuery(this).attr('href');
           jQuery(href).modal('toggle');
         });
       
         
       
       }); 

       function getFormattedDate(date) {
           date = new Date(date);
          let year = date.getFullYear();
          let month = (1 + date.getMonth()).toString().padStart(2, '0');
          let day = date.getDate().toString().padStart(2, '0');
        
          return month + '/' + day + '/' + year;
        }
        function unique(list) {
            var result = [];
            $.each(list, function(i, e) {
              if ($.inArray(e, result) == -1) result.push(e);
            });
            return result;
        }
       
       $(document).on("click","#id-btn-unAvilableDate-Commen",function() {        
        var temp_data1 = [];
          $('.input_fields_wrap_commen').find('input').each(function(){
           
            var tmp1 = $(this).val();
            if(tmp1 !== '')
            {
              temp_data1.push(getFormattedDate(tmp1));
            }
            

          });
          $('.date-add-field-commen').find('input').each(function(){            
            var tmp1 = $(this).val();
            if(tmp1 !== '')
            {
              temp_data1.push(getFormattedDate(tmp1));
            }
            
          });

         
          if(temp_data1.length != 0){
                  var obj = Object();
                  obj.UnAvailableDates = unique(temp_data1);

              $.ajax({
                url: public_url_days + "AddUnavailabledaysForAll",
                type: 'POST',
                dataType: 'json', 
                data: obj,
                success: function(Related_datas) {
                  
                  if(Related_datas.status == true)
                  {
                    $("#myModalUpdatemsg").find(".modal-body").append("<p>"+Related_datas.message+ "</p>");

                    $("#myModalUpdatemsg").find(".modal-header .close").on("click", function(){
                      $(".modal-body").html("<p></p>");
                    });

                    $("#myModalUpdatemsg").find(".modal-footer .btn-default").on("click", function(){
                      $(".modal-body").html("<p></p>");
                    });

                  }
                  else if(Related_datas.status == false)
                  {
                    
                  }

                                
                }
              });
          }
          else{
            $("#myModalUpdatemsg").find(".modal-body").append("<p>Empty Date</p>");
            $("#myModalUpdatemsg").find(".modal-header .close").on("click", function(){
              $(".modal-body").html("<p></p>");
            });

            $("#myModalUpdatemsg").find(".modal-footer .btn-default").on("click", function(){
              $(".modal-body").html("<p></p>");
            });
            //alert("Empty date");

          }

       });
       $(document).on("click","#id-btn-unAvilableDate-single",function() {

        var temp_data_datte = [];
          $('.input_fields_wrap_single').find('input').each(function(){
           
            var tmp1 = $(this).val();
            if(tmp1 !== '')
            {
              temp_data_datte.push(getFormattedDate(tmp1));
            }
            

          });
          $('.date-add-field-single').find('input').each(function(){            
            var tmp1 = $(this).val();
            if(tmp1 !== '')
            {
              temp_data_datte.push(getFormattedDate(tmp1));
            }
            
          });


           var selected_bots = sessionStorage.getItem("UNAVAILABLE_DATE_userSelect_Boat");
           selected_bots = JSON.parse(selected_bots);
           var temp_botId = [];
           var temp_boatName = [];

           $.each(selected_bots, function (key, val) {

            temp_botId.push(val.item_id);
            temp_boatName.push(val.item_text);
            
            });

         
          if(selected_bots.length != 0 && temp_data_datte.length != 0){
            var obj = Object();
            obj.Boat_Id = temp_botId;//unique(temp_data1);
            obj.Boat_Name = temp_boatName;
            obj.UnAvailableDates = unique(temp_data_datte);;


        $.ajax({
          url: public_url_days + "AddUnavailabledaysSingle",
          type: 'POST',
          dataType: 'json', 
          data: obj,
          success: function(Related_datas) {
                       
            if(Related_datas.status == true)
            {
             alert(Related_datas.message);
             location.reload();

            }
            else if(Related_datas.status == false)
            {
              alert(Related_datas.message);
              
            }

                          
          }
        });
          }
          else{

            alert("Empty date");

          }


       });

       //UNAVAILABLE_DATE_userSelect_Boat 
      

       $(document).ready(function() {

        // Update unavailable dates for settings //Done By Alagesan 

        var max_default_fields      = 10000; //maximum input boxes allowed
        var default_wrapper   		= $(".add-date-default"); //Fields wrapper
        var add_default_button      = $(".add_field_default_button"); //Add button ID
        
        var x = 1; //initlal text box count
        $(add_default_button).click(function(e){ //on add input button click
          e.preventDefault();
          if(x < max_default_fields){ //max input box allowed
            x++; //text box increment
            $(default_wrapper).append('<div class="row date-add-field date-add-field-commen"><input type="date" id="'+x+'" class="form-control col-md-7 cls-unAvilableDates-commen" data-zdp_readonly_element="false"><a  href="#" class="remove_default_field col-md-5">Remove</a></div>'); //add input box
          }
        });
        
        $(default_wrapper).on("click",".remove_default_field", function(e){ //user click on remove text
          e.preventDefault(); $(this).parent('div').remove(); x--;
        })
        


        var max_fields      = 10000; //maximum input boxes allowed
        var wrapper   		= $(".add-date"); //Fields wrapper
        var add_button      = $(".add_field_button"); //Add button ID
        
        var x = 1; //initlal text box count
        $(add_button).click(function(e){ //on add input button click
          e.preventDefault();
          if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="row date-add-field date-add-field-single"><input type="date" class="form-control col-md-7" data-zdp_readonly_element="false"><a  href="#" class="remove_field col-md-3">Remove</a></div>'); //add input box
          }
        });
        
        $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
          e.preventDefault(); $(this).parent('div').remove(); x--;
        })
      }); 



///////////data table jitheesh////
var owner_url = "http://65.2.28.16/api/Days/";

Binding_OwnerDuration();
function Binding_OwnerDuration(){

  /*
  var obj = Object();
  obj.id_ ="";
  
  */
  

  $.ajax({
    url: owner_url +'ViewAllShares',
    type: 'get',
    dataType: 'json',
    //data: obj,
    contentType: 'application/json',
    success: function (data) {
      var firstChek = 0;
      var bindingTableData;
      $.each(data.response, function(index, val) { 
      // Update data table heading for settings //Done By Alagesan on 05.06.2021	
       var _id = val._id;
       var No_of_Shares = val.No_of_Shares;
       var Boat_Name = val.Boat_Name;
       var No_of_SummerWeekDays = val.No_of_SummerWeekDays;
       var No_of_SummerWeekEndDays =  val.No_of_SummerWeekEndDays;
       var No_of_WinterWeekDays = val.No_of_WinterWeekDays;
       var No_of_WinterWeekEndDays = val.No_of_WinterWeekEndDays;

        if(firstChek == 0){

          bindingTableData = '<tr><td>'+Boat_Name+'</td><td>'+No_of_Shares+'</td><td>'+No_of_SummerWeekDays+'</td><td>'+No_of_SummerWeekEndDays+'</td>\
          <td>'+No_of_WinterWeekDays+'</td><td>'+No_of_WinterWeekEndDays+'</td></tr>';

          firstChek = firstChek + 1;
        }
        else{

          bindingTableData += '<tr><td>'+Boat_Name+'</td><td>'+No_of_Shares+'</td><td>'+No_of_SummerWeekDays+'</td><td>'+No_of_SummerWeekEndDays+'</td>\
          <td>'+No_of_WinterWeekDays+'</td><td>'+No_of_WinterWeekEndDays+'</td></tr>';

        }

      });

      var sriptTemp = '<script>$(document).ready(function(){$("#example1").DataTable({"ordering": false,responsive:{details:{display: $.fn.dataTable.Responsive.display.modal({header: function ( row ){var data = row.data(); return "Details for "+data[0]+" "+data[1];} }),renderer: $.fn.dataTable.Responsive.renderer.tableAll( {tableClass:"table"})}}} );} );</script>'

      var bindingTabledataFirst = '<table id="example1" class="table table-striped table-bordered dt-responsive nowrap" style="width:100%">\
      <thead><tr><th>BOAT <br> NAME</th><th>NO:OF <br> SHARES</th><th>NO:OF <br> SUMMER <br> WEEKDAYS</th><th>NO:OF <br>SUMMER <br>WEEKENDS</th><th>NO:OF <br>WINTER <br>WEEKDAYS</th><th>NO:OF <br>WINTER <br>WEEKENDS</th></tr></thead>\
      <tbody>'+bindingTableData+'</tbody></table>'+sriptTemp+'';

      $("#id-table-databinding").html("");
      $("#id-table-databinding").html(bindingTabledataFirst);
  

    }
   
}); 


}
///////////data table jitheesh////

//Add special days for settings page //Done By Alagesan on 23.06.2021
setInterval(function() {

     
     
  if($("#datepiker-3").val() == "NaN-NaN-NaN"){
    $("#datepiker-3").val("");      }

  if($("#datepiker-4").val() == "NaN-NaN-NaN"){
    $("#datepiker-4").val("");
  }

}, 500);

//Add special days for settings page //Done By Alagesan on 23.06.2021
$('#datepiker-3').Zebra_DatePicker({
  pair: $('#datepiker-4')
});

$('#datepiker-4').Zebra_DatePicker({
  direction: 1,
});


      this.getAllBoatTYpes()  
      this.getAllshare();
      this.getBoats()
  }

  
  onItemSelect_CONSECUTIVEDAYS(items: any) {
    
    var finddate = this.dropdownList.find(x => x._id == items.item_id);
   // this.CONSECUTIVEDAYS_selected_Boat = JSON.parse(finddate);
    sessionStorage.setItem("CONSECUTIVEDAYS_boat",JSON.stringify(finddate));
    this.GetConsecutiveDaysByBoatId(items.item_id)
  }

  onItemSelect_Next_Booking_Day(items: any) {
    
    var finddate = this.dropdownList.find(x => x._id == items.item_id);
   // this.CONSECUTIVEDAYS_selected_Boat = JSON.parse(finddate);
    sessionStorage.setItem("Next_Booking_Day_boat",JSON.stringify(finddate));
    this.GetNextBookingDaysByBoatId(items.item_id);
  }

  onItemSelect_UNAVAILABLE_DATE(items: any) {

    this.UNAVAILABLE_DATE_userSelect.push(items);
    sessionStorage.removeItem('UNAVAILABLE_DATE_userSelect_Boat');
    sessionStorage.setItem("UNAVAILABLE_DATE_userSelect_Boat",JSON.stringify(this.UNAVAILABLE_DATE_userSelect));
        
  }

  onDeSelect_UNAVAILABLE_DATE(items: any) {   
    
    this.UNAVAILABLE_DATE_userSelect = $.grep(this.UNAVAILABLE_DATE_userSelect, function(e){ 
      return e.item_id != items.item_id; 
    });
    sessionStorage.removeItem('UNAVAILABLE_DATE_userSelect_Boat');
    sessionStorage.setItem("UNAVAILABLE_DATE_userSelect_Boat",JSON.stringify(this.UNAVAILABLE_DATE_userSelect));

  }

  onSelectAll_UNAVAILABLE_DATE(items: any) {   

    this.UNAVAILABLE_DATE_userSelect = [];
    this.UNAVAILABLE_DATE_userSelect = items;
    sessionStorage.removeItem('UNAVAILABLE_DATE_userSelect_Boat');
    sessionStorage.setItem("UNAVAILABLE_DATE_userSelect_Boat",JSON.stringify(items));
 
  }

  onDeSelectAll_UNAVAILABLE_DATE(items: any) { 
    
    this.UNAVAILABLE_DATE_userSelect = [];
    sessionStorage.removeItem('UNAVAILABLE_DATE_userSelect_Boat');
   
  }

  //onDeSelect_UNAVAILABLE_DATE

  GetNextBookingDaysByBoatId(id){
   
    var dattr = Object();
    dattr.Boat_Id = id;
    this.NEXT_BOOKING_DAYS_ALLOWED ="";
    

    this.http.post<any>(`${this.shareUrl}/GetNextBookingDaysByBoatId`,  dattr  ).subscribe(data => {
    
      if(data.status == true){
        var temp_res = data.response;       
        this.NEXT_BOOKING_DAYS_ALLOWED = temp_res[0].Next_BookingDay;
        this.Bookingform.get('Next_BookingDay').setValue(temp_res[0].Next_BookingDay);

        
      }
      else if(data.status == false){
      }
        }, err => {
         
        })
  }

  GetConsecutiveDaysByBoatId(id){
    
    var dattr = Object();
    dattr.Boat_Id = id;
    this.SUMMER_CONSECUTIVE_DAYS_ALLOWED ="";
    this.WINTER_CONSECUTIVE_DAYS_ALLOWED ="";

    this.http.post<any>(`${this.shareUrl}/GetConsecutiveDaysByBoatId`,  dattr  ).subscribe(data => {
    
      if(data.Status == true){
        this.SUMMER_CONSECUTIVE_DAYS_ALLOWED = data.Data.Summer_ConsecutiveDays;
        this.WINTER_CONSECUTIVE_DAYS_ALLOWED = data.Data.Winter_ConsecutiveDays;
        this.Consecutiveform.get('Summer_ConsecutiveDays').setValue(data.Data.Summer_ConsecutiveDays);
        this.Consecutiveform.get('Winter_ConsecutiveDays').setValue(data.Data.Winter_ConsecutiveDays);

        
      }
      else if(data.Status == false){
      }
        }, err => {
        
        })
  }


  getBoats(){
    var obj = Object();
    obj.alphabet = "";
    this.http.get<any>(`${this.OwnerUrl}/GetBoat`).subscribe(data => {
  this.boats = data['response'];
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
   })
  }


  onItemSelect(item: any) {
 
   this.Shareform.get('Boat_Name').setValue(item.item_text);
   this.Shareform.get('Boat_Id').setValue(item.item_id);
if(item.item_id){
  var obj ={
    boatid:item.item_id
  }
   this.http.post<any>(`${this.url}/GetBoatDetailsByBoatId`,  obj  ).subscribe(data => {
  
if(data.Status == true){
  this.getBoat = data.Data;
  this.getBoat = this.getBoat.response;
  this.GetBoatDetailsByBoatId_AllocatedDays =  data.Data;
 
  this.Shareform.get('No_of_Shares').setValue(this.getBoat.Owners_Allowed);
  this.Shareform.get('No_of_SummerWeekDays').setValue(this.getBoat.Summer_WeekDays);
  this.Shareform.get('No_of_SummerWeekEndDays').setValue(this.getBoat.Summer_WeekEndDays);
  this.Shareform.get('No_of_WinterWeekDays').setValue(this.getBoat.Winter_WeekDays);
  this.Shareform.get('No_of_WinterWeekEndDays').setValue(this.getBoat.Winter_WeekEndDays);
}
else if(data.Status == false){
}
      }, err => {
       
      })
    }
  }
  
  // Clear the multiselect dropdown changes for settings //Done By Alagesan on 13.06.2021	

  onItemDeSelect(item: any) {

    this.Shareform.get('No_of_Shares').setValue("");
    this.Shareform.get('No_of_SummerWeekDays').setValue("");
    this.Shareform.get('No_of_SummerWeekEndDays').setValue("");
    this.Shareform.get('No_of_WinterWeekDays').setValue("");
    this.Shareform.get('No_of_WinterWeekEndDays').setValue("");
  
  }

  onSelectAll(items: any) {
    
  }

  getAllBoatTYpes(){
    this.http.get<any>(`${this.url}/GetallBoatTypeDetails`).subscribe(data => {
     
   this.allBoatsType = data['response']
   
    }, err => {
    })
   
  }

  getAllshare(){
    this.http.get<any>(`${this.allShareUrl}/ViewAllShares`).subscribe(data => {
     
   this.shareAllocation = data['response']
  
    }, err => {
    })
  }

  editShare(data){

  }

  deleteShare(data){
    
  }
  
  editBoat(data){
    this.form.get('_id').setValue(data._id);
    this.form.get('Boat_Type').setValue(data.Boat_Type);
    this.form.get('Type_Description').setValue(data.Type_Description);
   
    $('#error-disp-btns').trigger('click');
  }
updateBoattype(){
  this.submitted = true;

  if (this.form.invalid) {
    return;
  }

 
  this.http.post<any>(`${this.url}/EditBoatType`,  this.form.value   ).subscribe(data => {
   
if(data.status == true){
  this.getResponce = data.message
  $("#pop-up-btn").trigger('click')
  $('#error-disp-btns').trigger('click');
  this.form.reset()
  this.getAllBoatTYpes()  
}
else if(data.status == false){
}
      }, err => {
       
      })

}  
get f() { return this.form.controls; }
get sf() { return this.Shareform.controls; }
get cf() { return this.Consecutiveform.controls; }
get bf() { return this.Bookingform.controls; }


deleteBoat(){

var obj={
  _id : this.boatTypeId
}
this.http.post<any>(`${this.url}/DeleteBoatType`,  obj  ).subscribe(data => {
 
if(data.status == true){
 
  this.getResponce = data.message
  $('#removeBoat').trigger('click');
  $('#pop-up-btn').trigger('click');

  this.getAllBoatTYpes()  
}
else if(data.status == false){
}
    }, err => {
     
    })


}
addShare(){
 
  $('#addshare').trigger('click');

}
  createForm() {
    this.form = this.fb.group({
      _id: new FormControl('', [Validators.required,]),
      Boat_Type: new FormControl('', [Validators.required,]),
      Type_Description: new FormControl('', [Validators.required, ]),
    
    });
  }

  createShareForm() {
    this.Shareform = this.fb.group({
      Boat_Id: new FormControl('', [Validators.required,]),
      Boat_Name: new FormControl('', [Validators.required,]),
      No_of_Shares: new FormControl('', [Validators.required,]),
      No_of_SummerWeekDays: new FormControl('', [Validators.required,]),
      No_of_SummerWeekEndDays: new FormControl('', [Validators.required, ]),
      No_of_WinterWeekDays: new FormControl('', [Validators.required, ]),
      No_of_WinterWeekEndDays: new FormControl('', [Validators.required, ]),
      IsActive: new FormControl('', ),
      Status: new FormControl('', ),
      Block: new FormControl('', ),

    });
  }


  createConsecutiveForm() {
    this.Consecutiveform = this.fb.group({
      Summer_ConsecutiveDays: new FormControl('', [Validators.required,]),
      Winter_ConsecutiveDays: new FormControl('', [Validators.required,]),
      IsActive: new FormControl('', ),
      Status: new FormControl('', ),
      Block: new FormControl('', ),
      Boat_Name: new FormControl('', ),
      Boat_Id: new FormControl('', ),    

    });
  }

  createBookingForm() {
    this.Bookingform = this.fb.group({
      Next_BookingDay: new FormControl('', [Validators.required,]),
      IsActive: new FormControl('', ),
      Status: new FormControl('', ),
      Block: new FormControl('', ),

      Boat_Name: new FormControl('', ),
      Boat_Id: new FormControl('', ),

    });
  }

  //Add boat location for settings page //Done By Alagesan on 24.06.2021
  createBoatLocationForm() {
    this.addBoatLocationform = this.fb.group({
      Boat_Location: new FormControl('', [Validators.required,]),
      Location_URL: new FormControl('', [Validators.required,]),
    });
  }

  saveBoatLocation(){
    this.boatLocationSubmitted = true;
    if (this.addBoatLocationform.invalid) {
      return;
    }

    this.http.post<any>(`${this.url}/Add_Location`,  this.addBoatLocationform.value   ).subscribe(data => {
        console.log(data);
      if(data.status == true){
        this.modelTitle = "Add Boat Location"
        this.getResponce = data.message
        $('#add-boat-location-popup').trigger('click');
        this.addBoatLocationform.reset()
        this.boatLocationSubmitted = false;
    
      }
      else if(data.status == false){
      }
      
    }, err => {
    
    })
  }
  get ablf() { return this.addBoatLocationform.controls; }
  //Add special days for settings page //Done By Alagesan on 23.06.2021
  createSpecialDaysForm() {
    this.specialDaysform = this.fb.group({
      Name: new FormControl('', [Validators.required,]),
      Start_Date: new FormControl('', [Validators.required,]),
      End_Date: new FormControl('', [Validators.required,]),
    });
  }

  //Add special days for settings page //Done By Alagesan on 23.06.2021
  startDates($event)
  {
    var date1 =  new Date($event.target.value)  
    this.startDate = (date1.getFullYear()+'-' + (date1.getMonth()+1) + '-'+date1.getDate())
    this.specialDaysform.get('Start_Date').setValue(this.startDate);
  }
  endDates($event)
  {
    var date2 = new Date($event.target.value);
    this.endDate = (date2.getFullYear()+'-' + (date2.getMonth()+1) + '-'+date2.getDate())
    this.specialDaysform.get('End_Date').setValue(this.endDate);

  }

  //Add special days for settings page //Done By Alagesan on 23.06.2021
  saveSpecialDays(){
    this.specialDaysSubmitted = true;
    if (this.specialDaysform.invalid) {
      return;
    }

    this.http.post<any>(`${this.specialDaysUrl}/Add_Special_Days_Booking`,  this.specialDaysform.value   ).subscribe(data => {
        console.log(data);
      if(data.status == true){
        this.modelTitle = "Add Special Days"
        this.getResponce = data.message
        $('#special-days-pop-up-btn').trigger('click');
        this.specialDaysform.reset()
        this.specialDaysSubmitted = false;
    
      }
      else if(data.status == false){
      }
      
    }, err => {
    
    })
  }

//Add special days for settings page //Done By Alagesan on 23.06.2021
  get sdf() { return this.specialDaysform.controls; }

  createBoatTypeForm() {
    this.addBoatTypeform = this.fb.group({
      Boat_Type: new FormControl('', [Validators.required,]),
      Block: new FormControl('', []),
      IsActive: new FormControl('', []),
      Type_Description: new FormControl('', [Validators.required,]),
    });
  }
  get abtf() { return this.addBoatTypeform.controls; }

  addBoatType() {
    this.addBoatTypesubmitted = true;
  
    if (this.addBoatTypeform.invalid) {
      return;
    }
      console.log(this.addBoatTypeform.value);
    this.addBoatTypeform.get('Block').setValue("true");
    this.addBoatTypeform.get('IsActive').setValue("true");
    this.http.post<any>(`${this.url}/AddBoatType`, this.addBoatTypeform.value).subscribe(data => {
     console.log(data);
      if (data.status == true) {
        this.modelTitle = "Add Boat Type"
        this.getResponce = data.message
        $('#add-boat-type-popup').trigger('click');
        this.addBoatTypeform.reset()
        $("#pop-up-btn").trigger('click');
        this.addBoatTypesubmitted = false;

      }
      else if(data.status == false){
      }
    }, err => {


      console.log(err);
    })
  }

  saveShare(){
  
    this.shareSubmitted = true;
  if (this.Shareform.invalid) {
    return;
  }

  
  var Shareform_val = this.Shareform.value;
  var AllocatedDays = this.GetBoatDetailsByBoatId_AllocatedDays.AllocatedDays;
  
  var total_summer = parseInt(Shareform_val.No_of_SummerWeekDays) + parseInt(Shareform_val.No_of_SummerWeekEndDays);
  var total_winder = parseInt(Shareform_val.No_of_WinterWeekDays) + parseInt(Shareform_val.No_of_WinterWeekEndDays);



  if(AllocatedDays[0].Summer_Days < total_summer)
  {
    alert("Summer Allocated Days "+ AllocatedDays[0].Summer_Days);
    return;
  }

  if(AllocatedDays[0].Winter_Days < total_winder)
  {
    alert("winter Allocated Days "+ AllocatedDays[0].Winter_Days);
    return;
  }




  this.Shareform.get('IsActive').setValue(true);
  this.Shareform.get('Status').setValue("Enable");
  this.Shareform.get('Block').setValue(true);

    
    this.http.post<any>(`${this.shareUrl}/AddNewShares`,  this.Shareform.value   ).subscribe(data => {
    
  if(data.status == true){
    this.modelTitle = "Share Allocation"
    this.getResponce = data.message
    $('#addshare').trigger('click');
    $('#Sharepop-up-btn').trigger('click');
    this.Shareform.reset()
    this.shareSubmitted = false;

  }
  else if(data.status == false){
  }
        }, err => {
        
        })


  }
  addBooking(){
    this.BookingSubmitted = true;
    if (this.Bookingform.invalid) {
      return;
    }
    this.Bookingform.get('IsActive').setValue(true);
    this.Bookingform.get('Status').setValue("Enable");
    this.Bookingform.get('Block').setValue(true);
  
     
      this.http.post<any>(`${this.shareUrl}/AddNextBookings`,  this.Bookingform.value   ).subscribe(data => {
      
    if(data.status == true){
      this.getResponce = data.message
      this.Bookingform.reset()

      this.modelTitle = "Next Booking Days"
      $('#Sharepop-up-btn').trigger('click');
      this.BookingSubmitted = false;

    }
    else if(data.status == false){
    }
          }, err => {
          
          })
  
  }


  Add_NEXT_BOOKING_DAY(){
    this.Bookingform.get('IsActive').setValue(true);
    this.Bookingform.get('Status').setValue("Enable");
    this.Bookingform.get('Block').setValue(true);
   
    this.BookingSubmitted = true;
    if (this.Bookingform.invalid) {
      return;
    }
    

    var NEXT_BOOKING_DAY_selected_Boat = sessionStorage.getItem("Next_Booking_Day_boat");
    NEXT_BOOKING_DAY_selected_Boat = JSON.parse(NEXT_BOOKING_DAY_selected_Boat);
   
    this.Bookingform.get('Boat_Name').setValue(NEXT_BOOKING_DAY_selected_Boat["Boat_Name"]);
    this.Bookingform.get('Boat_Id').setValue(NEXT_BOOKING_DAY_selected_Boat["_id"]);

  
     
      this.http.post<any>(`${this.shareUrl}/AddNextBookings`,  this.Bookingform.value   ).subscribe(data => {
      
    if(data.status == true){
      //Add booking days  popup message for settings page //Done By Alagesan on 28.06.2021
      var startStr = "Next Booking Day will be Open after   ";
      var endStr = "  days to book in advance";
      this.getResponce = (startStr).concat(this.NEXT_BOOKING_DAYS_ALLOWED, endStr);
      this.Bookingform.reset()
      this.bookdropdownOwn =[]; 

      this.modelTitle = "Next Booking Days"
      $('#Sharepop-up-btn').trigger('click');
      this.BookingSubmitted = false;

    }
    else if(data.status == false){
    }
          }, err => {
           
          })
  
  }


  Add_CONSECUTIVE_DAYS(){
    this.Consecutiveform.get('IsActive').setValue(true);
    this.Consecutiveform.get('Status').setValue("Enable");
    this.Consecutiveform.get('Block').setValue(true);
    this.shareSubmitted = true;
   

    if (this.Consecutiveform.invalid) {
      return;
    }
    
  

    
    var CONSECUTIVEDAYS_selected_Boat = sessionStorage.getItem("CONSECUTIVEDAYS_boat");
    CONSECUTIVEDAYS_selected_Boat = JSON.parse(CONSECUTIVEDAYS_selected_Boat);

    var temp_boat_id = CONSECUTIVEDAYS_selected_Boat["_id"];
    var temp_Boat_Name = CONSECUTIVEDAYS_selected_Boat["Boat_Name"];

    this.Consecutiveform.get('Boat_Name').setValue(temp_Boat_Name);
    this.Consecutiveform.get('Boat_Id').setValue(temp_boat_id);
   
  
     
      this.http.post<any>(`${this.shareUrl}/AddConsecutiveDays`,  this.Consecutiveform.value   ).subscribe(data => {
      
    if(data.status == true){
      this.getResponce = data.message
      this.Consecutiveform.reset()
      this.dropdownOwn =[]; 

      this.modelTitle = "Consecutive Days"
      $('#Sharepop-up-btn').trigger('click');
  
    }
    else if(data.status == false){
    }
          }, err => {
           
          })
  
  
  }

  addConsecutive(){
    this.shareSubmitted = true;
    if (this.Consecutiveform.invalid) {
      return;
    }
    this.Consecutiveform.get('IsActive').setValue(true);
    this.Consecutiveform.get('Status').setValue("Enable");
    this.Consecutiveform.get('Block').setValue(true);
  
     
      this.http.post<any>(`${this.shareUrl}/AddConsecutivDays`,  this.Consecutiveform.value   ).subscribe(data => {
       
    if(data.status == true){
      this.getResponce = data.message
      this.Consecutiveform.reset()

      this.modelTitle = "Consecutive Days"
      $('#Sharepop-up-btn').trigger('click');
  
    }
    else if(data.status == false){
    }
          }, err => {
          
          })
  
  
  }
  deleteBoatModel(id){
   
    this.boatTypeId = id._id
    $('#removeBoat').trigger('click');

  }
}
