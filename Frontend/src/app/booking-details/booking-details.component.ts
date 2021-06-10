import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  form: FormGroup;
  url = "http://65.2.28.16/api/Owner";
  pathImage = "http://65.2.28.16/api/uploads/";
  allOwners: any=[];
  allBoats: any=[];
  imgUrl = "http://65.2.28.16/api/uploads/"
  Boaturl = "http://65.2.28.16/api/Boat"
 

  constructor(private http: HttpClient ,private router: Router,) { 
   }

  ngOnInit(): void {
    this.getAllOwners();
    this.getAllBoat();
  }

  getAllOwners(){
    this.http.get<any>(`${this.url}/ViewAllOwners`).subscribe(data => {
      console.log(data)
      this.allOwners = data['response']

   }, err => {
   })
  }

  getAllBoat(){
    this.http.get<any>(`${this.Boaturl}/GetallBoatDetails`).subscribe(data => {
      
  this.allBoats = data['response']
  console.log(this.allBoats);
   console.log(this.allBoats)
   }, err => {
   })
  }

}
