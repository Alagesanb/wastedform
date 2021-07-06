import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
// import environment for view owner Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-view-owner',
  templateUrl: './view-owner.component.html',
  styleUrls: ['./view-owner.component.css']
})
export class ViewOwnerComponent implements OnInit {
  data: any=[];
  // Add Base URL for view owner  Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;
  url = this.EnvironmentURL+"api/Owner"
  listBoat: any=[];
  imgUrl = this.EnvironmentURL+"api/uploads/"
  adminlogin: any;
  listBoats: any=[];

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
      this.listBoats = data['response']

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
}
