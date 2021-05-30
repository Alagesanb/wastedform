import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  url = "http://65.2.28.16/api/Login"
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
      console.log("iii")
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
          // this.router.navigate(['']);
        }
        }, err => {
          console.log(err);
        })
  }
  close(){
    this.router.navigate(['']);
  }
}
