import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var jQuery: any;
declare var Swal: any;

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $(document).on("click","#a-menu-boat-main",function() {
        //$("#a-menu-boat-main").attr("aria-expanded","true");
        //$("#a-menu-boat-main").addClass("");
        //$("#a-menu-boat-main").removeClass("collapsed");
        /*
         sidemenuloder(){
            $("#a-menu-boat-main").attr("aria-expanded","true");        
            $("#a-menu-boat-main").removeClass("collapsed");
            $("#boat").addClass("show");

            $("#a-menu-Owners-main").attr("aria-expanded","true");        
            $("#a-menu-Owners-main").removeClass("collapsed");
            $("#owner").addClass("show");
            $("#id-submenu-child-boat-All-Boats").css({"background": "white", "color": "black","padding": "inherit","border-radius": "inherit"});
          }

          
element.style {
    background: white;
    color: black;
    padding: inherit;
    border-radius: inherit;
        
        */
      
    });

  }

 
  setManageOwnerData(){
    sessionStorage.setItem('manageOwnerData', JSON.stringify(''));   // if it's object

  }
}
