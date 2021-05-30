import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  url = "http://65.2.28.16/api/Login"
  getReplay: any;
  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  createForm() {
    this.form = this.fb.group({
      Email: new FormControl('', [Validators.required, Validators.email]),   
    });
  }
  get f() { return this.form.controls; }

  submit(){

    this.submitted = true;
    if (this.form.invalid) {
      return;
  }

    this.http.post<any>(`${this.url}/ResetPassword`,  this.form.value   ).subscribe(data => {
        if(data.status==false){
          this.getReplay = data.info
          $('#error-disp-btns').trigger('click');
        }
        else if(data.status==true){
          this.getReplay = data.info
          $('#error-disp-btns').trigger('click');
        }
        }, err => {
          console.log(err);
        })
  }
}
