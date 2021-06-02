import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-view-owner',
  templateUrl: './view-owner.component.html',
  styleUrls: ['./view-owner.component.css']
})
export class ViewOwnerComponent implements OnInit {
  data: any=[];
  url = "http://65.2.28.16/api/Owner"
  listBoat: any=[];
  imgUrl = "http://65.2.28.16/api/uploads/"
  adminlogin: any;

  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
   }
  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
    this.data = JSON.parse(sessionStorage.getItem('ownerData')); 
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
}
