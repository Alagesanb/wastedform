import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive-boats',
  templateUrl: './archive-boats.component.html',
  styleUrls: ['./archive-boats.component.css']
})
export class ArchiveBoatsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");
  }

}
