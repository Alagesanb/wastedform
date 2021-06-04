import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {
  ownerlogin: boolean;

  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.ownerlogin = JSON.parse(sessionStorage.getItem("userlogin"));
    if(this.ownerlogin==false){
      this.router.navigate(['/owner-login/']);
    }
  }

}
