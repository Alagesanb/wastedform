import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
// Create Component for owner dashboard //Done By Alagesan on 17.05.2021

export class OwnerDashboardComponent implements OnInit {
  ownerlogin: boolean;

  constructor(private router: Router,) { }

// Create Component for owner dashboard //Done By Alagesan on 17.05.2021

  ngOnInit(): void {
    this.ownerlogin = JSON.parse(sessionStorage.getItem("userlogin"));
    if(this.ownerlogin==false){
      this.router.navigate(['/owner-login/']);
    }
  }

}

// Create Component for owner dashboard //Done By Alagesan on 17.05.2021
