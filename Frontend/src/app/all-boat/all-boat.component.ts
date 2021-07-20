import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import {GetServiceService} from 'src/app/get-service.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { HttpParams } from "@angular/common/http";

// import environment for all boat Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-all-boat',
  templateUrl: './all-boat.component.html',
  styleUrls: ['./all-boat.component.css']
})
export class AllBoatComponent implements OnInit {
  allBoats: any;
  loctions: any=[];
  form: FormGroup;
  setLDates= ""
  fromDate: any=[];
  toDate: any=[];
  LanchTYpe: any = "Launch Date";
  submitted = false;

  Public_allBoats: any=[];

  // Add Base URL for all boat Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;

  imgUrl = this.EnvironmentURL+"api/uploads/"
  boatId: any;
  getResponce: any;
  adminlogin: any;
  pageOfItems: Array<any>;

  constructor(private httpClient: HttpClient,private http: HttpClient ,private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private ps: GetServiceService ,public sanitizer: DomSanitizer) {
      this.createForm();
     }
  url = this.EnvironmentURL+"api/Boat"
  OwnerUrl = this.EnvironmentURL+"api/Owner"
  searchText: any = '';
  searchLoction: any = '';

  //sibi add..........

   Location_Name_dropDown: any = "Location";
   Launch_Date_DropDown: any = "Launch Date";
  //sibi end........


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
    $("div").removeClass("modal-backdrop fade show");
   // $("").class() 

    setInterval(function() {

     
     
      if($("#datepiker-all-boat-from-date").val() == "NaN-NaN-NaN"){
        $("#datepiker-all-boat-from-date").val("");      }
  
      if($("#datepiker-all-boat-to-date").val() == "NaN-NaN-NaN"){
        $("#datepiker-all-boat-to-date").val("");
      }
  
  }, 500);



    this.route.params.subscribe(params => {
   
  });


  



 
  $('#datepiker-all-boat-from-date').Zebra_DatePicker({
    //format: 'd-m-Y',
    //direction: true,
    pair: $('#datepiker-all-boat-to-date')

  });

$('#datepiker-all-boat-to-date').Zebra_DatePicker({
    //format: 'd-m-Y',
    direction: 1,


  });




    this.getAllBoat()
    this.getLoction()
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
  sidemenuloder(){
    $("#a-menu-boat-main").attr("aria-expanded","true");        
    $("#a-menu-boat-main").removeClass("collapsed");
    $("#id-submenu-child-boat-All-Boats").
    css({"background": "white", "color": "black",
    "padding": "inherit","border-radius": "inherit","margin-right": "-9px"});
    $("#boat").addClass("show");

  }


  setLanDates(obj){

    this.LanchTYpe = obj.target.innerHTML

    this.Launch_Date_DropDown = obj.target.innerHTML;
  

  }
  fromDates($event)
  {
    var date1 =  new Date($event.target.value)  
      // Change from date format in dd/mm/yyyy for all boat page //Done By Alagesan on  30.06.2021	
    this.fromDate = (date1.getDate()+'-' + (date1.getMonth()+1) + '-'+date1.getFullYear())
    this.form.get('Launch_Date1').setValue(this.fromDate);



  }
  toDates($event)
  {
    var date2 = new Date($event.target.value);
    // Change to date format in dd/mm/yyyy for all boat page //Done By Alagesan on  30.06.2021	
    this.toDate = (date2.getDate()+'-' + (date2.getMonth()+1) + '-'+date2.getFullYear())
    this.form.get('Launch_Date2').setValue(this.toDate);


    // this.toDate = $event.target.value;
  }

  createForm() {
    this.form = this.fb.group({
      Launch_Date1: new FormControl('', [Validators.required,]),
      Launch_Date2: new FormControl('', [Validators.required, ]),
      DateType: new FormControl('', []),
    
    });
  }
  get f() { return this.form.controls; }

  getAllBoat(){
    debugger;
    this.http.get<any>(`${this.url}/GetallBoatDetails`).subscribe(data => {

debugger;

      //////////////////
      this.http.get<any>(`${this.url}/GetTotal_PendingAllocatedDays`).subscribe(data2 => {
debugger;


      var commen = data2['Response']
      var BookedDays = commen.BookedDays;
      var AllocatedDays = commen.AllocatedDays;      
      var responce =  data['response'];

      BookedDays.forEach(element1 => {
        responce.forEach(element2 => {

          ///this to start..............
          if(element2._id == element1.Boat_Id)
          {
            element2.BookedDaystotal = element1.total;
          }
  
          
          
        });
        
      });

      AllocatedDays.forEach(element1 => {
        responce.forEach(element2 => {

          ///this to start..............
          if(element2._id == element1.Boat_Id)
          {
            element2.AllocatedDaystotal = element1.total;
          }
  
          
          
        });
        
      });
      
      debugger;
      console.log(responce);


        this.allBoats = responce;//data['response'];
        this.Public_allBoats = responce;//data['response'];
        console.log(this.allBoats);
         console.log(this.allBoats)
         }, err => {
         })



     ///////////////////////

      
  // this.allBoats = data['response'];
  // this.Public_allBoats = data['response'];
  // console.log(this.allBoats);
  //  console.log(this.allBoats)
   }, err => {
   })
  }
  getLoctionTypeId(id){


   // debugger;

   this.Location_Name_dropDown = id.Boat_Location;

  //    this.ps.getboatByLoction(id._id).subscribe(res => {

  //      debugger;
  //     var dddd = res;
  //      this.allBoats = res['response'] //response

  //    console.log(this.allBoats);

  //  });


  var boadtId = {
    Location_Id : id._id
  }
  this.http.post<any>(`${this.url}/PostBoatDetailsByLocation`,  boadtId   ).subscribe(data => {
    
    this.allBoats = data['response']


      }, err => {
        console.log(err);
      })


  // var url_temp = this.url + "/GetBoatDetailsByLocation"; 

  // const opts = { params: new HttpParams({fromString: "Location_Id=60585065e639936fdfb2f391"}) };
 
  // var kkkk = this.httpClient.get(url_temp, opts);

  // var ddd = "adads";

  // const headers = new HttpHeaders().append('header', 'value');
  // const params = new HttpParams().append('param', 'value');
  // this.http.get('url', {headers, params}); 

   
    


   }
    
  // Delete boat modal popup for all boat page //Done By Alagesan on 18.06.2021	

  deleteBoat(){
    var boadtId = {
      _id : this.boatId
    }
    this.http.post<any>(`${this.url}/DeleteBoat`,  boadtId   ).subscribe(data => {
      console.log(data);
        if(data.status==false){
          $('#removeBoat').trigger('click');
          $('#removeBookedBoat').trigger('click');  
        }
        if(data.status==true){
          this.getResponce = data.message
          $('#removeBoat').trigger('click');
          $('#pop-up-btn').trigger('click');
          this.getAllBoat()
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

  viewBoat(boat){
    sessionStorage.setItem('boatData', JSON.stringify(boat));   // if it's object

    this.router.navigate(['view-boat/']);
  }
  editBoat(boat){
    sessionStorage.setItem('boatData', JSON.stringify(boat));   // if it's object

    this.router.navigate(['edit-boat/']);
  }

  string_to_Date_Convert(dateString){     
        
    var dateArray = dateString.split("-");
    var dateObj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
  
    //return this.getFormattedDate_second(dateObj)//dateObj;
    return dateObj;

  }

   getFormattedDate_second(dateVal) {    
     
    var newDate = new Date(dateVal);

    var sMonth = this.padValue(newDate.getMonth() + 1);
    var sDay = this.padValue(newDate.getDate());
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = this.padValue(newDate.getMinutes());
    var sAMPM = "AM";

    var iHourCheck = Number(sHour);

    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = 12;
    }

    sHour = this.padValue(sHour);

    //return sDay + "-" + sMonth + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
    return sDay + "-" + sMonth + "-" + sYear;

}

  padValue(value) {
    return (value < 10) ? "0" + value : value;
  
  }


  getSearchData(){

    var tempArry = [];

    var StartDate = this.string_to_Date_Convert(this.fromDate);
    var EndDate = this.string_to_Date_Convert(this.toDate);
    
    if(this.LanchTYpe == "Launch Date"){      
      this.Public_allBoats.forEach(boat1 => {         
        var date_Start_Server = this.string_to_Date_Convert(this.getFormattedDate_second(boat1.Launch_Date));
        
        if(date_Start_Server >= StartDate && date_Start_Server <= EndDate)
        {
          tempArry.push(boat1)
        }
        else{    
          console.log(date_Start_Server);
    
        }             
        
      });

    }
    else if(this.LanchTYpe == "Pre-Launch Date"){
      this.Public_allBoats.forEach(boat1 => {  
      
        var date_Start_Server = this.string_to_Date_Convert(this.getFormattedDate_second(boat1.PreLaunch_Date));
        
        if(date_Start_Server >= StartDate && date_Start_Server <= EndDate)
        {
          tempArry.push(boat1)
        }
        else{    
          console.log(date_Start_Server);    
        }        
                
      });

    }
    this.allBoats = tempArry;

  }

  // Delete boat modal popup for all boat page //Done By Alagesan on 18.06.2021	

  deleteBoatModel(id){
    this.boatId = id
    $('#removeBoat').trigger('click');

  }

  // Location dropdown clear for all boat page //Done By Alagesan on 25.06.2021	
  pageRefresh(){
    location.reload();
  }
}
