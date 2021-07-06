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
  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
  }
  // Create Component for myprofile //Done By Alagesan on 17.05.2021
  ngOnInit(): void {
    this.ownerlogin = JSON.parse(sessionStorage.getItem("userlogin"));
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
      
       }, err => {
       })
    }


    viewBoat(boat){
      sessionStorage.setItem('boatData', JSON.stringify(boat));   // if it's object
      // Change the view boat url for myprofile Done By Alagesan	on 05.07.2021 
      this.router.navigate(['view-boat-owner/']);
    }
  editProfile(){
    this.router.navigate(['edit-owner-profile/']);
  }

}
