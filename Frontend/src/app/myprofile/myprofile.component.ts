import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
// import environment for myprofile Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
// Create Component for myprofile //Done By Alagesan on 17.05.2021
export class MyprofileComponent implements OnInit {
  data: any=[];
  // Add Base URL for myprofile  Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;
  url = this.EnvironmentURL+"api/Owner"
  imgUrl = this.EnvironmentURL+"api/uploads/"

  listBoat: any=[];
  ownerlogin: any;
  listBoats: any=[];
  ownerdurationsdetails: any=[];

  fromDate: string;
	toDate: string;
  today_date:string;
  endingFormatDate:string;
  endedFormatDate: string;
  disableBoat: string;
  expireBoat: string;
  //Change password for myprofile page //Done By Alagesan on 28.07.2021
  saveChangePasswordform: FormGroup;
  changePasswordSubmitted = false;
  modelTitle: string;
  getResponce: any;
  enterValidPassword: string;
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  
  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
    this.createChangePasswordForm();
  }
  // Create Component for myprofile //Done By Alagesan on 17.05.2021
  ngOnInit(): void {

    sessionStorage.setItem("owner-dashboard-relodePg","1");

    this.ownerlogin = JSON.parse(sessionStorage.getItem("userlogin"));
    console.log(this.ownerlogin);
    if(this.ownerlogin==false){
      this.router.navigate(['/owner-login/']);
    }
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");
    this.data = JSON.parse(sessionStorage.getItem('Ownerlogin')); 
    console.log(this.data);
    this.getBoteByOwner()
    this.getOwnerDurationdetails();
  }

    //Change password for myprofile page //Done By Alagesan on 28.07.2021
  createChangePasswordForm() {
    this.saveChangePasswordform = this.fb.group({
      OldPassword: new FormControl('', [Validators.required,]),
      NewPassword: new FormControl('', [Validators.required,]),
      ConfirmPassword: new FormControl('', [Validators.required,]),
      Owner_Id: new FormControl(''),
    }, { 
      validators: this.passwordValidation.bind(this)
    })
  }
  get cpf() { return this.saveChangePasswordform.controls; }
  //Change password for myprofile page //Done By Alagesan on 28.07.2021
  passwordValidation(formGroup: FormGroup) {
    const { value: password } = formGroup.get('NewPassword');
    const { value: confirmPassword } = formGroup.get('ConfirmPassword');
    this.enterValidPassword = "New and confirm password not same"
    if(password === confirmPassword){
      return this.enterValidPassword = "";
    }
    if(password !== confirmPassword){
      return this.enterValidPassword ;
    }
  }
  showOldPasswordText() {
    this.showOldPassword = !this.showOldPassword;
   }

   showNewPasswordText() {
    this.showNewPassword = !this.showNewPassword;
   }
  //Change password for myprofile page //Done By Alagesan on 28.07.2021
   showConfirmPasswordText() {
    this.showConfirmPassword = !this.showConfirmPassword;
   }
  //Change password for myprofile page //Done By Alagesan on 28.07.2021
  saveChangePassword() {
    this.changePasswordSubmitted = true;
  
    if(this.saveChangePasswordform.invalid) {
      return;
    }
      console.log(this.saveChangePasswordform.value);
    this.saveChangePasswordform.get('Owner_Id').setValue(this.data._id);

    this.http.post<any>(`${this.url}/ChangeNewPassword`, this.saveChangePasswordform.value).subscribe(data => {
     console.log(data);
      if(data.Status == true) {
        this.modelTitle = "Change Password"
        this.getResponce = data.message
        $('#change-password-btn').trigger('click');
        this.saveChangePasswordform.reset()
        this.changePasswordSubmitted = false;
      }
      else if(data.status == false){
        this.modelTitle = "Change Password"
        this.getResponce = data.message
        $('#change-password-btn').trigger('click');
        this.saveChangePasswordform.reset()
        this.changePasswordSubmitted = false;
      }
    }, err => {


      console.log(err);
    })
  }
  //Change password for myprofile page //Done By Alagesan on 28.07.2021
  pagereload(){
    location.reload();
  }

  getBoteByOwner(){
    var obj={
      owner_id:this.data._id
    }
    this.http.post<any>(`${this.url}/GetBoatDetailsByOwner`,obj  ).subscribe(data => {  
      this.listBoats = data['response']
      console.log(this.listBoat) 

      var response = this.listBoats.map(function(el){
        el.BoatDetails = el.BoatDetails.filter(function(x){ return x.IsActive ==true; });
        return el;
    });
    console.log(response)


    response.forEach(element => {         
      if(element.BoatDetails.length==0){

      }else{
        console.log(element.BoatDetails)
         this.listBoat.push(element);

      }

    });



        }, err => {
        console.log(err);
        })
    }

    // Show owner duration details for myprofile Done By Alagesan	on 01.07.2021 
    getOwnerDurationdetails(){
      var obj ={
        Owner_Id:this.data._id
      }
      this.http.post<any>(`${this.url}/GetOwnerDurationdetailsbyOwnerId`,obj).subscribe(data => {
        this.ownerdurationsdetails = data['response'];
        console.log(this.ownerdurationsdetails);

           // Get date format for myprofile Done By Alagesan	on 07.07.2021 
           var from_date = new Date(this.ownerdurationsdetails[0].From_Date);
           this.fromDate = (from_date.getDate())+'-' + (from_date.getMonth()+1) + '-'+from_date.getFullYear();
           var to_date = new Date(this.ownerdurationsdetails[0].To_Date);
           this.toDate = (to_date.getDate())+'-' + (to_date.getMonth()+1) + '-'+to_date.getFullYear();
           var todaydate = new Date()
           this.today_date = (todaydate.getDate())+'-' + (todaydate.getMonth()+1) + '-'+todaydate.getFullYear();
           var sHour = todaydate.getHours();
          //  console.log(this. today_date);
          //  console.log(sHour);
          //  console.log(this.fromDate);
          //  console.log(this.toDate);
          console.log(from_date);
          console.log(to_date);


          console.log(todaydate);
          // this.endingtimeDate(todaydate,from_date);
          // this.endedtimeDate(todaydate,to_date);
       }, err => {
       })
    }

   // Show ending date popup for myprofile Done By Alagesan	on 07.07.2021 
    // endingtimeDate(date1: Date, date2: Date)
    // {

    //   let d1 = new Date(date1); let d2 = new Date(date2);

    //   if (d1 < d2) 
    //   {
    //     $('#ending-date-popupbtn').trigger('click');
    //     let endingDate = (d2.getDate())+'-' + (d2.getMonth()+1) + '-'+d2.getFullYear();

    //     this.endingFormatDate = endingDate;
    //     return this.endingFormatDate;
    //   }

    
    // }
    
   // Show ended date popup for myprofile Done By Alagesan	on 07.07.2021 
    // endedtimeDate(date1: Date, date2: Date)
    // {

    //   let d1 = new Date(date1); let d2 = new Date(date2);

    //   if (d1 == d2) 
    //   {
    //     $('#ended-date-popupbtn').trigger('click');
    //     let endedDate = (d1.getDate())+'-' + (d1.getMonth()+1) + '-'+d1.getFullYear();

    //     this.endedFormatDate = endedDate;
    //     return this.endedFormatDate;
    //   }

    
    // }


    viewBoat(boat){
      console.log(boat);
      // Activate the owner in admin message for my profile Done By Alagesan on 10.07.2021
      // var owner_suspend = this.ownerdurationsdetails[0].Is_Cancellation;
      // if(owner_suspend == true){
      //   $('#suspend-owner-message-btn').trigger('click');
      // } 
      // if(boat.BoatDetails[0].IsActive == true && owner_suspend == false){
      //   $('#active-boat-popupbtn').trigger('click');
      // }  
      
      // disable and archive boat view page for myprofile Done By Alagesan	on 12.07.2021 
      if(boat.BoatDetails[0].Boat_Status == '0' || boat.BoatDetails[0].Boat_Status == '2'){
        $('#disable-boat-popup-message-btn').trigger('click');
        this.disableBoat = boat.Boat_Name;
      }
        // owner duration ended for my profile Done By Alagesan on 15.07.2021
      // if(boat.BoatDetails[0].Boat_Status == '1'){
      //   let todaydate = new Date()
      //   let to_date = new Date(this.ownerdurationsdetails[0].To_Date);

      //   if (todaydate < to_date) 
      //   {
      //     $('#ended-date-popupbtn').trigger('click');
      //     let endedDate = (to_date.getDate())+'-' + (to_date.getMonth()+1) + '-'+to_date.getFullYear();
      //     this.expireBoat = boat.Boat_Name;
      //     this.endedFormatDate = endedDate;
      //     return this.endedFormatDate;
      //   }
      //   }

      // Active boat view page for myprofile Done By Alagesan	on 12.07.2021 
      if(boat.BoatDetails[0].Boat_Status == '1'){
        sessionStorage.setItem('boatData', JSON.stringify(boat));
      //   Change the view boat url for myprofile Done By Alagesan	on 12.07.2021 
        this.router.navigate(['view-boat-owner/']);
      }
        
    }

    activeBoat(boat){
      sessionStorage.setItem('boatData', JSON.stringify(boat));   // if it's object
      // Change the view boat url for myprofile Done By Alagesan	on 05.07.2021 
      this.router.navigate(['view-boat-owner/']);

    }
  editProfile(){
    this.router.navigate(['edit-owner-profile/']);
  }

}
