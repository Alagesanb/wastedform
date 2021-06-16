import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment'

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-view-boat',
  templateUrl: './view-boat.component.html',
  styleUrls: ['./view-boat.component.css']
})
export class ViewBoatComponent implements OnInit {
  data: any;
	Launch_Dates: string;
	preDates: string;

	Summer_From: string;
	Summer_To: string;

	Winter_From: string;
	Winter_To: string;

	HandBookUrl: string;


	multiImge: any =[];
	slideIndex = 1;
	imgUrl = "http://65.2.28.16/api/uploads/"
	url = "http://65.2.28.16/api/Boat"
	OwnerUrl = "http://65.2.28.16/api/Owner"
	boat_Id: any;
	boatOwners: any=[];
	manageOwnerId: any;
	getResponce: any;
	adminlogin: any;

	TotalDaysAssigned_Summer_WeekDays :any;
	TotalDaysAssigned_Summer_WeekEndDays :any;
	TotalDaysAssigned_Winter_WeekDays :any;
	TotalDaysAssigned_Winter_WeekEndDays :any;
	boatStatus: string;
	allboatdata: any=[];

	constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) { 
	
	  }



  ngOnInit(): void {
	this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
	if(this.adminlogin==false){
	  this.router.navigate(['']);
	}
	sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");

 sessionStorage.setItem("pageIdentiFiction","view-boat");
 
 ReloadPages();
 function ReloadPages(){
          
	//var sss = public_URL;
   
	var datasessions = sessionStorage.getItem("view-boat-reload");
	
	if(datasessions == null)
	{
		
		sessionStorage.setItem("view-boat-reload","0");
		location.reload();

	}
	else if(datasessions == "1"){
	  sessionStorage.setItem("view-boat-reload","0");
		location.reload();

	}
	
   
	

}
	
	 this.data = JSON.parse(sessionStorage.getItem('boatData')); 
     this.GetTotalDaysAssigned();
	 ////////////

	 if(this.data.Boat_Status=="1"){
this.boatStatus = "Enable"
	 }else if(this.data.Boat_Status=="0"){
		this.boatStatus = "Disable"

	 }
	 var Launch_Date = new Date(this.data.Launch_Date);
	 this.Launch_Dates = (Launch_Date.getDate())+'-' + (Launch_Date.getMonth()+1) + '-'+Launch_Date.getFullYear();
	 var preDate = new Date(this.data.PreLaunch_Date);
	 this.preDates = (preDate.getDate())+'-' + (preDate.getMonth()+1) + '-'+preDate.getFullYear();

	 var summer_From_Date = new Date(this.data.SummerSeason_SDate);
	 this.Summer_From = (summer_From_Date.getDate())+'-' + (summer_From_Date.getMonth()+1) + '-'+summer_From_Date.getFullYear();

	 var summer_To_Date = new Date(this.data.SummerSeason_EDate);
	 this.Summer_To = (summer_To_Date.getDate())+'-' + (summer_To_Date.getMonth()+1) + '-'+summer_To_Date.getFullYear();

	 var  Winter_From_Date = new Date(this.data.WinterSeason_SDate);
	 this.Winter_From = (Winter_From_Date.getDate())+'-' + (Winter_From_Date.getMonth()+1) + '-'+Winter_From_Date.getFullYear();

	 var  Winter_To_Date = new Date(this.data.WinterSeason_EDate);
	 this.Winter_To = (Winter_To_Date.getDate())+'-' + (Winter_To_Date.getMonth()+1) + '-'+Winter_To_Date.getFullYear();

	 this.HandBookUrl = this.imgUrl + this.data.Boat_HandBook;

	//  Summer_From: string;
	// Summer_To: string;

	// Winter_From: string;
	// Winter_To: string;



	 ///////////////
     this.multiImge = this.data.Boat_Image;

	 this.boat_Id = this.data._id;
    this.getOwnersByBoatId();
	  
	 var urlImg = "http://65.2.28.16/api/uploads/";

	 var data_First;
	 var loopFirstChek = 0;

	 var data_Second;
	 var loopSecondCheck = 0;

	 var dataImages = this.multiImge; 

	 var div_Binding_one;
	 var div_Binding_two;
	 
	 start_first();

	 function start_first(){

		div_Binding_one = '<a class="prev" onclick="plusSlides(-1)">❮</a><a class="next" onclick="plusSlides(1)">❯</a><div class="caption-container"><p id="caption"></p></div>';
         
		div_Binding_two = '<div class="container"><div class="row" id="id-sliderbinding-Second"></div></div>';
		
		var dataImageLength = dataImages.length / 2;
		var loopfirstlength = 1;
	 
		var loopSecondlength = 1;

		var rongImageRemoveArray = 0;

		var rongImageRemoveArray_Secon = 0;
		

		$.each( dataImages, function(index, val) {

			if(rongImageRemoveArray == 0){


				if(loopFirstChek == 0){

					data_First = '<div class="mySlides"  style="display: block;"><div class="numbertext">'+ loopfirstlength +' / '+ dataImageLength +'</div><img src="'+ urlImg + val +'" style="width:100%"></div>';
							   
					loopFirstChek = 1;
		
				}
				else{
		
					data_First += '<div class="mySlides"><div class="numbertext">'+loopfirstlength+' / '+ dataImageLength +'</div><img src="'+ urlImg + val +'" style="width:100%"></div>';
								
				}
		
				loopfirstlength = loopfirstlength + 1;

				rongImageRemoveArray = 1;

			}
			else{

				rongImageRemoveArray = 0;

			}

		

	  });

	  $('#id-sliderbinding-First').html(data_First + div_Binding_one + div_Binding_two);

	  $.each(dataImages , function(index, val) {
		  
		
		if(rongImageRemoveArray_Secon == 0){

			if(loopSecondCheck == 0){
				data_Second = '<div class="column"><img class="demo cursor" src="'+ urlImg + val +'" style="width:100%" onclick="currentSlide('+ loopSecondlength +')" ></div>';
				loopSecondCheck = 1;
			}
			else{
	
				data_Second += '<div class="column"><img class="demo cursor" src="'+urlImg + val+'" style="width:100%" onclick="currentSlide('+ loopSecondlength +')" ></div>';
	
			}
	
			loopSecondlength = loopSecondlength + 1;

			rongImageRemoveArray_Secon = 1;
		}
		else{

			rongImageRemoveArray_Secon = 0;
		}

		
		
	  });
	  
	  $('#id-sliderbinding-Second').html(data_Second);

	}
	
	$(document).ready(function() {
	
		var current_yyyymm_ = moment().format("YYYYMM");
  
	   $("#pb-calendar").pb_calendar({
		   schedule_list : function(callback_, yyyymm_){
			   var temp_schedule_list_ = {};
			  
	   
			  temp_schedule_list_[current_yyyymm_+"02"] = [
				   {'ID' : 1, style : "green"}
				  
			   ];
			  
				temp_schedule_list_[current_yyyymm_+"03"] = [
				   {'ID' : 2, style : "green"}
				  
			   ];
			  
				 temp_schedule_list_[current_yyyymm_+"04"] = [
				   {'ID' : 3, style : "green"}
				  
			   ];
			  
			   temp_schedule_list_[current_yyyymm_+"10"] = [
				   {'ID' : 4, style : "green"}
			   ];
			  
			   temp_schedule_list_[current_yyyymm_+"11"] = [
				   {'ID' : 5, style : "green"}
			   ];
			  
				temp_schedule_list_[current_yyyymm_+"12"] = [
				   {'ID' : 6, style : "green"}
			   ];
  
			  
			  
			  
			   temp_schedule_list_[current_yyyymm_+"06"] = [
				  {'ID' : 7, style : "green"},
				 
				  
			   ];
			  
				temp_schedule_list_[current_yyyymm_+"07"] = [
				   {'ID' : 8, style : "green"},
				 
				  
			   ];           
	 
				   temp_schedule_list_[current_yyyymm_+"20"] = [
				   {'ID' : 1, style : "green"}
				  
			   ];
			  
			   temp_schedule_list_[current_yyyymm_+"23"] = [
				   {'ID' : 2, style : "blue"}
				  
			  ];
			  
				 temp_schedule_list_[current_yyyymm_+"24"] = [
				   {'ID' : 3, style : "blue"}
				  
			   ];
			  
			   callback_(temp_schedule_list_);
		   },
		   schedule_dot_item_render : function(dot_item_el_, schedule_data_){
			   dot_item_el_.addClass(schedule_data_['style'], true);
			   return dot_item_el_;
		   }
	   }); 
  
	  });


  }


  GetTotalDaysAssigned(){

	var boatdats = JSON.parse(sessionStorage.getItem("boatData"));

	var obj={
		Boat_id :boatdats._id
	}	
	this.http.post<any>(`${this.OwnerUrl}/GetTotalDaysAssigned`, obj   ).subscribe(data => {
		var resu = data.Response;

		this.TotalDaysAssigned_Summer_WeekDays = resu[0].Summer_WeekDays;
	    this.TotalDaysAssigned_Summer_WeekEndDays = resu[1].Summer_WeekEndDays;
	    this.TotalDaysAssigned_Winter_WeekDays = resu[2].Winter_WeekDays;
	    this.TotalDaysAssigned_Winter_WeekEndDays = resu[3].Winter_WeekEndDays;
		
		  
		  }, err => {
			console.log(err);
		  })
}


getOwnersByBoatId(){

	var obj={
		boatid :this.boat_Id
	}
	console.log()
	this.http.post<any>(`${this.OwnerUrl}/GetOwnerDetailsByBoatId`, obj   ).subscribe(data => {
		
		console.log(data.Data)
	    this.boatOwners = data.Data
		  

			this.http.get<any>(`${this.OwnerUrl}/GetAllOwnerssWithBoatDetails`).subscribe(data => {
			  console.log(data)
		  this.allboatdata = data['result'] 
		if(this.boatOwners){
		  console.log(this.boatOwners)
		  this.boatOwners.forEach(owner => {
			var obj2 = Object();
			this.allboatdata.forEach(boat => {
			if(owner._id == boat.Owner_Id){
			  owner.boatName = boat.BoatDetails[0][0].Boat_Name
			  owner.Summer_WeekDays = boat.BoatDetails[0][0].Summer_WeekDays
			  owner.Summer_WeekEndDays = boat.BoatDetails[0][0].Summer_WeekEndDays
			  owner.Total_Days = boat.BoatDetails[0][0].Total_Days
			  owner.Winter_WeekDays = boat.BoatDetails[0][0].Winter_WeekDays
			  owner.Winter_WeekEndDays = boat.BoatDetails[0][0].Winter_WeekEndDays
		
			}
		  });
		  });
		  
		}
		console.log(this.boatOwners)
		  // console.log(this.boatTypes)
		   }, err => {
		   })
		  



		  }, err => {
			console.log(err);
		  })
}

deleteManageOwner(id){
	console.log(id)
	console.log(id._id)
	this.manageOwnerId = id._id
	$('#removeBoat').trigger('click');
  }

  editManageOwner(id){
	console.log(id)
	sessionStorage.setItem('manageOwnerData', JSON.stringify(id));   // if it's object

    this.router.navigate(['manage-owner/']);
  }

    // View manage owner changes for view boat page //Done By Alagesan on 13.06.2021	
  viewManageOwner(owner){
	console.log(owner)
	sessionStorage.setItem('ownerData', JSON.stringify(owner));
    this.router.navigate(['view-owner/']);
  }

  delete(){
	var obj={
	  id:this.manageOwnerId
	}
	this.http.post<any>(`${this.OwnerUrl}/DeleteManageOwnersById`,obj  ).subscribe(data => {  
	  console.log(data) 
	  this.getResponce = data.message   
	  $('#pop-up-btn').trigger('click');
	  $('#removeBoat').trigger('click');

	  this.getOwnersByBoatId()
	
		  }, err => {
			console.log(err);
		  })
  }
}
