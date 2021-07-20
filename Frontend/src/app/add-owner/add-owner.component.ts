import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
// import environment for add owner  Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';

declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css']
})
export class AddOwnerComponent implements OnInit {
  EnvironmentURL:string = environment.url;
  form: FormGroup;
  url = this.EnvironmentURL+"api/Owner"
  boaturl = this.EnvironmentURL+"api/Boat"
  submitted = false;
  handBook: File;
  singleFileDetails : any;
  adminlogin: any;
  profilePicResponse= "";
  addownerMessage:any;
  show: boolean = false;
  // Parking Ability, sailing ability, housekeeping  for add owner  Done By Alagesan	on 20.07.2021
  parkingAbilityMessage: boolean =false;
  sailingabilityMessage: boolean =false;
  housekeepingMessage: boolean =false;

  // Parking Ability for add owner  Done By Alagesan	on 20.07.2021
  Parking_Ability_List = [
    {name: 'Parking_Ability', value: 'Expert', checked: false},
    {name: 'Parking_Ability', value: 'Intermediate', checked: false},
    {name: 'Parking_Ability', value: 'Beginner', checked: false},
    {name: 'Parking_Ability', value: 'Need Assistance', checked: false}
  ]
  // Sailing ability  for add owner  Done By Alagesan	on 20.07.2021
  Sailing_Ability_List = [
    {name: 'Sailing_Ability', value: 'Expert', checked: false},
    {name: 'Sailing_Ability', value: 'Intermediate', checked: false},
    {name: 'Sailing_Ability', value: 'Beginner', checked: false},
    {name: 'Sailing_Ability', value: 'Need Assistance', checked: false}
  ]
  // Housekeeping  for add owner  Done By Alagesan	on 20.07.2021
  Housekeeping_List = [
    {name: 'Housekeeping', value: 'High', checked: false},
    {name: 'Housekeeping', value: 'Medium', checked: false},
    {name: 'Housekeeping', value: 'Low', checked: false},
  ]

  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
    this.createForm();
   }

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
     
    var readURL = function(input) {
      //Upload profile image max size exceeded message for add owner Done By Alagesan  on 16.06.2021
      var maxSize = 2097152;
      var current_size = input.files[0].size; 
      if (input.files && input.files[0] && current_size < maxSize) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('.profile-pic').attr('src', e.target.result);
          }
  
          reader.readAsDataURL(input.files[0]);
      }
  }
  


  $(".file-upload").on('change', function(){
      readURL(this);
  });
  
  $(".upload-button").on('click', function() {
     $(".file-upload").click();
  });
  }

  // Parking Ability for add owner  Done By Alagesan	on 20.07.2021
  onParkingItemChange(parkingvalue){
    this.parkingAbilityMessage = parkingvalue;
  }
  // Sailing ability  for add owner  Done By Alagesan	on 20.07.2021
  onSailingItemChange(sailingvalue){
    this.sailingabilityMessage = sailingvalue;
  }
  // Housekeeping  for add owner  Done By Alagesan	on 20.07.2021
  onHousekeepingItemChange(housekeepingvalue){
    this.housekeepingMessage = housekeepingvalue;
  }

  sidemenuloder(){    
    $("#a-menu-Owners-main").attr("aria-expanded","true");        
    $("#a-menu-Owners-main").removeClass("collapsed"); 
    $("#id-submenu-child-Owners-Add-Owner").
    css({"background": "white", "color": "black",
    "padding": "inherit","border-radius": "inherit","margin-right": "-9px"});  
    $("#owner").addClass("show");
  }
  createForm() {
    this.form = this.fb.group({
      First_Name: new FormControl('', [Validators.required,]),
      Last_Name: new FormControl('', [Validators.required, ]),
      Home_Address: new FormControl('', []),
      Email: new FormControl('', [Validators.required, Validators.email ]),
      Password: new FormControl('', [Validators.required, ]),
      Profile_Image: new FormControl('', [ ]),
      Mobile: new FormControl('', [Validators.required, ]),
      Family_Name: new FormControl('', [Validators.required, ]),
      
      Sailing_Ability: new FormControl('', [Validators.required,]),
      Housekeeping: new FormControl('', [Validators.required,]),
      Emergency_Contact_Name: new FormControl('', [Validators.required, ]),
      Emergency_Contact_Mobile: new FormControl('', [Validators.required, ]),
      Notes: new FormControl('', []),
      
      Parking_Ability: new FormControl('', [Validators.required,]),
      Block: new FormControl('', [ ]),
      IsActive: new FormControl('', [ ]),
    });
  }
  get f() { return this.form.controls; }
  addOwner(){
   
    this.submitted = true;
  

    if (this.form.invalid) {
      console.log(this.form.value);
      console.log("iii")
      return;
  }

    if(this.handBook){
      var singleIMg = this.singleFileDetails;//this.handBook.name

      }
    
    this.form.get('Block').setValue(true);
    this.form.get('IsActive').setValue(true);
    this.form.get('Profile_Image').setValue(this.singleFileDetails);
    console.log(this.form.value );
    this.http.post<any>(`${this.url}/AddOwner`,  this.form.value   ).subscribe(data => {

      debugger;
      
      // Modal popup for add Owner//Done By Alagesan
      if(data.status == true){
        $('#myModal').modal({backdrop: 'static', keyboard: false});
      }

      // profile pic for add Owner//Done By Alagesan
      if(data.status==true){
        $('.profile-pic').attr('src', '/assets/images/dummy-owner-img.jpg');
      }
      if(data.status==false){
        this.submitted = false;
        alert(data.message)
        }
        else if(data.status==true){
          this.submitted = false;
          $('#error-disp-btns').trigger('click');
          this.addownerMessage = data.message;
          /*
          this.form.reset()
          // clear Validators for add Owner//Done By Alagesan
          this.form.get('First_Name').clearValidators();
          this.form.get('First_Name').updateValueAndValidity(); 
          this.form.get('Last_Name').clearValidators();
          this.form.get('Last_Name').updateValueAndValidity(); 
          this.form.get('Home_Address').clearValidators();
          this.form.get('Home_Address').updateValueAndValidity(); 
          this.form.get('Email').clearValidators();
          this.form.get('Email').updateValueAndValidity(); 
          this.form.get('Password').clearValidators();
          this.form.get('Password').updateValueAndValidity(); 
          this.form.get('Mobile').clearValidators();
          this.form.get('Mobile').updateValueAndValidity(); 
          this.form.get('Family_Name').clearValidators();
          this.form.get('Family_Name').updateValueAndValidity(); 
          */
        }
        }, err => {
          console.log(err);
        })
  }
  singleImage(event, imageFor){
    //Upload profile image max size exceeded message for add owner Done By Alagesan  on 16.06.2021
    var maxSize = 2097152;
    var current_size = event.target.files[0].size;
    if (current_size > maxSize) {
    this.profilePicResponse = "Profile image maximum size is exceeded"
      $('#profileImageModel').trigger('click');
    }
    if (current_size < maxSize) {
      this.handBook = <File>event.target.files[0];
    this.singleUploadImage(imageFor);
     }
  
  }

  singleUploadImage(imageFor){
if(this.handBook){
    const fd = new FormData();  
    fd.append("file",this.handBook);
    this.http.post<any>(`${this.url}/FileUploadSingle`, fd).subscribe(data => {
      
     
         var result = data.data;      
         if(data.status==false){
         alert(data.message)
         }
         else if(data.status==true){
        
          this.singleFileDetails = result.filename;
          
         
          
         } 
        }, err => {
          console.log(err);
        })
      }
  }
  goToViewPage(){
    this.router.navigate(['/all-owner/']);

  }

  password() {
    this.show = !this.show;
   }



}
