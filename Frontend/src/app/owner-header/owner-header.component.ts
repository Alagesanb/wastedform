import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-owner-header',
  templateUrl: './owner-header.component.html',
  styleUrls: ['./owner-header.component.css']
})
export class OwnerHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $(document).ready(function(){

      $(".mobile-menu-icon").click(function(){
      $(".side-menu").toggleClass("mobile-sidebar");
    });
  
  });

     $(".mobile-menu-icon").click(function(){
       $(".side-menu").toggleClass("mobile-sidebar");
     });

  }
}
