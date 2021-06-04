import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html',
  styleUrls: ['./owner-login.component.css']
})
export class OwnerLoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  getReplay: any;
  rememberMe:boolean;
  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
    this.createForm();
   }
  url = "http://65.2.28.16/api/Owner"
  
  
  ngOnInit(): void {
    this.rememberMe = false;
  }
  get f() { return this.form.controls; }

  createForm() {
    this.form = this.fb.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, ]),
      rememberMe: new FormControl(''),
    
    });
  }

ownerLogin(){


  this.submitted = true;
  if (this.form.invalid) {
    return;
}




  this.http.post<any>(`${this.url}/OwnerLogin`,  this.form.value   ).subscribe(data => {
    
    if(data.status==false){
      $('#error-disp-btns').trigger('click');
      this.getReplay = data.message
    }
    else if(data.status==true){
      sessionStorage.setItem('userToken', JSON.stringify(data.token));
      sessionStorage.setItem('userlogin', JSON.stringify(true));
      sessionStorage.setItem('Ownerlogin', JSON.stringify(data.data));   // if it's object
      console.log(data.data);
      // sessionStorage.setItem('Email', JSON.stringify(data.Email));
      // sessionStorage.setItem('First_Name', JSON.stringify(data.First_Name));
      this.router.navigate(['owner-dashboard/']);
    }
    }, err => {
      console.log(err);
    })
}

forgotpassword(){
  this.router.navigate(['forgot-password-owner/']);
}
}
