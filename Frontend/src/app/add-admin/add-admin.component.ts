import { Component, OnInit } from '@angular/core';
//Create component for add admin   Done By Alagesan on 29.07.2021
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
//Create component for add admin   Done By Alagesan on 29.07.2021
export class AddAdminComponent implements OnInit {
  show: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  password() {
    this.show = !this.show;
   }

}
