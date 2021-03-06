import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import {GetServiceService} from 'src/app/get-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import environment for settings Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
import {MainModel} from '../main-model'
import { observable } from 'rxjs';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // Add Base URL for settings  Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;
  mainmodel: any = MainModel;
  url = this.EnvironmentURL+"api/Boat"
  shareUrl = this.EnvironmentURL+"api/Days"
  allShareUrl = this.EnvironmentURL+'api/Days';
  OwnerUrl = this.EnvironmentURL+"api/Owner"
  //Add special days for settings page //Done By Alagesan on 23.06.2021
  specialDaysUrl = this.EnvironmentURL+"api/AddSpecialDaysRout"
  specialDaysform: FormGroup;
  specialDaysSubmitted = false;
  startDate: any=[];
  endDate: any=[];

  //Add boat location for settings page //Done By Alagesan on 24.06.2021
  addBoatLocationform: FormGroup;
  boatLocationSubmitted = false;

  editBoatLocationform: FormGroup;
  editboatLocationSubmitted = false;

  //Add boat type for settings page //Done By Alagesan on 25.06.2021
  addBoatTypeform: FormGroup;
  addBoatTypesubmitted = false;

  //Edit boat type for settings page //Done By Alagesan on 18.07.2021
  editBoatTypeform: FormGroup;
  editBoatTypesubmitted = false;

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
  boatTypeId: string;
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
  ViewAllPreLaunchAndLaunchBookingDays: any;
  dropdownOwn: any;
  bookdropdownOwn: any;
  adminlogin: any;
  GetBoatDetailsByBoatId_AllocatedDays: any;

  editBtnFlag= false
  addBtnFlag = true
  locationData:any;
  locationDeleteId:string;
  SummerConsecutiveDaysMessage:string;
  WinterConsecutiveDaysMessage:string;
  BookingDaysMessage:string;

  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private ps: GetServiceService) {
      this.createForm();
      this.createShareForm();
      this.createConsecutiveForm();
      this.createBookingForm();
      this.createSpecialDaysForm() ;
      this.createBoatLocationForm();
      this.createBoatTypeForm();
      this.createEditBoatLocationForm();
      this.createEditBoatTypeForm();

     }

  ngOnInit(): void {

    var public_Get_Location_Details = [];
    this.startTimer_set_locations_Edit()
    var public_Get_Boat_Type = [];
    this.startTimer_set_boat_type_Edit()

    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }

    var data_getCurrentTab = sessionStorage.getItem("currentTab_settings");
    if (typeof data_getCurrentTab !== "undefined" && data_getCurrentTab != null)
    {

      var getTabDatas = JSON.parse(data_getCurrentTab);
      $("#"+getTabDatas.tab).attr("class", "active");
      $("#"+getTabDatas.panel).attr("class", "show active");
      $("#"+getTabDatas.tab).css({
        'background-color' : '#222f87',
        'color' : 'white',
        'padding' : '10px 30px 10px 30px'
     });


      // obj.tab = tab_tmp;
      // obj.panel = panel_temp;

      //$("#"+tab_tmp).removeClass('active');
   // $("#"+panel_temp).removeClass('show active');


    }
    else{

      $("#tab-A").attr("class", "active");
      $("#pane-A").attr("class", "show active");
      $("#tab-A").css({
        'background-color' : '#222f87',
        'color' : 'white',
        'padding' : '10px 30px 10px 30px'
     });

      /*    background-color: #222f87;
    color: white;
    padding: 10px 30px 10px 30px; */

    }



    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");
 sessionStorage.removeItem('UNAVAILABLE_DATE_userSelect_Boat');
 //UNAVAILABLE_DATE_userSelect_Boat

   var url = this.EnvironmentURL+'api/Boat/';
   var public_url_days = this.EnvironmentURL+"api/Days/";
   var AddSpecialDaysRout = this.EnvironmentURL+'api/AddSpecialDaysRout/';
   var public_Edit_Id = "0";
   var public_specialData_getAll_Datas = null;
   var unavailable_days_url = this.EnvironmentURL+"api/Days/";
   var locations_url = this.EnvironmentURL+'api/Boat/';

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

  this.getAllBoatTYpes()  
  this.getAllshare();
  this.getBoats();
  this.getLocationsRedirect();
  this.getAll_ViewAllPreLaunchAndLaunchBookingDays();




  $('#text-id-special-days-Start').Zebra_DatePicker({
    //format: 'm/d/yyyy',
    direction: true,
    //pair: $('#datepicker-launch-date')
    pair: $('#text-id-special-days-End')
  });

  $('#text-id-special-days-End').Zebra_DatePicker({
    //format: 'm/d/yyyy',
    direction: 1,
    


  });


  setInterval(function () {

    
    if ($("#text-id-special-days-Start").val() == "NaN-NaN-NaN") {
      
        $("#text-id-special-days-Start").val("");
    }

    if ($("#text-id-special-days-End").val() == "NaN-NaN-NaN") {
      console.log("errror...2");
      $("#text-id-special-days-End").val("");
    }
 

  }, 100);
  

  $(document).on("click",".nav-link",function() {

    var panel_temp = $(this).attr('linktype');
    var tab_tmp =  $(this).attr('id');
    var obj = Object();
    obj.tab = tab_tmp;
    obj.panel = panel_temp;
    sessionStorage.setItem("currentTab_settings",JSON.stringify(obj));


    $("#"+tab_tmp).removeClass('active');
    $("#"+panel_temp).removeClass('show active');

    location.reload();

    //$("#box").attr("class", "active");


    //alert(get_hrefValue +"-" + id);
   });



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

   //Get_UnAvailabe_Days();
  // Get_Locations_Data();
  // GetAll_AddSpecial_Days();
     
       // Edit boat type  for settings //Done By Alagesan on 18.07.2021
      $(document).on("click",".cls-boat-type-edit",function() {

        var getEditid = $(this).attr('id');
        console.log(getEditid);
        var temp_Arry = public_Get_Boat_Type.find(x => x._id == getEditid);
        sessionStorage.setItem("set_boat_type_Edit",JSON.stringify(temp_Arry));
        
      });

        // Edit boat type mouseover  for settings //Done By Alagesan on 18.07.2021
      $(document).on("mouseover",".cls-boat-type-edit",function() {
      
        var getdEditid = $(this).attr('id');

        $("#"+getdEditid).css("color", "red");
        $("#"+getdEditid).css('cursor','pointer');
        

      });

        // Edit boat type mouseout  for settings //Done By Alagesan on 18.07.2021
      $(document).on("mouseout",".cls-boat-type-edit",function() {

        var getdEditid = $(this).attr('id');

        $("#"+getdEditid).css("color", "black");
        

      });

        // Delete boat type  for settings //Done By Alagesan on 18.07.2021
      $(document).on("click",".cls-boat-type-delete",function() {

        var getdeleteid = $(this).attr('id');
        console.log(getdeleteid);
        var temp_Arry = public_Get_Boat_Type.find(x => x._id == getdeleteid);
        sessionStorage.setItem("set_boat_type_Delete",JSON.stringify(temp_Arry));
        

      });
        // Delete boat type mouseover  for settings //Done By Alagesan on 18.07.2021
      $(document).on("mouseover",".cls-boat-type-delete",function() {

        var getdeleteid = $(this).attr('id');

        $(this).css("color", "red");
        $(this).css('cursor','pointer');
        

      });
        // Delete boat type mouseout  for settings //Done By Alagesan on 18.07.2021
      $(document).on("mouseout",".cls-boat-type-delete",function() {
        
        var getdeleteid = $(this).attr('id');

        $(this).css("color", "black");
        

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

          public_Get_Boat_Type = data.response;

            if(data.status == true)
            {
              var bindingTableData;
              var bindingNumber = 1;
              var firstChek = 0;

              


              $.each(data.response , function(index, val) { 


                var count = 35;
                var boatTypeDataId = val._id;
                var discription =val.Type_Description;
                  discription = discription.slice(0, count) + (discription.length > count ? "..." : "");

                if(firstChek == 0){
                  
                  bindingTableData = '<tr><td>'+bindingNumber +'</td><td>'+val.Boat_Type+'\
                  </td><td data-toggle="tooltip" title="'+val.Type_Description+'">'+ discription +'</td><td><ul class="table-action">\
                  <li><a class="cls-boat-type-edit" id="'+boatTypeDataId+'"><i class="far fa-edit" aria-hidden="true">\
                  </i></a></li><li><a class="cls-boat-type-delete" id="'+boatTypeDataId+'"><i class="far fa-trash-alt" aria-hidden="true">\
                  </i></a></li></ul></td></tr>';
                  firstChek = 1;

                }
                else{
                bindingTableData += '<tr><td>'+bindingNumber +'</td><td>'+val.Boat_Type+'</td><td data-toggle="tooltip" title="'+val.Type_Description+'">'+ discription +'</td><td><ul class="table-action"><li><a class="cls-boat-type-edit" id="'+boatTypeDataId+'"><i class="far fa-edit" aria-hidden="true"></i></a></li><li><a class="cls-boat-type-delete" id="'+boatTypeDataId+'"><i class="far fa-trash-alt" aria-hidden="true"></i></a></li></ul></td></tr>';


                }

                bindingNumber = bindingNumber + 1;


              });

              var sriptTemp = '<script>$(document).ready(function(){$("#example1").DataTable({responsive:{details:{display: $.fn.dataTable.Responsive.display.modal({header: function ( row ){var data = row.data(); return "Details for "+data[0]+" "+data[1];} }),renderer: $.fn.dataTable.Responsive.renderer.tableAll( {tableClass:"table"})}}} );} );</script>'
              

               var bindingTabledataFirst ='<table id="example1"class="table table-striped table-bordered dt-responsive nowrap" style="width:100%"><thead><tr><th>SL No</th><th>BOAT TYPE</th><th>DESCRIPTION</th><th>ACTION</th></tr></thead><tbody id="id-tbody-allBoats">'+bindingTableData+'</tbody></table>'+sriptTemp+'';
                                     
              $("#temp-data-bindings").html(bindingTabledataFirst);


              Get_UnAvailabe_Days();
            
            }
            else
            {
              Get_UnAvailabe_Days();
              
            }

            

        }
       
    });      
      
    }

    function getFormattedDate_second(dateVal) {
      var newDate = new Date(dateVal);
  
      var sMonth = padValue(newDate.getMonth() + 1);
      var sDay = padValue(newDate.getDate());
      var sYear = newDate.getFullYear();
      var sHour = newDate.getHours();
      var sMinute = padValue(newDate.getMinutes());
      var sAMPM = "AM";
  
      var iHourCheck = Number(sHour);
  
      if (iHourCheck > 12) {
          sAMPM = "PM";
          sHour = iHourCheck - 12;
      }
      else if (iHourCheck === 0) {
          sHour = 12;
      }
  
      sHour = padValue(sHour);
  
      //return sDay + "-" + sMonth + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
      return sDay + "-" + sMonth + "-" + sYear;

  }

  function padValue(value) {
    return (value < 10) ? "0" + value : value;

  }
  function string_to_Date_Convert(dateString){   

    var dateArray = dateString.split("-");
    var dateObj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
  
    return dateObj;

  }

  $(document).on("click","#a-Id-special-days-Edit",function() {

    
    var startDate = $("#text-id-special-days-Start").val();
   var Eenddate = $("#text-id-special-days-End").val();

    var Obj = Object();
    Obj._id = public_Edit_Id;
    Obj.Name = $("#text-id-special-days-Name").val();
    Obj.Start_Date = string_to_Date_Convert(startDate);
    Obj.End_Date = string_to_Date_Convert(Eenddate);


console.log(Obj);

  $.ajax({
    url: AddSpecialDaysRout+"EditSpecialDays",
    type: 'POST',
    dataType: 'json', 
    data: Obj,
    success: function(datas) {     
                    
        if(datas.status == true)
        {
          CommenMessage_save(datas.message);
            //location.reload();    
        }
        else if(datas.status == false)
        {                    
          CommenMessage(datas.message);
            //location.reload();    
        }
    

    },
    error: function (error) {               
        
        console.log(error.responseText);
                
    }
});




  });

$(document).on("click",".cls-special-days-Edit",function() { 
  
 public_Edit_Id = $(this).attr('id-Edit');
 var dats = public_specialData_getAll_Datas.find(x => x._id == public_Edit_Id);
  $("#text-id-special-days-Name").val(dats.Name);
  $("#text-id-special-days-Start").val(getFormattedDate_second(dats.Start_Date));
  $("#text-id-special-days-End").val(getFormattedDate_second(dats.End_Date));

 $("#a-Id-special-days-Save").hide();
 $("#a-Id-special-days-Edit").show(); 
 
 });

 $(document).on("mouseover",".cls-special-days-Edit",function() {
 
  var getdeleteid = $(this).attr('id-Edit');

  $('li[id-Edit="'+getdeleteid+'"]').css("color", "red");
  $('li[id-Edit="'+getdeleteid+'"]').css('cursor','pointer');
  

 });

 $(document).on("mouseout",".cls-special-days-Edit",function() {
  
  var getdeleteid = $(this).attr('id-Edit');

  $('li[id-Edit="'+getdeleteid+'"]').css("color", "black");
  

 });


 $(document).on("click",".cls-special-days-Delete",function() {
 
  var Obj = Object();
    Obj._id = $(this).attr('id-Delete');
    
  $.ajax({
    url: AddSpecialDaysRout+"DeleteSpecialDays",
    type: 'POST',
    dataType: 'json', 
    data: Obj,
    success: function(datas) {     
                    
        if(datas.status == true)
        {
          CommenMessage_save(datas.message);
            //location.reload();    
        }
        else if(datas.status == false)
        {                    
          CommenMessage(datas.message);
            //location.reload();    
        }
    

    },
    error: function (error) {               
        
        console.log(error.responseText);
                
    }
});


    
 });

 $(document).on("mouseover",".cls-special-days-Delete",function() {
 
  var getdeleteid = $(this).attr('id-Delete');

  $('li[id-Delete="'+getdeleteid+'"]').css("color", "red");
  $('li[id-Delete="'+getdeleteid+'"]').css('cursor','pointer');
  

 });

 $(document).on("mouseout",".cls-special-days-Delete",function() {
  
  var getdeleteid = $(this).attr('id-Delete');

  $('li[id-Delete="'+getdeleteid+'"]').css("color", "black");
  

 });
 


    function GetAll_AddSpecial_Days(){
      $.ajax({
        url: AddSpecialDaysRout +'List_SpecialDays',
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
              public_specialData_getAll_Datas = data.response;
              


              $.each(data.response , function(index, val) { 

                 var StartDate =  getFormattedDate_second(val.Start_Date);
                 var EndDate =  getFormattedDate_second(val.End_Date);

                if(firstChek == 0){
                  
                  bindingTableData = '<tr><td>'+bindingNumber +'</td><td>'+val.Name+'\
                  </td><td>'+ StartDate +'</td><td>'+ EndDate +'</td><td><ul class="table-action">\
                  <li id-Edit ="'+val._id+'" class="cls-special-days-Edit"><a  class=""><i class="far fa-edit" aria-hidden="true">\
                  </i></a></li><li id-Delete ="'+val._id+'" class="cls-special-days-Delete"><a (click)=deleteBoatModel(data)><i class="far fa-trash-alt" aria-hidden="true">\
                  </i></a></li></ul></td></tr>';
                  firstChek = 1;

                }
                else{
                bindingTableData += '<tr><td>'+bindingNumber +'</td><td>'+val.Name+'</td><td>'+ StartDate +'</td><td>'+ EndDate +'</td><td><ul class="table-action"><li id-Edit ="'+val._id+'"  class="cls-special-days-Edit"><a class=""><i class="far fa-edit" aria-hidden="true"></i></a></li><li id-Delete ="'+val._id+'" class="cls-special-days-Delete"><a><i class="far fa-trash-alt" aria-hidden="true"></i></a></li></ul></td></tr>';


                }

                bindingNumber = bindingNumber + 1;


              });

              var sriptTemp = '<script>$(document).ready(function(){$("#example4").DataTable({responsive:{details:{display: $.fn.dataTable.Responsive.display.modal({header: function ( row ){var data = row.data(); return "Details for "+data[0]+" "+data[1];} }),renderer: $.fn.dataTable.Responsive.renderer.tableAll( {tableClass:"table"})}}} );} );</script>'


              var bindingTabledataFirst ='<table id="example4"class="table table-striped table-bordered dt-responsive nowrap" style="width:100%"><thead><tr><th>SL No</th><th>Name</th><th>Start Date</th><th>End Date</th><th>ACTION</th></tr></thead><tbody id="id-tbody-allBoats">'+bindingTableData+'</tbody></table>'+sriptTemp+'';

              $("#temp-data-bindings-specialDays").html(bindingTabledataFirst);

              Binding_OwnerDuration();
            
             }
             else
             {
              CommenMessage("Empty datas");

               Binding_OwnerDuration();
              
             }

        }
       
    });      
      
    }

    //id-Delete-unAvilableDay

    $(document).on("mouseover",".cls-unAvilableDay-Delete",function() {
 
      var getdeleteid = $(this).attr('id-Delete-unAvilableDay');
    
      $('a[id-Delete-unAvilableDay="'+getdeleteid+'"]').css("color", "red");
      $('a[id-Delete-unAvilableDay="'+getdeleteid+'"]').css('cursor','pointer');
      
    
     });
    
     $(document).on("mouseout",".cls-unAvilableDay-Delete",function() {
      
      var getdeleteid = $(this).attr('id-Delete-unAvilableDay');
    
      $('a[id-Delete-unAvilableDay="'+getdeleteid+'"]').css("color", "black");
      
    
     });


     $(document).on("mouseover",".cls-unAvilableDay-Delete-popup",function() {
 
      var getdeleteid = $(this).attr('id');
    
      $('a[id="'+getdeleteid+'"]').css("color", "red");
      $('a[id="'+getdeleteid+'"]').css('cursor','pointer');
      
    
     });
    
     $(document).on("mouseout",".cls-unAvilableDay-Delete-popup",function() {
      
      var getdeleteid = $(this).attr('id');
    
      $('a[id="'+getdeleteid+'"]').css("color", "black");
      
    
     });

     function CommenMessage(obj){
      $("#h4-message-type").text("Message");
      $("#p-message-content").text(obj);
      $('#btn-CommenMessage-disp-btns').trigger('click');
      //alert();
  }
  
  function CommenMessage_save(obj){
      $("#h4-message-save-type").text("Message");
      $("#p-message-save-content").text(obj);
      $('#btn-CommenMessage-save-disp-btns').trigger('click');
      //alert();
  }
  




     $(document).on("click",".cls-unAvilableDay-Delete-popup",function() {
      
      var getdeleteid = $(this).attr('id');
       
      var lengthChek = unAvilabel_boat_BySingle_sorted.length;
      if(lengthChek == 1){
        BotIdZeroThenValue =  unAvilabel_boat_BySingle_sorted[0].boat_id;

      }
      
      var sortedData = $.grep(unAvilabel_boat_BySingle_sorted, function(e){ 
        return e.serialNumber != getdeleteid; 
      });

      unAvilabel_boat_BySingle_sorted = sortedData;

      $('tr[id-tr-delete="'+getdeleteid+'"]').remove();//id-tr-delete
      console.log(unAvilabel_boat_BySingle_sorted);
    
     });

     $(document).on("click","#id-unAvilableDay-Delete-popup-save",function() {
     
      var datas = unAvilabel_boat_BySingle_sorted;
      var boatId = "0";
      var arrayPush = [];

      $.each(unAvilabel_boat_BySingle_sorted , function(index, val) {
      
      
          boatId = val.boat_id;
          arrayPush.push(val.unAvilableDate);

      })
   
      var obj = Object();

      if(boatId == "0"){
        boatId = BotIdZeroThenValue;
      }
      
      obj.Boat_id = boatId;
      obj.UnavailableDays = unique(arrayPush);

      //if(selected_bots.length != 0 && temp_data_datte.length != 0){
          console.log(obj);

        $.ajax({
          url: public_url_days + "DeleteUnAvailableDaySingle",
          type: 'POST',
          dataType: 'json', 
          data: obj,
          success: function(Related_datas) {
           
                       
            if(Related_datas.status == true)
            {

              $('#id-Unavilable-Day').trigger('click');

              CommenMessage_save(Related_datas.message);
             //location.reload();

            }
            else if(Related_datas.status == false)
            {
              CommenMessage(Related_datas.message);
              
            }

                          
          }
        });
          
      
    
     });


     function Jqueary_string_to_Date_Convert(dateString){   

      var dateArray = dateString.split("/");
      var dateObj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
    
      return dateObj;
  
    }
     
     //cls-unAvilableDay-Delete-popup

     // $('#deleteLocation').trigger('click');

     $(document).on("click",".cls-unAvilableDay-Delete",function() {      

      var getdeleteid = $(this).attr('id-Delete-unAvilableDay');
      var tmp_sortBoat = unAvilabel_boat_BySingle.filter(x => x.boat_id == getdeleteid);
      unAvilabel_boat_BySingle_sorted = tmp_sortBoat;

      var bindingTableData;
      var bindingNumber = 1;
      var firstChek = 0;

      $.each(tmp_sortBoat , function(index, val) { 
    
        if(firstChek == 0){
                  
          bindingTableData = '<tr id-tr-delete="'+val.serialNumber+'"><td>'+bindingNumber +'</td><td data-toggle="tooltip" title="'+val.unAvilableDate+'">'+val.unAvilableDate+'\
          </td><td><a id="'+val.serialNumber+'"  class="cls-unAvilableDay-Delete-popup"><i class="far fa-trash-alt" aria-hidden="true">\
          </i></a></td></tr>';
          firstChek = 1;

        }
        else{
        bindingTableData += '<tr id-tr-delete="'+val.serialNumber+'"><td>'+bindingNumber +'</td><td data-toggle="tooltip" title="'+val.unAvilableDate+'">'+val.unAvilableDate+'</td><td><a id="'+val.serialNumber+'" class="cls-unAvilableDay-Delete-popup"><i class="far fa-trash-alt" aria-hidden="true">\
        </i></a></td></tr>';


        }

        bindingNumber = bindingNumber + 1;

      });

      var sriptTemp = '<script>$(document).ready(function(){$("#datatable-unavilable-temp").DataTable({"searching": false, "bPaginate": false, responsive:{details:{display: $.fn.dataTable.Responsive.display.modal({header: function ( row ){var data = row.data(); return "Details for "+data[0]+" "+data[1];} }),renderer: $.fn.dataTable.Responsive.renderer.tableAll( {tableClass:"table"})}}} );} );</script>'

      var bindingTabledataFirst ='<table id="datatable-unavilable-temp"class="table table-striped table-bordered dt-responsive nowrap" style="width:100%"><thead><tr><th>SL No</th><th>Boat Date</th><th>ACTION</th> </tr></thead><tbody id="id-tbody-allBoats">'+bindingTableData+'</tbody></table>'+sriptTemp+'';

      $("#temp-unavailable-days-popup").html(bindingTabledataFirst);

      //$('#datatable-unavilable-temp').dataTable({searching: false, paging: false, info: false});


      $('#id-Unavilable-Day').trigger('click'); //this to start...............
      
    
     });

     var unAvilabel_boat_BySingle =[];
     var unAvilabel_boat_BySingle_sorted =[];
     var BotIdZeroThenValue;
    

    function Get_UnAvailabe_Days(){
      $.ajax({
        url: unavailable_days_url +'GetUnAvailabeDaysOfBoats',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          
              
             if(data.status == true)
             {
              var bindingTableData;
              var bindingNumber = 1;
              var firstChek = 0;
              var unavilableBoats = data.response;
              var serialnumber = 1000;
          
              var allBoatsList = JSON.parse(sessionStorage.getItem("CurrentBoatListingsettings"));
              
              var commenDays ="";
              var commn_tmp = data.CommonDays;

              $.each(commn_tmp[0].UnAvailableDates , function(index, val) { 

                var ConvertedData = split_String(val);
                commenDays += ConvertedData +" , ";


              });
              

            
              $.each(allBoatsList , function(index, val) { 
             
               var obj_tmp_date =""; 

               try{

               $.each(unavilableBoats , function(index1, val1) { 

                var val2 = val1.Boat_Id;
              //  debugger;
                //var boatSelectionId = 0;
               // $.each(val1.Boat_Id , function(index2, val2) { 

                //  debugger;
                  
                  if(val.item_id == val2)
                  {

                  
                    try {

                      $.each(val1.UnAvailableDates , function(index3, val3) {

                        debugger;
                        
                        var ConvertedData = split_String_second(val3);
                          obj_tmp_date += ConvertedData +" , ";
                          var obj_tmp = Object();
                          obj_tmp.serialNumber = serialnumber;
                          obj_tmp.boat_id = val2;
                          obj_tmp.unAvilableDate = ConvertedData;
                          unAvilabel_boat_BySingle.push(obj_tmp);

                          serialnumber = serialnumber + 1;
      
                      });
                  }
                  catch(err) {
                    //alert(err.message);
                  }

                    

                  }


                //});


               });
              }
              catch(ex){
                //alert(ex)
              }
                
               //var unAvilableDays = unavilableBoats.filter()

              
               obj_tmp_date += commenDays;

                var stringLength =  obj_tmp_date.length;

                var stringLength2 = stringLength -2 ;
                

               obj_tmp_date = obj_tmp_date.slice(0, stringLength2);
               var count = 30;
                var full_date_data = obj_tmp_date;
              var obj_tmp_date = obj_tmp_date.slice(0, count) + (obj_tmp_date.length > count ? "..." : "");

             
                if(firstChek == 0){
                  
                  bindingTableData = '<tr><td>'+bindingNumber +'</td><td data-toggle="tooltip" title="'+val.item_text+'">'+val.item_text+'\
                  </td><td data-toggle="tooltip" title="'+full_date_data+'">'+ obj_tmp_date +'</td><td><a id-Delete-unAvilableDay ="'+val.item_id+'" class="cls-unAvilableDay-Delete"><i class="far fa-trash-alt" aria-hidden="true">\
                  </i></a></td></tr>';
                  firstChek = 1;

                }
                else{
                bindingTableData += '<tr><td>'+bindingNumber +'</td><td data-toggle="tooltip" title="'+val.item_text+'">'+val.item_text+'</td><td data-toggle="tooltip" title="'+full_date_data+'">'+ obj_tmp_date +'</td><td><a id-Delete-unAvilableDay ="'+val.item_id+'" class="cls-unAvilableDay-Delete"><i class="far fa-trash-alt" aria-hidden="true">\
                </i></a></td></tr>';


                }

                bindingNumber = bindingNumber + 1;


              });

              var sriptTemp = '<script>$(document).ready(function(){$("#example2").DataTable({responsive:{details:{display: $.fn.dataTable.Responsive.display.modal({header: function ( row ){var data = row.data(); return "Details for "+data[0]+" "+data[1];} }),renderer: $.fn.dataTable.Responsive.renderer.tableAll( {tableClass:"table"})}}} );} );</script>'


              var bindingTabledataFirst ='<table id="example2"class="table table-striped table-bordered dt-responsive nowrap" style="width:100%"><thead><tr><th>SL No</th><th>Boat Name</th><th>Unavailable <br> Dates</th><th>ACTION</th> </tr></thead><tbody id="id-tbody-allBoats">'+bindingTableData+'</tbody></table>'+sriptTemp+'';

              $("#temp-unavailable-days ").html(bindingTabledataFirst);
            
              Get_Locations_Data();

             }
             else
             {
              CommenMessage("Empty datas");
               Get_Locations_Data();
              
             }

        }
       
    });      
      
    }


    function split_String(valData){
      
      var valNew=valData.split('/');
      var returnValue =  valNew[1]+"/"+valNew[0]+"/"+valNew[2];
      return returnValue;

    }
    //split_String_second

    function split_String_second(valData){
      debugger;
      var valNew=valData.split('/');
      var returnValue =  valNew[1]+"/"+valNew[0]+"/"+valNew[2];
      return returnValue;

    }



     // Edit location  for settings //Done By Alagesan on 17.07.2021
    $(document).on("click",".cls-location-Edit",function() {

      var getEditid = $(this).attr('id');
      console.log(getEditid);
      var temp_Arry = public_Get_Location_Details.find(x => x._id == getEditid);
      sessionStorage.setItem("set_Location_Details_Edit",JSON.stringify(temp_Arry));
      
     });

      // Edit location mouseover  for settings //Done By Alagesan on 17.07.2021
     $(document).on("mouseover",".cls-location-Edit",function() {
     
      var getdEditid = $(this).attr('id');
    
      $("#"+getdEditid).css("color", "red");
      $("#"+getdEditid).css('cursor','pointer');
      
    
     });

      // Edit location mouseout  for settings //Done By Alagesan on 17.07.2021
     $(document).on("mouseout",".cls-location-Edit",function() {
  
      var getdEditid = $(this).attr('id');
    
      $("#"+getdEditid).css("color", "black");
      
    
     });

      // Delete location  for settings //Done By Alagesan on 17.07.2021
     $(document).on("click",".cls-location-Delete",function() {

      var getdeleteid = $(this).attr('id');
      console.log(getdeleteid);
      $('#deleteLocation').trigger('click');
      var temp_Arry = public_Get_Location_Details.find(x => x._id == getdeleteid);
      sessionStorage.setItem("set_Location_Details_Delete",JSON.stringify(temp_Arry));
      
    
     });
      // Delete location mouseover  for settings //Done By Alagesan on 17.07.2021
     $(document).on("mouseover",".cls-location-Delete",function() {
 
      var getdeleteid = $(this).attr('id');
    
      $(this).css("color", "red");
      $(this).css('cursor','pointer');
      
    
     });
      // Delete location mouseout  for settings //Done By Alagesan on 17.07.2021
     $(document).on("mouseout",".cls-location-Delete",function() {
      
      var getdeleteid = $(this).attr('id');
    
      $(this).css("color", "black");
      
    
     });
    
    
     

    function Get_Locations_Data(){
      $.ajax({
        url: locations_url +'GetLocation',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          public_Get_Location_Details = data.response;

            if(data.status == true)
            {
              var bindingTableData;
              var bindingNumber = 1;
              var firstChek = 0;
            
              $.each(data.response , function(index, val) { 
                console.log(val)
                var count = 30;
                var Location_Id        = val._id; 
                var Boat_Location =  val.Boat_Location;
                var Location_URL = val.Location_URL;
                 // Set location URL size  for settings //Done By Alagesan on 19.07.2021
                Location_URL = Location_URL.slice(0, count) + (Location_URL.length > count ? "..." : "");

                if(firstChek == 0){
                  
                  bindingTableData = '<tr><td>'+bindingNumber +'</td><td>'+Boat_Location+'\
                  </td><td>'+Location_URL+'</td><td><ul class="table-action">\
                  <li><a  class="cls-location-Edit" id="'+Location_Id+'"><i class="far fa-edit" aria-hidden="true">\
                  </i></a></li><li><a class="cls-location-Delete" id="'+Location_Id+'"><i class="far fa-trash-alt" aria-hidden="true">\
                  </i></a></li></ul></td></tr>';
                  firstChek = 1;

                }
                else{
                bindingTableData += '<tr><td>'+bindingNumber +'</td><td>'+Boat_Location+'</td><td>'+Location_URL+'</td><td><ul class="table-action">\
                <li><a  class="cls-location-Edit" id="'+Location_Id+'"><i class="far fa-edit" aria-hidden="true">\
                </i></a></li><li><a class="cls-location-Delete" id="'+Location_Id+'"><i class="far fa-trash-alt" aria-hidden="true">\
                </i></a></li></ul></td></tr>';


                }

                bindingNumber = bindingNumber + 1;


              });

              var sriptTemp = '<script>$(document).ready(function(){$("#example3").DataTable({responsive:{details:{display: $.fn.dataTable.Responsive.display.modal({header: function ( row ){var data = row.data(); return "Details for "+data[0]+" "+data[1];} }),renderer: $.fn.dataTable.Responsive.renderer.tableAll( {tableClass:"table"})}}} );} );</script>'


              var bindingTabledataFirst ='<table id="example3"class="table table-striped table-bordered dt-responsive nowrap" style="width:100%"><thead><tr><th>SL No</th><th>Location</th><th>URL</th><th>ACTION</th></tr></thead><tbody id="id-tbody-allBoats">'+bindingTableData+'</tbody></table>'+sriptTemp+'';

              $("#temp-locations-data").html(bindingTabledataFirst);

              GetAll_AddSpecial_Days();
            
            }
            else
            {
              CommenMessage("Empty datas");
              GetAll_AddSpecial_Days();
              
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
                  
                  console.log(obj);
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
           var selected_bots_tmp = JSON.parse(selected_bots);
          // var temp_botId = selected_bots_tmp.item_id;         
           //var temp_boatName = selected_bots_tmp.item_text;

          //  $.each(selected_bots, function (key, val) {

          //   temp_botId.push(val.item_id);
          //   temp_boatName.push(val.item_text);
            
          //   });

       
          //if(selected_bots.length != 0 && temp_data_datte.length != 0){
          if(selected_bots != null){
            var obj = Object();
            obj.Boat_Id = selected_bots_tmp[0].item_id;//temp_botId;//unique(temp_data1);
            obj.Boat_Name = selected_bots_tmp[0].item_text; //temp_boatName;
            obj.UnAvailableDates = unique(temp_data_datte);;

            console.log(obj);


        $.ajax({
          url: public_url_days + "AddUnavailabledaysSingle",
          type: 'POST',
          dataType: 'json', 
          data: obj,
          success: function(Related_datas) {
                       
            if(Related_datas.status == true)
            {
              CommenMessage_save(Related_datas.message);
             //location.reload();

            }
            else if(Related_datas.status == false)
            {
              CommenMessage(Related_datas.message);
              
            }

                          
          }
        });
          }
          else{

            CommenMessage("Empty date");

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
var owner_url = this.EnvironmentURL+"api/Days/";


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

      var sriptTemp = '<script>$(document).ready(function(){$("#example5").DataTable({"ordering": false,responsive:{details:{display: $.fn.dataTable.Responsive.display.modal({header: function ( row ){var data = row.data(); return "Details for "+data[0]+" "+data[1];} }),renderer: $.fn.dataTable.Responsive.renderer.tableAll( {tableClass:"table"})}}} );} );</script>'

      var bindingTabledataFirst = '<table id="example5" class="table table-striped table-bordered dt-responsive nowrap" style="width:100%">\
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


     
}

// Edit and delete location for settings Done By Alagesan on 17.07.2021  
startTimer_set_locations_Edit() {
  setInterval(() => {
   var temp_data = sessionStorage.getItem("set_Location_Details_Edit");
   if(typeof temp_data !== "undefined" && temp_data != null)
   {
     sessionStorage.removeItem("set_Location_Details_Edit");
     var obj = JSON.parse(temp_data);
     this.editLocations(obj);
   }     

   var temp_delete_data = sessionStorage.getItem("set_Location_Details_Delete");
   if(typeof temp_delete_data !== "undefined" && temp_delete_data != null)
   {
     sessionStorage.removeItem("set_Location_Details_Delete");
     var deleteobj = JSON.parse(temp_delete_data);
     this.deleteLocationsbyId(deleteobj._id);
   }   
   
 },1000)
}

// Edit and delete boat type for settings Done By Alagesan on 18.07.2021  
startTimer_set_boat_type_Edit(){
  setInterval(() => {
    var boat_type_data = sessionStorage.getItem("set_boat_type_Edit");
    if(typeof boat_type_data !== "undefined" && boat_type_data != null)
    {
      sessionStorage.removeItem("set_boat_type_Edit");
      var obj = JSON.parse(boat_type_data);
      this.editBoat(obj);
    }     
 
    var boat_type_delete = sessionStorage.getItem("set_boat_type_Delete");
    if(typeof boat_type_delete !== "undefined" && boat_type_delete != null)
    {
      sessionStorage.removeItem("set_boat_type_Delete");
      var deleteobj = JSON.parse(boat_type_delete);
      this.deleteBoatModel(deleteobj._id);
    }   
    
  },1000)
}


  
  onItemSelect_CONSECUTIVEDAYS(items: any) {
    
    var finddate = this.dropdownList.find(x => x._id == items.item_id);
   // this.CONSECUTIVEDAYS_selected_Boat = JSON.parse(finddate);
    sessionStorage.setItem("CONSECUTIVEDAYS_boat",JSON.stringify(finddate));
    this.GetConsecutiveDaysByBoatId(items.item_id)
  }

  onItemDeSelect_CONSECUTIVEDAYS(items: any){
    this.Consecutiveform.get('Summer_ConsecutiveDays').setValue("");
    this.Consecutiveform.get('Winter_ConsecutiveDays').setValue("");
    this.Consecutiveform.get('Booking_Days').setValue("");
  }

  onItemSelect_Next_Booking_Day(items: any) {
    
    var finddate = this.dropdownList.find(x => x._id == items.item_id);
   // this.CONSECUTIVEDAYS_selected_Boat = JSON.parse(finddate);
    sessionStorage.setItem("Next_Booking_Day_boat",JSON.stringify(finddate));
    this.GetNextBookingDaysByBoatId(items.item_id);
  }

  onItemDeSelect_Next_Booking_Day(items: any){
    this.Bookingform.get('Next_BookingDay').setValue("");
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

        if(data.Data != null)
          {
            this.SUMMER_CONSECUTIVE_DAYS_ALLOWED = data.Data.Summer_ConsecutiveDays;
            this.WINTER_CONSECUTIVE_DAYS_ALLOWED = data.Data.Winter_ConsecutiveDays;
            this.Consecutiveform.get('Summer_ConsecutiveDays').setValue(data.Data.Summer_ConsecutiveDays);
            this.Consecutiveform.get('Winter_ConsecutiveDays').setValue(data.Data.Winter_ConsecutiveDays);
          }
          if(this.ViewAllPreLaunchAndLaunchBookingDays != null)
          {
            var getdatsa = this.ViewAllPreLaunchAndLaunchBookingDays.find(x => x.Boat_Id == id);
            if(getdatsa != null){

              this.Consecutiveform.get('Booking_Days').setValue(getdatsa.Booking_Days);
            }
          }





        
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
             sessionStorage.setItem("CurrentBoatListingsettings",JSON.stringify(tempArry));
  
   }, err => {
   })
  }


  onItemSelect(item: any) {

   

    var binding_sharealow = this.shareAllocation.find(x => x.Boat_Id == item.item_id);
 
   this.Shareform.get('Boat_Name').setValue(item.item_text);
   this.Shareform.get('Boat_Id').setValue(item.item_id);
if(item.item_id){
  var obj = Object();
    obj.boatid =item.item_id;
    //obj._id =binding_sharealow._id;

  
  
   //this.http.post<any>(`${this.url}/GetBoatDetailsByBoatId`,  obj  ).subscribe(data => {
     this.http.post<any>(`${this.shareUrl}/GetShareDetailsByBoatId`,  obj  ).subscribe(data => {
  
if(data.Status == true){
 
  this.getBoat = data.Data;
  this.getBoat = this.getBoat.response;
  this.GetBoatDetailsByBoatId_AllocatedDays =  data.Data;
  var AllocatedDays = data.Data.AllocatedDays[0];
  var No_of_Shares_tmp = AllocatedDays.No_Of_Shares;
 
  this.Shareform.get('No_of_Shares').setValue(No_of_Shares_tmp);
  this.Shareform.get('No_of_SummerWeekDays').setValue(this.getBoat.No_of_SummerWeekDays);
  this.Shareform.get('No_of_SummerWeekEndDays').setValue(this.getBoat.No_of_SummerWeekEndDays);
  this.Shareform.get('No_of_WinterWeekDays').setValue(this.getBoat.No_of_WinterWeekDays);
  this.Shareform.get('No_of_WinterWeekEndDays').setValue(this.getBoat.No_of_WinterWeekEndDays);
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

  getAll_ViewAllPreLaunchAndLaunchBookingDays(){
   
    this.http.get<any>(`${this.shareUrl}/ViewAllPreLaunchAndLaunchBookingDays`).subscribe(data => {
   
   this.ViewAllPreLaunchAndLaunchBookingDays = data['response']
   
  
    }, err => {
    })
  }




  editShare(data){

  }

  deleteShare(data){
    
  }
  
  // Edit boat type for settings Done By Alagesan on 18.07.2021  
  editBoat(data){
    this.editBoatTypeform.get('_id').setValue(data._id);
    this.editBoatTypeform.get('Boat_Type').setValue(data.Boat_Type);
    this.editBoatTypeform.get('Type_Description').setValue(data.Type_Description);
   
    $('#edit-boat-type-modal-btn').trigger('click');
  }
updateBoattype(){
  this.editBoatTypesubmitted = true;

  if (this.editBoatTypeform.invalid) {
    return;
  }
  this.editBoatTypeform.get('Block').setValue("true");
  this.editBoatTypeform.get('IsActive').setValue("true");
  console.log(this.editBoatTypeform.value);
  this.http.post<any>(`${this.url}/EditBoatType`,  this.editBoatTypeform.value   ).subscribe(data => {
   console.log(data);
if(data.status == true){
  this.getResponce = data.message
  this.modelTitle = "Edit Boat Type"
  $("#edit-boat-type-popup-btn").trigger('click')
  $('#edit-boat-type-modal-btn').trigger('click');
  this.editBoatTypeform.reset()
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

// Delete boat type for settings Done By Alagesan on 18.07.2021  

deleteBoatModel(id){
  console.log(id);
   this.boatTypeId = id
   $('#removeBoat').trigger('click');

 }
 
// Delete boat type for settings Done By Alagesan on 18.07.2021  
deleteBoat(){

var obj={
  _id : this.boatTypeId
}
console.log(obj);
this.http.post<any>(`${this.url}/DeleteBoatType`,  obj  ).subscribe(data => {
  console.log(data);
if(data.status == true){
 
  this.getResponce = data.message
  this.modelTitle = "Delete Boat Type"
  $('#removeBoat').trigger('click');
  $('#delete-boat-type-popup-btn').trigger('click');

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

// Clear share for settings Done By Alagesan on 22.07.2021  
clearShare(){
  this.Shareform.get('Boat_Id').setValue("");
  this.Shareform.get('Boat_Name').setValue("");
  this.Shareform.get('No_of_Shares').setValue("");
  this.Shareform.get('No_of_SummerWeekDays').setValue("");
  this.Shareform.get('No_of_SummerWeekEndDays').setValue("");
  this.Shareform.get('No_of_WinterWeekDays').setValue("");
  this.Shareform.get('No_of_WinterWeekEndDays').setValue("");
  this.Shareform.get('Status').setValue("");
  this.Shareform.get('Block').setValue("");
  this.Shareform.get('IsActive').setValue(false);
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
      _id: new FormControl('', ),

    });
  }


  createConsecutiveForm() {
    this.Consecutiveform = this.fb.group({
      Summer_ConsecutiveDays: new FormControl('', [Validators.required,]),
      Winter_ConsecutiveDays: new FormControl('', [Validators.required,]),
      Booking_Days: new FormControl('', [Validators.required,]),
      IsActive: new FormControl('', ),
      Status: new FormControl('', ),
      Block: new FormControl('', ),
      Boat_Name: new FormControl('', ),
      Boat_Id: new FormControl('', ),    

    }, { 
      validators: this.ConsecutiveFormValidations.bind(this)
    });
  }

  // for settings page //Done By Alagesan on 29.07.2021
  ConsecutiveFormValidations(formGroup: FormGroup) {
    const { value: SummerConsecutiveDays } = formGroup.get('Summer_ConsecutiveDays');
    const { value: WinterConsecutiveDays } = formGroup.get('Winter_ConsecutiveDays');
    const { value: BookingDays } = formGroup.get('Booking_Days');
    this.SummerConsecutiveDaysMessage = "Enter the values numbers only"
    this.WinterConsecutiveDaysMessage = "Enter the values numbers only"
    this.BookingDaysMessage = "Enter the values numbers only"
    console.log(SummerConsecutiveDays);
    let summerconsecutivedays = typeof SummerConsecutiveDays;
    let winterconsecutivedays = typeof WinterConsecutiveDays;
    let bookingdays = typeof BookingDays;
    console.log(summerconsecutivedays);
    console.log(winterconsecutivedays);
    console.log(bookingdays);
   (summerconsecutivedays !== 'number' && SummerConsecutiveDays !== ''  ) ? this.SummerConsecutiveDaysMessage : this.SummerConsecutiveDaysMessage = "";
   (winterconsecutivedays !== 'number' && WinterConsecutiveDays !== ''  ) ? this.WinterConsecutiveDaysMessage : this.WinterConsecutiveDaysMessage = "";
   (bookingdays !== 'number' && BookingDays !== ''  ) ? this.BookingDaysMessage :this.BookingDaysMessage = ""
      
    

    // if(winterconsecutivedays !== 'number' && WinterConsecutiveDays !== ''  ){
    //   return this.WinterConsecutiveDaysMessage;
    // }
    // else{
    //   return this.WinterConsecutiveDaysMessage = "" ;
    // }

    // if(bookingdays !== 'number' && BookingDays !== ''  ){
    //   return this.BookingDaysMessage;
    // }
    // else{
    //   return this.BookingDaysMessage = "" ;
    // }
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
        this.editBtnFlag= false
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

  // Edit boat location for settings page //Done By Alagesan on 16.07.2021
   createEditBoatLocationForm() {
    this.editBoatLocationform = this.fb.group({
      Boat_Location: new FormControl('', [Validators.required,]),
      Location_URL: new FormControl('', [Validators.required,]),
      _id :  new FormControl('', ),
    });
  }
  // Edit boat location for settings page //Done By Alagesan on 16.07.2021
  editLocations(obj){
    this.addBtnFlag = false;
   this.editBtnFlag= true
    console.log(obj)
    this.editBoatLocationform.get('_id').setValue(obj._id);
    this.editBoatLocationform.get('Boat_Location').setValue(obj.Boat_Location);
    this.editBoatLocationform.get('Location_URL').setValue(obj.Location_URL);
 
  }
 
  editBoatLocation(){
    this.editboatLocationSubmitted = true;
    if (this.editBoatLocationform.invalid) {
      return;
    }
    
    console.log(this.editBoatLocationform.value)
    this.http.post<any>(`${this.url}/EditLocation`,  this.editBoatLocationform.value   ).subscribe(data => {
        console.log(data);
      if(data.status == true){
        this.editBtnFlag= false
        this.addBtnFlag = true;
        this.modelTitle = "Edit Boat Location"
        this.getResponce = data.message
        $('#edit-boat-location-popup').trigger('click');
        this.editBoatLocationform.reset()
        this.editboatLocationSubmitted = false;
        //this.getLocationsRedirect();
      }
      else if(data.status == false){
      }
      
    }, err => {
    
    })
  }
  get eblf() { return this.editBoatLocationform.controls; }


  // Delete boat location for settings page //Done By Alagesan on 17.07.2021
  deleteLocationsbyId(obj){
    console.log(obj);
   this.locationDeleteId = obj;
  }

  // Delete boat location for settings page //Done By Alagesan on 17.07.2021
  deleteLocationdata(){
    var locationId = {
      _id : this.locationDeleteId
    }
    console.log(locationId)
    this.http.post<any>(`${this.url}/DeleteLocation`,  locationId   ).subscribe(data => {
      console.log(data);
        if(data.status==true){
          this.getResponce = data.message
          $('#delete-location-modal-popup').trigger('click');
          $('#delete-location-sucess-btn').trigger('click');
          this.getLocationsRedirect();
        } 
        }, err => {
          console.log(err);
        })
  }

  getLocationsRedirect(){
    this.http.get<any>(`${this.url}/GetLocation`).subscribe(data => {
      console.log(data);
      console.log(data.response);
    })
  }

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
    // Change start date format dd/mm/yyyy for settings//Done By Alagesan on 30.06.2021
    this.startDate = (date1.getDate()+'-' + (date1.getMonth()+1) + '-'+date1.getFullYear())
    this.specialDaysform.get('Start_Date').setValue(this.startDate);
  }
  endDates($event)
  {
    var date2 = new Date($event.target.value);
    // Change end date format dd/mm/yyyy for settings//Done By Alagesan on 30.06.2021
    this.endDate = (date2.getDate()+'-' + (date2.getMonth()+1) + '-'+date2.getFullYear())
    this.specialDaysform.get('End_Date').setValue(this.endDate);

  }

  //Add special days for settings page //Done By Alagesan on 23.06.2021
  
  
  Angular_string_to_Date_Convert(dateString){   

    var dateArray = dateString.split("-");
    var dateObj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
  
    return dateObj;

  }
  
  location_Reload(){
    location.reload();
  }
  
  saveSpecialDays(){
  

    var startDate_tmp = this.Angular_string_to_Date_Convert(this.startDate);
    var EndDate_tmp = this.Angular_string_to_Date_Convert(this.endDate);

    this.specialDaysform.get('Start_Date').setValue(startDate_tmp);
    this.specialDaysform.get('End_Date').setValue(EndDate_tmp);

    this.specialDaysSubmitted = true;
    if (this.specialDaysform.invalid) {
      return;
    }


     console.log(this.specialDaysform.value);

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


  createEditBoatTypeForm() {
    this.editBoatTypeform = this.fb.group({
      _id: new FormControl('', [Validators.required,]),
      Boat_Type: new FormControl('', [Validators.required,]),
      Block: new FormControl('', []),
      IsActive: new FormControl('', []),
      Type_Description: new FormControl('', [Validators.required,]),
    });
  }
  get ebtf() { return this.editBoatTypeform.controls; }

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
   
  // Clear boat type for settings Done By Alagesan on 22.07.2021  
  addBoatTypeClear(){
    this.addBoatTypeform.get('Boat_Type').setValue("");
    this.addBoatTypeform.get('Type_Description').setValue("");
    this.addBoatTypeform.get('Block').setValue("false");
    this.addBoatTypeform.get('IsActive').setValue("false");

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

  //console.log(this.Shareform.value);

  var datta_tmp = this.Shareform.value;
  var dt_tmp = this.shareAllocation.find(x => x.Boat_Id == datta_tmp.Boat_Id);
  if(typeof dt_tmp !== "undefined" && dt_tmp != null){
    this.Shareform.get('_id').setValue(dt_tmp._id);
  }
  
console.log(this.Shareform.value);
  

  
    
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
      //Change the popup message booking days  for settings page //Done By Alagesan on 08.07.2021
      var startStr = "The maximum days to book in advance for the has been successfully updated to    ";
      var endStr = "  days";
      this.getResponce = (startStr).concat(this.Bookingform.value.Next_BookingDay, endStr);
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

    var obj_tmp = Object()
    obj_tmp.values = this.Consecutiveform.value;
    
    console.log(this.Consecutiveform.value);

   
  
     
      this.http.post<any>(`${this.shareUrl}/AddConsecutiveDays`,  this.Consecutiveform.value   ).subscribe(data => {
     
    
    if(data.status == true){
      //this.getResponce = data.message;

      obj_tmp.messsage = data.message

      this.Consecutivedays_Between_pre_Launch_and_launch(obj_tmp)

      //this.Consecutiveform.reset()
      //this.dropdownOwn =[]; 

      //this.modelTitle = "Consecutive Days"
      //$('#Sharepop-up-btn').trigger('click');
  
    }
    else if(data.status == false){
    }
          }, err => {
           
          })
  
  
  }

  Consecutivedays_Between_pre_Launch_and_launch(values){

    // this.Consecutiveform.get('IsActive').setValue(true);
    // this.Consecutiveform.get('Status').setValue("Enable");
    // this.Consecutiveform.get('Block').setValue(true);
    // this.shareSubmitted = true;
   

    // if (this.Consecutiveform.invalid) {
    //   return;
    // }
    
  

    
    // var CONSECUTIVEDAYS_selected_Boat = sessionStorage.getItem("CONSECUTIVEDAYS_boat");
    // CONSECUTIVEDAYS_selected_Boat = JSON.parse(CONSECUTIVEDAYS_selected_Boat);

    // var temp_boat_id = CONSECUTIVEDAYS_selected_Boat["_id"];
    // var temp_Boat_Name = CONSECUTIVEDAYS_selected_Boat["Boat_Name"];

    // this.Consecutiveform.get('Boat_Name').setValue(temp_Boat_Name);
    // this.Consecutiveform.get('Boat_Id').setValue(temp_boat_id);

    console.log(values);

 
   
  
     
      this.http.post<any>(`${this.shareUrl}/AddBookingForLaunch_PreLuanch`,  values.values  ).subscribe(data => {
     

    if(data.status == true){
      this.getResponce = data.message +" - "+ values.messsage;
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
 

  pagereload(){
    location.reload();
  }

  
  /*
  
  Add spetial days
  
  */

  //MainModel
  
  

}
