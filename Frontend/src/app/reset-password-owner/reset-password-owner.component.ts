// Create Component for reset password owner //Done By Alagesan 

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
// import environment for reset password owner Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-reset-password-owner',
  templateUrl: './reset-password-owner.component.html',
  styleUrls: ['./reset-password-owner.component.css']
})
export class ResetPasswordOwnerComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  // Add Base URL for reset password owner  Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;
  url = this.EnvironmentURL+"api/Owner"
  ConfirmPasswords= false;
  getReplay: any;
  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) {
    this.createForm();
   }

  ngOnInit(): void {
   
  }
  createForm() {
    this.form = this.fb.group({
      resetPasswordToken: new FormControl('', [Validators.required,]), 
      Password: new FormControl('', [Validators.required,]), 
      ConfirmPassword: new FormControl('', [Validators.required,]),   
    });
  }
  get f() { return this.form.controls; }
  confirmPwd(){
    if(this.form.value.Password == this.form.value.ConfirmPassword){
      this.ConfirmPasswords= false
    
    }else{
      this.ConfirmPasswords= true
    }
  }
  submit(){
    this.submitted = true;
this.confirmPwd()
   console.log(this.ConfirmPasswords)
    if (this.form.invalid ||  this.ConfirmPasswords == true) {
      return;
  }

    console.log(this.form.value)
    this.http.post<any>(`${this.url}/ChangePassword`,  this.form.value   ).subscribe(data => {
      console.log(data)
        if(data.Status==false){
          this.getReplay = data.message
          $('#error-disp-btns').trigger('click');
        }
        else if(data.Status==true){
          this.getReplay = data.message
          $('#error-disp-btns').trigger('click');
          this.form.reset();
          this.form.get('resetPasswordToken').clearValidators();
          this.form.get('resetPasswordToken').updateValueAndValidity(); 
          this.form.get('Password').clearValidators();
          this.form.get('Password').updateValueAndValidity(); 
          this.form.get('ConfirmPassword').clearValidators();
          this.form.get('ConfirmPassword').updateValueAndValidity(); 
          // this.router.navigate(['owner-login']);
        }
        }, err => {
          console.log(err);
        })
  }
  close(){
    this.router.navigate(['owner-login/']);
  }

}

// Create Component for reset password owner //Done By Alagesan 
