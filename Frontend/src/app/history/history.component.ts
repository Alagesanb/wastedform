import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
// Create Component for history //Done By Alagesan on 17.05.2021
export class HistoryComponent implements OnInit {
  ownerlogin: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    sessionStorage.setItem("owner-dashboard-relodePg","1");
    this.ownerlogin = JSON.parse(sessionStorage.getItem("userlogin"));
    if(this.ownerlogin==false){
      this.router.navigate(['/owner-login/']);
    }
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");
  }

}

// Create Component for history //Done By Alagesan on 17.05.2021
