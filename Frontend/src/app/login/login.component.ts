import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  getReplay: any;
  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
    this.createForm();
   }
  url = "http://65.2.28.16/api/Login"
  
  
  ngOnInit(): void {
    sessionStorage.setItem("relodePg","1");
  }
  get f() { return this.form.controls; }

  createForm() {
    this.form = this.fb.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, ]),
    
    });
  }

login(){


  this.submitted = true;
  if (this.form.invalid) {
    return;
}




  this.http.post<any>(`${this.url}/Login`,  this.form.value   ).subscribe(data => {
    if(data.status==false){
      $('#error-disp-btns').trigger('click');
      this.getReplay = data.message
    }
    else if(data.status==true){

      var userIds = data.data._id;
      sessionStorage.setItem('UserId', userIds)    

      sessionStorage.setItem('userToken', JSON.stringify(data.token));   // if it's object

      sessionStorage.setItem('adminLogin', JSON.stringify(true));   // if it's object

      //   let seassionVal = sessionStorage.getItem('seassionObj');
      //   if (seassionVal !== null) {
      //     let sessionObj = JSON.parse(seassionVal);
      //     let expiredAt = new Date(value.expiredAt);
      //     if (expiredAt > new Date()) { // Validate expiry date.
      //       return sessionObj.value;
      //     } else {
      //       sessionStorage.removeItem('seassionObj');
      //     }
      //   }
      //     return null;
      
      // let expiredAt = new Date(new Date().getTime() + (60000 * 1));
      // let obj = {
      //   value: data.token,
      //   expiredAt: expiredAt.toISOString()
      // }
      // sessionStorage.setItem('seassionObj', JSON.stringify(obj));

      this.router.navigate(['dashboard/']);
    }
    }, err => {
      console.log(err);
    })
}
}
