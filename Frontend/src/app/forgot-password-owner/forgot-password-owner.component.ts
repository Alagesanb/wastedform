import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
// import environment for forgot password owner Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-forgot-password-owner',
  templateUrl: './forgot-password-owner.component.html',
  styleUrls: ['./forgot-password-owner.component.css']
})
// Create Component for forgot password owner //Done By Alagesan
export class ForgotPasswordOwnerComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  // Add Base URL for forgot password owner  Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;
  url = this.EnvironmentURL+"api/Owner"
  getReplay: any;
  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) {
    this.createForm();
   }
// Create Component for forgot password owner //Done By Alagesan
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

    this.http.post<any>(`${this.url}/ForgotPasswordOwner`,  this.form.value   ).subscribe(data => {
      if(data.status == true){
        $('#myModal').modal({backdrop: 'static', keyboard: false});
      }
        if(data.status==false){
          this.getReplay = data.info
          $('#error-disp-btns').trigger('click');
        }
        else if(data.status==true){
          this.getReplay = data.info
          $('#error-disp-btns').trigger('click');
          this.form.reset();
          this.form.get('Email').clearValidators();
          this.form.get('Email').updateValueAndValidity(); 
        }
        }, err => {
          console.log(err);
        })
  }

  reset(){
    this.router.navigate(['reset-password-owner/']);
  }

}
