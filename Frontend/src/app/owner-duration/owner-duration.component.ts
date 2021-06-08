import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-owner-duration',
  templateUrl: './owner-duration.component.html',
  styleUrls: ['./owner-duration.component.css']
})
// Create Component for owner duration //Done By Alagesan on 24.05.2021

export class OwnerDurationComponent implements OnInit {
  url = "http://65.2.28.16/api/Boat"
  OwnerUrl = "http://65.2.28.16/api/Owner"
  form: FormGroup;
  boats: any=[];
  owners: any=[];
  fromDate: any=[];
  toDate: any=[];
  setBoatType = "";
  dropdownList = [];
  dropdownList_filted = [];
  selectedItems = [];
  dropdownSettings : IDropdownSettings ;
  setOwnerBoatType = "";
  dropdownOwnerList = [];
  dropdownOwnerList_filted = [];
  selectedOwnerItems = [];
  dropdownOwnerSettings : IDropdownSettings ;
  getfromDate: any;
  getToDate: any;
  getBoat: any=[];
  getResponce: any;
  modelTitle: string;
  Duration: any;
  dropdownOwn: any;
  dropdownBoat: any;
  durationSubmitted = false;
  adminlogin: any;

  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) {
    this.createForm();

   }

  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    var owner_url = "http://65.2.28.16/api/Owner/";

   this.sidemenuloder();
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");
    $('#datepicker-3').Zebra_DatePicker({
   
      direction: 1,
        pair: $('#datepicker-4') ,
       
      //   direction: true,
      //   disabled_dates: [
      //    '05 05 2021',
      //    '09 05 2021',
      //    '15 05 2021',
      //  ]
  
    
  
       
  });

///////////////////////01/Jun/-2021
//cls-OwnerDuration

$(document).on("click",".cls-OwnerDuration",function() {
  
  var getdeleteid = $(this).attr('attrid');

  sessionStorage.setItem("OwnerDuration_current",getdeleteid);

  alert(getdeleteid);  

 });


 Binding_OwnerDuration();
function Binding_OwnerDuration(){

  /*
  var obj = Object();
  obj.id_ ="";
  
  */
  

  $.ajax({
    url: owner_url +'ListAllDuration',
    type: 'get',
    dataType: 'json',
    //data: obj,
    contentType: 'application/json',
    success: function (data) {

      var firstChek = 0;
      var bindingTableData;
      $.each(data.response, function(index, val) { 

       var _id = val._id;
       var Owner_Id = val.Owner_Id;
       var Owner_Name = val.Owner_Name;
       var Duration_SDate = val.Duration_SDate;
       var Duration_EDate =  val.Duration_EDate;
       var Boat_Type = val.Boat_Type;

        if(firstChek == 0){

          bindingTableData = '<tr><td>'+Owner_Name+'</td><td>'+Boat_Type+'</td><td>'+Duration_SDate+'</td><td>'+Duration_EDate+'</td>\
          <td><ul class="table-action"><li><a href="#"><i class="far fa-edit" aria-hidden="true"></i></a></li><li>\
          <button  type="button" id="renew" attrId="'+_id+'" class="btn btn-primary btn-lg cls-OwnerDuration" data-toggle="modal" data-target="#renewModal">Renew</button></li></ul></td></tr>';

          firstChek = firstChek + 1;
        }
        else{

          bindingTableData += '<tr><td>'+Owner_Name+'</td><td>'+Boat_Type+'</td><td>'+Duration_SDate+'</td><td>'+Duration_EDate+'</td>\
          <td><ul class="table-action"><li><a href="#"><i class="far fa-edit" aria-hidden="true"></i></a></li><li>\
          <button  type="button" id="renew" attrId="'+_id+'" class="btn btn-primary btn-lg cls-OwnerDuration" data-toggle="modal" data-target="#renewModal">Renew</button></li></ul></td></tr>';

        }

      });

      var sriptTemp = '<script>$(document).ready(function(){$("#example").DataTable({"ordering": false,responsive:{details:{display: $.fn.dataTable.Responsive.display.modal({header: function ( row ){var data = row.data(); return "Details for "+data[0]+" "+data[1];} }),renderer: $.fn.dataTable.Responsive.renderer.tableAll( {tableClass:"table"})}}} );} );</script>'

      var bindingTabledataFirst = '<table id="example" class="table table-striped table-bordered dt-responsive nowrap" style="width:100%">\
      <thead><tr><th>OWNER NAME</th><th>BOAT NAME</th><th>FROM DATE</th><th>TO DATE</th><th>ACTION</th></tr></thead>\
      <tbody>'+bindingTableData+'</tbody></table>'+sriptTemp+'';

      $("#id-table-databinding").html("");
      $("#id-table-databinding").html(bindingTabledataFirst);
  

    }
   
}); 


}








//////////////////////////////
  
  $('#datepicker-4').Zebra_DatePicker({
     
    direction: 1,
    pair: $('#datepicker-5') 
  
      //direction: 1,
  
  });
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

    function selectDate(date) {
      $('.calendar-wrapper').updateCalendarOptions({
        date: date
      });
    }
    
    var defaultConfig = {
      weekDayLength: 1,
      date: new Date(),
      onClickDate: selectDate,
      showYearDropdown: true,
    };
    
    $('.calendar-wrapper').calendar(defaultConfig);


    $("input[type='number']").inputSpinner()

      // $('#example').DataTable( {
      //     responsive: {
      //         details: {
      //             display: $.fn.dataTable.Responsive.display.modal( {
      //                 header: function ( row ) {
      //                     var data = row.data();
      //                     return 'Details for '+data[0]+' '+data[1];
      //                 }
      //             } ),
      //             renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
      //                 tableClass: 'table'
      //             } )
      //         }
      //     }
      // } );
 
    this.getOwners();
    this.getBoats()
this.getDuration()
  }
  sidemenuloder(){    
    $("#a-menu-Owners-main").attr("aria-expanded","true");        
    $("#a-menu-Owners-main").removeClass("collapsed");  
    $("#id-submenu-child-Owners-Owner-Duration").
    css({"background": "white", "color": "black",
    "padding": "inherit","border-radius": "inherit","margin-right": "-9px"});  
    $("#owner").addClass("show");
  }
  createForm() {
    this.form = this.fb.group({
      Owner_Name: new FormControl('', [Validators.required,]),
      Owner_Id: new FormControl('', [Validators.required,]), 
      Block: new FormControl('', [Validators.required,]),

      Boat_name: new FormControl('', [Validators.required,]),
      Boat_Id: new FormControl('', [Validators.required,]),

      Boat_Type: new FormControl('', [Validators.required, ]),
      From_Date: new FormControl('', [Validators.required, ]),
      To_Date: new FormControl('', [Validators.required, ]),
      IsActive: new FormControl('', [Validators.required, ]),

    });
  }
  get df() { return this.form.controls; }

  saveDuration(){
    this.form.get('IsActive').setValue(true);
    this.form.get('Block').setValue(true);
    console.log(this.form.value)

    this.durationSubmitted = true;


    if (this.form.invalid) {
      return;
  }
    this.http.post<any>(`${this.OwnerUrl}/AddDuration`,  this.form.value  ).subscribe(data => {
      console.log(data)
  if(data.status == true){
    this.ngOnInit()
    this.dropdownOwn =[]; 
    this.dropdownBoat = []
    this.getResponce = data.message
    this.modelTitle = "Ownership Duration"
    $('#Sharepop-up-btn').trigger('click');
    this.getDuration()
    this.durationSubmitted = false;
this.form.reset()
  }

        }, err => {
          console.log(err);
        })
  }
  getOwners(){
   
    this.http.get<any>(`${this.OwnerUrl}/GetOwners`).subscribe(data => {
  this.owners = data['response']
  console.log(data['response']);
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

  getDuration(){
    this.http.get<any>(`${this.OwnerUrl}/ListAllDuration`).subscribe(data => {
      console.log(data)
  this.Duration = data['response'];     
  
   }, err => {
   })
  }
  onItemSelect(item: any) {
    console.log(item)
    var finddate = this.dropdownList.find(x => x._id == item.item_id);
    console.log(finddate)
    this.form.get('Boat_name').setValue(finddate.Boat_Name);
    this.form.get('Boat_Id').setValue(finddate._id);

    this.setBoatType = finddate.Boattype_Name;
    if(finddate._id){
      var obj ={
        boatid:finddate._id
      }
       this.http.post<any>(`${this.url}/GetBoatDetailsByBoatId`,  obj  ).subscribe(data => {
        console.log(data)
    if(data.Status == true){
      this.getBoat = data.Data
      console.log(this.getBoat[0].Owners_Allowed)
      this.form.get('Boat_Type').setValue(this.getBoat[0].Boattype_Name);
    
    }
    else if(data.Status == false){
    }
          }, err => {
            console.log(err);
          })
        }
  }
  onSelectAll(items: any) { 
  }

  onItemOwnerSelect(item: any) {
    var findOwnerList = this.dropdownOwnerList.find(x => x._id == item.item_id);
    console.log(findOwnerList);
    this.form.get('Owner_Name').setValue(findOwnerList.First_Name);
    this.form.get('Owner_Id').setValue(findOwnerList._id);

    
    this.setOwnerBoatType = findOwnerList.First_Name;
   
  }
  fromdateChange($event){
    var fromdates = $event.target.value;
    var fromdate = new Date( fromdates);

    console.log(fromdate)
    var dob = (fromdate.getFullYear()+'-' + (fromdate.getMonth()+1) + '-'+ fromdate.getDate());
    if(fromdates!=""){
    this.form.get('From_Date').setValue(dob);
    }
// console.log(this.getfromDate)
  }
  
  todateChange($event){
    var todates = $event.target.value;
    var todate = new Date( todates);

    console.log(todate)
    var dob = (todate.getFullYear()+'-' + (todate.getMonth()+1) + '-'+ todate.getDate());
    if(todates!=""){
    this.form.get('To_Date').setValue(dob);
    }

console.log(this.getToDate)
  }

  onOwnerSelectAll(items: any) {
    
  }

  fromDates($event)
  {
   var date1 =  new Date($event.target.value)  
    this.fromDate = (date1.getFullYear()+'-' + (date1.getMonth()+1) + '-'+date1.getDate())
  }
  toDates($event)
  {
    var date2 = new Date($event.target.value);
    this.toDate = (date2.getFullYear()+'-' + (date2.getMonth()+1) + '-'+date2.getDate())

  }


}

// Create Component for owner duration //Done By Alagesan on 24.05.2021