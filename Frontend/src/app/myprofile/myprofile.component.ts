import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  data: any=[];
  url = "http://65.2.28.16/api/Owner"
  imgUrl = "http://65.2.28.16/api/uploads/"

  listBoat: any=[];
  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
  }
  ngOnInit(): void {
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
    this.data = JSON.parse(sessionStorage.getItem('Ownerlogin')); 
    console.log(this.data);
    this.getBoteByOwner()
  }
  getBoteByOwner(){
    var obj={
      owner_id:this.data._id
    }
    this.http.post<any>(`${this.url}/GetBoatDetailsByOwner`,obj  ).subscribe(data => {  
      this.listBoat = data['response']
      console.log(this.listBoat) 

        }, err => {
        console.log(err);
        })
    }
    viewBoat(boat){
      sessionStorage.setItem('boatData', JSON.stringify(boat));   // if it's object
  
      this.router.navigate(['view-boat/']);
    }
  editProfile(){
    this.router.navigate(['edit-owner-profile/']);
  }

}
