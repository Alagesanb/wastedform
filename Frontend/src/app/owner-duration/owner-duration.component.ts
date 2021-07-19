import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
// import environment for owner duration Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-owner-duration',
  templateUrl: './owner-duration.component.html',
  styleUrls: ['./owner-duration.component.css']
})
// Create Component for owner duration //Done By Alagesan on 24.05.2021

export class OwnerDurationComponent implements OnInit {
  // Add Base URL for owner duration  Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;
  url = this.EnvironmentURL+"api/Boat"
  OwnerUrl = this.EnvironmentURL+"api/Owner"
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
      
      var getId = "";
      var getboatid = "";
      
      var owner_url = this.EnvironmentURL+"api/Owner/";
      var suspendUrl = this.EnvironmentURL+"api/SuspensionRoute/suspensionRecord/";

      var Binding_OwnerDuration_datas;
    
    this.sidemenuloder();

    sessionStorage.setItem("relodePg_book-for-owner","1");
    sessionStorage.setItem("Adminbooking-relodePg","1");
    sessionStorage.setItem("boat-maintenance-reload","1");
    sessionStorage.setItem("view-boat-reload","1");


 this.startTimer_set_manageOwner_Edit();

    $('#datepicker-3').Zebra_DatePicker({
   
      direction: 1,
        pair: $('#datepicker-4') ,       
             
   });

///////////////////////01/Jun/-2021
//cls-OwnerDuration

$(document).on("click",".cls-OwnerDuration",function() {
  
  var getdeleteid = $(this).attr('attrid');

  sessionStorage.setItem("OwnerDuration_current",getdeleteid);

  //alert(getdeleteid);  

 });

 //Suspend the owner and disable suspend button for owner duration //Done By Alagesan on 02.07.2021
 
 $(document).on("click",".cls-OwnerDuration",function() {
   getId = $(this).attr('attrid');
   getboatid = $(this).attr('attrboatId');
  $('#suspend-popup-btn').trigger('click');
 })
 //Suspend the owner  confirm or cancel for owner duration Done By Alagesan  on 03.07.2021
 $(document).on("click","#suspendConfirm",function() {
  $.post(suspendUrl,
  {
    _id:getId,Is_Cancellation:"true"
  },
  function(data, status){
    console.log(data);
    if(data.status == true){
      $('#SuspendMessage').html(data.message); 
      $('#suspend-popup-btn').trigger('click');
      $('#suspend-message-btn').trigger('click');
      $("#Idsuspendok").hide();
      $("#activate-btn").show();
    }
  });
    
 })

  //Activate the owner and disable suspend button for owner duration //Done By Alagesan on 09.07.2021

 $(document).on("click",".cls-OwnerDuration-activate",function() {
  
  getId = $(this).attr('attrid');
  getboatid = $(this).attr('attrboatId');
  $('#activate-popup-btn').trigger('click');
  

  
  
 })
 //Activate the owner  confirm or cancel for owner duration Done By Alagesan  on 09.07.2021

 $(document).on("click","#activateConfirm",function() {
  $.post(suspendUrl,
    {
      _id:getId,Is_Cancellation:"false"
    },
    function(data, status){
      console.log(data);
      if(data.status == true){
        $('#ActivateMessage').html(data.message); 
        $('#activate-popup-btn').trigger('click');
        $('#activate-message-btn').trigger('click');
        $("#Idsuspendok").show();
        $("#activate-btn").hide();
      }
    });

 })

  // Edit owner duration mouseover  for owner duration //Done By Alagesan on 19.07.2021
  $(document).on("mouseover",".cls-Edit-owner-duration",function() {
      
    var Editid = $(this).attr('id');
  
    $("#"+Editid).css("color", "red");
    $("#"+Editid).css('cursor','pointer');
    
  
  });
  
  // Edit owner duration mouseout  for owner duration //Done By Alagesan on 19.07.2021
  $(document).on("mouseout",".cls-Edit-owner-duration",function() {
  
    var getEditid = $(this).attr('id');
  
    $("#"+getEditid).css("color", "black");
    
  
  });


 Binding_OwnerDuration();
function Binding_OwnerDuration(){

  $.ajax({
    url: owner_url +'ListAllDuration',
    type: 'get',
    dataType: 'json',
    //data: obj,
    contentType: 'application/json',
    success: function (data) {

      Binding_OwnerDuration_datas = data.response;

      var firstChek = 0;
      var bindingTableData;
     
      $.each(data.response, function(index, val) {         
        console.log(val)
       var _id = val._id;
       var Owner_Id = val.Owner_Id;
       var Boat_Id = val.Boat_Id;
       var Owner_Name = val.Owner_Name;
       var Duration_SDate = val.Duration_SDate;
       var Duration_EDate =  val.Duration_EDate;
       var Boat_Type = val.Boat_Type;
       var Boat_name = val.Boat_Name;

        if(firstChek == 0){
          // Add suspend button  for owner duration //Done By Alagesan on 01.07.2021
          bindingTableData = '<tr><td>'+Owner_Name+'</td><td>'+Boat_name+'</td><td>'+Duration_SDate+'</td><td>'+Duration_EDate+'</td>\
          <td><ul class="table-action"><li><a id="'+_id+'" attrId="'+_id+'" class="cls-Edit-owner-duration"><i class="far fa-edit" aria-hidden="true"></i></a></li><li>\
          <button  type="button" id="Idsuspendok"  attrId="'+_id+'" attrboatId="'+Boat_Id+'" class="btn btn-primary btn-lg cls-OwnerDuration" >Suspend</button></li><li><button  type="button" style="display:none;" id="activate-btn" attrId="'+_id+'" attrboatId="'+Boat_Id+'" class="btn btn-success btn-lg cls-OwnerDuration-activate" >Activate</button></li></ul></td></tr>';
          // Add activate button  for owner duration //Done By Alagesan on 09.07.2021

          firstChek = firstChek + 1;
        }
        else{
         // Add suspend button  for owner duration //Done By Alagesan on 01.07.2021
          bindingTableData += '<tr><td>'+Owner_Name+'</td><td>'+Boat_name+'</td><td>'+Duration_SDate+'</td><td>'+Duration_EDate+'</td>\
          <td><ul class="table-action"><li><a id="'+_id+'" attrId="'+_id+'" class="cls-Edit-owner-duration"><i class="far fa-edit" aria-hidden="true"></i></a></li><li>\
          <button  type="button" id="Idsuspendok"   attrId="'+_id+'" attrboatId="'+Boat_Id+'" class="btn btn-primary btn-lg cls-OwnerDuration" >Suspend</button></li><li><button  type="button" style="display:none;" id="activate-btn" attrId="'+_id+'" attrboatId="'+Boat_Id+'"  class="btn btn-success btn-lg cls-OwnerDuration-activate" >Activate</button></li></ul></td></tr>';
          // Add activate button  for owner duration //Done By Alagesan on 09.07.2021

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

$(document).on("click",".cls-Edit-owner-duration",function() {

  var getEditedid = $(this).attr('attrid');
  var tempArry = Binding_OwnerDuration_datas.find( x => x._id == getEditedid);
  sessionStorage.setItem("set_Edit_owner_duration",JSON.stringify(tempArry));
  
});

//cls-Edit-owner-duration






//////////////////////////////
  
  $('#datepicker-4').Zebra_DatePicker({
     
    direction: 1,
    pair: $('#datepicker-5') 
  
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

    $("input[type='number']").inputSpinner();     
 
    this.getOwners();    
    this.getDuration();
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
      Block: new FormControl('', []),      
      Boat_Id: new FormControl('', [Validators.required,]),
      Boat_Type: new FormControl('', [Validators.required, ]),
      From_Date: new FormControl('', [Validators.required, ]),
      To_Date: new FormControl('', [Validators.required, ]),
      IsActive: new FormControl('', []),
      _id: new FormControl('', []),
      Boat_Name: new FormControl('', []),

    });
  }
  get df() { return this.form.controls; }

  saveDuration(){    
    this.form.get('IsActive').setValue(true);
    this.form.get('Block').setValue(true); 
    this.durationSubmitted = true;
    if (this.form.invalid) {
      return;
  }
    this.http.post<any>(`${this.OwnerUrl}/AddDuration`,  this.form.value  ).subscribe(data => {
      
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
         
        })
  }
  getOwners(){
   
    this.http.get<any>(`${this.OwnerUrl}/GetOwners`).subscribe(data => {
  this.owners = data['response']
 
  this.dropdownOwnerList = data.response;                    
             var ownerArray = [];
             data.response.forEach(element => {
                   var obj2 = Object();
                   obj2.item_id = element._id,
                                        // Concatination firstname and lastname for owner duration//Done By Alagesan on 29.06.2021
                   obj2.item_text = (element.First_Name).concat(" ", element.Last_Name);
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
     
  this.Duration = data['response'];     
  
   }, err => {
   })
  }
  onItemSelect(item: any) {  
    var finddate = this.dropdownList_filted.find(x => x.item_id == item.item_id);   
    this.form.get('Boat_Name').setValue(finddate.item_text);
    this.form.get('Boat_Id').setValue(finddate.item_id);
    this.setBoatType = finddate.Boattype_Name;
    if(finddate.item_id){
      var obj ={
        boatid:finddate.item_id
      }
       this.http.post<any>(`${this.url}/GetBoatDetailsByBoatId`,  obj  ).subscribe(data => {       
       
    if(data.Status == true){
      this.getBoat = data.Data;     
      this.form.get('Boat_Type').setValue(this.getBoat.response.Boattype_Name);    
    }
    else if(data.Status == false){
    }
          }, err => {
          
          })
        }
  }
  onSelectAll(items: any) { 
  }
  onItemOwnerSelect(item: any) {

    this.dropdownBoat ="";

    var findOwnerList = this.dropdownOwnerList.find(x => x._id == item.item_id);   
    this.form.get('Owner_Name').setValue(findOwnerList.First_Name);
    this.form.get('Owner_Id').setValue(findOwnerList._id);    
    this.setOwnerBoatType = findOwnerList.First_Name;
   this.Fun_getallDropDownDatas(item.item_id)
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
         
        })
  }


  fromdateChange($event){
    var fromdates = $event.target.value;
    var fromdate = new Date( fromdates);   
    // Change from date format dd/mm/yyyy for owner duration//Done By Alagesan on 30.06.2021
    var dob = (fromdate.getDate() +'-' + (fromdate.getMonth()+1) + '-'+ fromdate.getFullYear());
    if(fromdates!=""){
    this.form.get('From_Date').setValue(dob);
    }

  }
  
  todateChange($event){
    var todates = $event.target.value;
    var todate = new Date( todates);   
    // Change to date format dd/mm/yyyy for owner duration//Done By Alagesan on 30.06.2021
    var dob = (todate.getDate() +'-' + (todate.getMonth()+1) + '-'+ todate.getFullYear());
    if(todates!=""){
    this.form.get('To_Date').setValue(dob);
    }


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


  //////sibi.........start...........


  startTimer_set_manageOwner_Edit() {
    setInterval(() => {    
     var temp_data = sessionStorage.getItem("set_Edit_owner_duration");
     if(typeof temp_data !== "undefined" && temp_data != null)
     {
       sessionStorage.removeItem("set_Edit_owner_duration");
       var obj = JSON.parse(temp_data);
        this.Edit_owner_duration(obj);
        this.Fun_getallDropDownDatas_edit_Get(obj);
     }     
     
   },500)
 }

 Edit_owner_duration(obj){
  
   this.dropdownOwn = [];
   this.dropdownOwn.push({item_id : obj.Owner_Id, item_text: obj.Owner_Name});

   this.dropdownBoat = [];
  
   var data_tmp_Boat = this.dropdownList_filted.find(x => x.item_id == obj.Boat_Id);
   this.dropdownBoat.push({item_id : data_tmp_Boat.item_id, item_text: data_tmp_Boat.item_text});

   //Jun-24-2021.. 
   this.form.get('_id').setValue(obj._id);
  this.form.get('Owner_Name').setValue(obj.Owner_Name);
  this.form.get('Owner_Id').setValue(obj.Owner_Id);  
  
  this.form.get('Boat_Name').setValue(data_tmp_Boat.item_text);
    this.form.get('Boat_Id').setValue(data_tmp_Boat.item_id); 
 
  this.form.get('Boat_Type').setValue(obj.Boat_Type);
  this.form.get('From_Date').setValue(this.Conver_Usr_Date(obj.From_Date));
  this.form.get('To_Date').setValue(this.Conver_Usr_Date(obj.To_Date));
 
  $(".cls-btn-save").hide();
  $(".cls-btn-Edit").show();

 }

 Fun_getallDropDownDatas_edit_Get(objdatas){
    
  this.dropdownList = [];       
    var obj = Object();
      obj.owner_id = objdatas.Owner_Id;
    this.http.post<any>(`${this.OwnerUrl}/GetBoatNameByOwnerId`, obj).subscribe(data => {      
                          
      var tempArry = [];
    
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

      this.Edit_owner_duration(objdatas);

      
    
      }, err => {
       
      })
}

Conver_Usr_Date(dateVal) {
  var newDate = new Date(dateVal);

  var sMonth = this.padValue(newDate.getMonth() + 1);
  var sDay = this.padValue(newDate.getDate());
  var sYear = newDate.getFullYear();  
  
  return sYear + "-" + sMonth + "-" + sDay;
}

padValue(value) {
return (value < 10) ? "0" + value : value;
}

EditDuration(){

  this.form.get('IsActive').setValue(true);
  this.form.get('Block').setValue(true);
  this.durationSubmitted = true;
  if (this.form.invalid) {
    return;
}
  this.http.post<any>(`${this.OwnerUrl}/EditDuration`,  this.form.value  ).subscribe(data => {
  
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
       
      })
}

PageReload(){
  location.reload();
}



}

// Create Component for owner duration //Done By Alagesan on 24.05.2021