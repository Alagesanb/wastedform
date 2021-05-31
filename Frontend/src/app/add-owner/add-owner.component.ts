import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css']
})
export class AddOwnerComponent implements OnInit {

  form: FormGroup;
  url = "http://65.2.28.16/api/Owner"
  boaturl = "http://65.2.28.16/api/Boat"
  submitted = false;
  handBook: File;
  singleFileDetails : any;
  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
    this.createForm();
   }

  ngOnInit(): void {
    this.sidemenuloder();
    sessionStorage.setItem("relodePg_book-for-owner","1");
    sessionStorage.setItem("Adminbooking-relodePg","1");
     sessionStorage.setItem("boat-maintenance-reload","1");
    
     
    var readURL = function(input) {
      if (input.files && input.files[0]) {
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
      Home_Address: new FormControl('', [Validators.required, ]),
      Email: new FormControl('', [Validators.required, Validators.email ]),
      Password: new FormControl('', [Validators.required, ]),
      Profile_Image: new FormControl('', [ ]),
      Mobile: new FormControl('', [Validators.required, ]),
      Family_Name: new FormControl('', [Validators.required, ]),
      
      Sailing_Ability: new FormControl('', [Validators.required,]),
      Housekeeping: new FormControl('', [Validators.required,]),
      Emergency_Contact_Name: new FormControl('', [Validators.required, ]),
      Emergency_Contact_Mobile: new FormControl('', [Validators.required, ]),
      Notes: new FormControl('', [Validators.required, ]),
      
      Parking_Ability: new FormControl('', []),
      Block: new FormControl('', [ ]),
      IsActive: new FormControl('', [ ]),
    });
  }
  get f() { return this.form.controls; }
  addOwner(){

    this.submitted = true;
  

    if (this.form.invalid) {
      console.log("iii")
      return;
  }

    if(this.handBook){
      var singleIMg = this.singleFileDetails;//this.handBook.name

      }
    
    this.form.get('Block').setValue(true);
    this.form.get('IsActive').setValue(true);
    this.form.get('Profile_Image').setValue(this.singleFileDetails);
    this.http.post<any>(`${this.url}/AddOwner`,  this.form.value   ).subscribe(data => {

      if(data.status == true){
        $('#myModal').modal({backdrop: 'static', keyboard: false});
      }

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
          this.form.reset()
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
        }
        }, err => {
          console.log(err);
        })
  }
  singleImage(event, imageFor){
      this.handBook = <File>event.target.files[0];
    this.singleUploadImage(imageFor);
  
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
}