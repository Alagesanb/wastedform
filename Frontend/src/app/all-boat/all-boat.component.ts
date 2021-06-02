import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import {GetServiceService} from 'src/app/get-service.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { HttpParams } from "@angular/common/http";
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
  LanchTYpe: any;
  submitted = false;
  imgUrl = "http://65.2.28.16/api/uploads/"
  boatId: any;
  getResponce: any;
  adminlogin: any;
  constructor(private httpClient: HttpClient,private http: HttpClient ,private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,private ps: GetServiceService ,public sanitizer: DomSanitizer) {
      this.createForm();
     }
  url = "http://65.2.28.16/api/Boat"
  OwnerUrl = "http://65.2.28.16/api/Owner"
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
    this.fromDate = (date1.getFullYear()+'-' + (date1.getMonth()+1) + '-'+date1.getDate())
    this.form.get('Launch_Date1').setValue(this.fromDate);



  }
  toDates($event)
  {
    var date2 = new Date($event.target.value);
    this.toDate = (date2.getFullYear()+'-' + (date2.getMonth()+1) + '-'+date2.getDate())
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
    this.http.get<any>(`${this.url}/GetallBoatDetails`).subscribe(data => {
      
  this.allBoats = data['response']
  console.log(this.allBoats);
   console.log(this.allBoats)
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
    
  
  deleteBoat(){
    var boadtId = {
      _id : this.boatId
    }
    this.http.post<any>(`${this.url}/DeleteBoat`,  boadtId   ).subscribe(data => {
        if(data.status==false){
        alert(data.message)
        }
        else if(data.status==true){
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
  getSearchData(){
    this.submitted = true;
    this.form.get('Launch_Date1').setValue(this.fromDate);
    this.form.get('Launch_Date2').setValue(this.toDate);
   
    if (this.form.invalid) {
      return;
  }
   
   
    this.form.get('DateType').setValue(this.LanchTYpe);
    this.http.post<any>(`${this.url}/LaunchFilter`,  this.form.value   ).subscribe(data => {
      this.allBoats = data['response']

        }, err => {
          console.log(err);
        })

  }
  deleteBoatModel(id){
    this.boatId = id
    $('#removeBoat').trigger('click');

  }
}
