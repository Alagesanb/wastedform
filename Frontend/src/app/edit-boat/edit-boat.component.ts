import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import environment for edit boat Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
declare var $: any;
declare var jQuery: any; 
@Component({
  selector: 'app-edit-boat',
  templateUrl: './edit-boat.component.html',
  styleUrls: ['./edit-boat.component.css']
})
export class EditBoatComponent implements OnInit {
  boatform: FormGroup;
  imageForms:FormGroup;
  // Add Base URL for edit boat  Done By Alagesan	on 06.07.2021
  EnvironmentURL:string = environment.url;
  url = this.EnvironmentURL+"api/Boat"
  OwnerUrl = this.EnvironmentURL+"api/Owner"
  loctions: any;
  boatTypes: any;
  boatSubmitted = false;
  data: any =[];
  Launch_Dates: string;
  preDates: string;
  multiMg:  any =[];
  getBoatAndSeason: any;
  fromWDate: any;
  toWDate: any;
  toDate: any;
  fromDate: any;
  sumerS: string;
  sumerE: string;
  winterS: string;
  winterE: string;
  boatTypeName: any;
  loctionName: any;
  getRes: any;
  Owners_Allowed_Label:any;
  currentboatdetails:any;
  CurrentMultipleImage:any;
  Boat_Handbook_Name:any;
  dropdownSettings : IDropdownSettings ;
  Boattype_Name: any;
  dropdownBoat: any;
  dropdownBoatType: any;
  public_SingleImageName: any;
  handBook: File;
  public_MultipleImageName: any = [];

  previousDate:any;
  preLaunchDates:any;
  launchDate:any;
  launchDates:any;

  multiImg:any =[];
  multiImg_Angular:any =[];

  Public_ImageUrl:any = this.EnvironmentURL+"api/uploads/";

  Boat_originalhandBook_Name: any;
  adminlogin: any;


  constructor(private http: HttpClient ,private fb: FormBuilder, private router: Router,) {
    this.createBoatForm();
    this.imageForm();
   }

  ngOnInit(): void {
    this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
    if(this.adminlogin==false){
      this.router.navigate(['']);
    }
    this.dropdownSettings = {
      singleSelection: true,
      idField: '_id',
      textField: 'Boat_Type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection : true,
      noDataAvailablePlaceholderText : "No data available" 
      //maxHeight : 100        
     
    };
    sessionStorage.setItem("relodePg_book-for-owner","1");
sessionStorage.setItem("Adminbooking-relodePg","1");
 sessionStorage.setItem("boat-maintenance-reload","1");
 sessionStorage.setItem("view-boat-reload","1");

    //
    this.currentboatdetails = JSON.parse(sessionStorage.getItem("boatData"));

    //console.log(this.currentboatdetails);

    this.CurrentMultipleImage = this.currentboatdetails.Boat_Image;

    var ImgUrl = this.Public_ImageUrl;

    this.CurrentMultipleImage = jQuery.grep(this.CurrentMultipleImage, function(n, i){
      return (n !== "" && n != null);
    });

    var boateImagesMultiple = this.CurrentMultipleImage;

    var singleboatImagename_guid = this.currentboatdetails.Boat_HandBook;

    bindingImages();

    function bindingImages(){
      
      var divDatas;
      var loopcheck = 0;
      var multiFirstChek = 0;

      var imagenameArry = [];
      var loopcheckTwo = 0;
      var arrayread = 0;

      var imagenameArry_three = [];
      

      $.each(boateImagesMultiple , function(index, val) {

        if(loopcheckTwo == 0){

          loopcheckTwo = 1;
        }
        else{

          val = val.replace(/\"/g, "");
          
          imagenameArry.push(val);


          loopcheckTwo = 0;
        }


      });


      //globel Accessing
      $.each(boateImagesMultiple , function(index, val) {

        
          val = val.replace(/\"/g, "");
          if(val != ""){

            imagenameArry_three.push(val);

          }          
         
      });




      sessionStorage.setItem("multifile_preUpload",imagenameArry_three.toString());

      sessionStorage.setItem("multifile_Ang","");


      $.each(boateImagesMultiple , function(index, val) {

    

        if(loopcheck == 0){
          var tmp1 = ImgUrl + val;

          var temp3_replace = val.replace(".","-");

          if(multiFirstChek == 0){



            divDatas = '<div class="custom-file_edit col-md-6 col-sm-12 mb-3" id="'+temp3_replace+'">\
                      <span class="cls close-button-multiimages" Imgnames='+imagenameArry[arrayread]+' id="'+val+'"><i class="fa fa-close"></i></span>\
                      <div class="editImg">\
                        <img src="'+tmp1+'" alt="image">\
                      </div>\
                      <p class="boatName">'+imagenameArry[arrayread]+'</p>\
                    </div>';


            multiFirstChek = 1;
            arrayread = arrayread + 1;
          }
          else{

            divDatas += '<div class="custom-file_edit col-md-6 col-sm-12 mb-3" id="'+temp3_replace+'">\
                      <span class="cls close-button-multiimages" Imgnames='+imagenameArry[arrayread]+' id="'+val+'"><i class="fa fa-close"></i></span>\
                      <div class="editImg">\
                        <img src="'+tmp1+'" alt="image">\
                      </div>\
                      <p class="boatName">'+imagenameArry[arrayread]+'</p>\
                    </div>';
            
                    arrayread = arrayread + 1;
          }

          loopcheck = 1;

        }
        else{

          loopcheck = 0;

        }

        


      });

   


      $("#div-binding-multiple-images").html("");
      $("#div-binding-multiple-images").html(divDatas);

      // var temp2 = ImgUrl + singleboatImagename_guid
      // var temp5 = singleboatImagename_guid.replace(".","-");
      // var singleImgAndDatabind = '<div class="custom-file_edit mb-3" id="'+temp5+'"><span class="cls close-button-singleimages" id="'+singleboatImagename_guid+'" style="right:0px;"><i class="fa fa-close"></i></span><div class="editImg"><img src="'+temp2+'" alt="image"></div><p class="boatName">Boat Name</p></div>';

      // $("#div-id-single-image").html("");

      // $("#div-id-single-image").html(singleImgAndDatabind);



    }


    

    $(document).on("click",".close-button-multiimages",function() {

      var imgArrySplit = [];

      var imgArrySplit_Second = [];

      var getid = $(this).attr('id');

      var getImgnames = $(this).attr('Imgnames');

      var temp3_replace = getid.replace(".","-");

      //this to start....

      var multi_preUpload = sessionStorage.getItem("multifile_preUpload");

      imgArrySplit_Second = multi_preUpload.split(",");

      imgArrySplit_Second = jQuery.grep(imgArrySplit_Second, function(value) {
        return value != getImgnames;
      });

      imgArrySplit_Second = jQuery.grep(imgArrySplit_Second, function(value) {
        return value != getid;
      });

      sessionStorage.setItem("multifile_preUpload",imgArrySplit_Second.toString());

      ///.............


      var mulangul = sessionStorage.getItem("multifile_Ang");

      imgArrySplit = mulangul.split(",");

      imgArrySplit = jQuery.grep(imgArrySplit, function(value) {
        return value != getImgnames;
      });

      sessionStorage.setItem("multifile_Ang",imgArrySplit.toString());      

      $("#"+temp3_replace).remove();
      
  });

  var tempimageIdGenerate =100000;

  //var multifile_Jq =[];
  
  function previewImages() {

    

    var $preview = $('#div-binding-multiple-images');
    if (this.files) $.each(this.files, readAndPreview);
  
    function readAndPreview(i, file) {

      var filename = file.name;
      filename = filename.replace(/\s+/g, '');
      
      if (!/\.(jpe?g|png|gif)$/i.test(file.name)){
        return alert(file.name +" is not an image");
      } // else...
      
      var reader = new FileReader();
  
      $(reader).on("load", function() {

            $preview.append($('<div class="custom-file_edit col-md-6 col-sm-12 mb-3" id='+tempimageIdGenerate+'>\
            <span class="cls close-button-multiimages" Imgnames='+filename+' id='+tempimageIdGenerate+'><i class="fa fa-close"></i></span>\
            <div class="editImg">\
              <img src="'+this.result+'" alt="image">\
            </div>\
            <p class="boatName">'+filename+'</p>\
          </div>'));

          tempimageIdGenerate = tempimageIdGenerate + 10;

           //multifile_Jq.push(file.name.toString());

          // alert(multifile_Jq);
        
      });
  
      

      //sessionStorage.setItem("multifile_Jq",multifile_Jq.toString());

      reader.readAsDataURL(file);
      
      
    }


   
  
  }


  function previewImages_Name_single() {


    //var $preview = $('#div-binding-multiple-images');
    if (this.files) $.each(this.files, readAndPreviewPDF);
  
    function readAndPreviewPDF(i, file) {
  
      var filename = file.name;
      filename = filename.replace(/\s+/g, '');
      
      if (!/\.(pdf)$/i.test(file.name)){
        return alert(file.name +" is not an PDF");
      } // else...
      
      var reader_pdf = new FileReader();
  
      $(reader_pdf).on("load", function() {
  
                 
         $("#spn-id-fileName").text(filename);
        
      });
  
      
      reader_pdf.readAsDataURL(file);
      
      
    }
  
  
  }




  $('#id_singlefile').on("change", previewImages_Name_single);

  $('#customFile').on("change", previewImages);


    //



  $('#datepicker-Boat-Edit-1').Zebra_DatePicker({
      //format: 'd-m-Y'
     // direction: true,
      pair: $('#datepicker-Boat-Edit-2')
  });
  
  $('#datepicker-Boat-Edit-2').Zebra_DatePicker({
      //format: 'd-m-Y'
      direction: 1,
      //pair: $('#datepicker-Boat-Edit-3')
  });
$('#datepicker-Boat-Edit-3').Zebra_DatePicker({
    //format: 'd-m-Y'
    //direction: 1,
     pair: $('#datepicker-Boat-Edit-4')
});

$('#datepicker-Boat-Edit-4').Zebra_DatePicker({
    //format: 'd-m-Y'
    direction: 1,
  pair: $('#datepicker-Boat-Edit-5')
});

$('#datepicker-Boat-Edit-5').Zebra_DatePicker({
  //format: 'd-m-Y'
  pair: $('#datepicker-Boat-Edit-6'),
     direction: 1,
});

$('#datepicker-Boat-Edit-6').Zebra_DatePicker({
  //format: 'd-m-Y'
  direction: 1
});



    $('#example').DataTable();
    function selectDate(date) {
      $('.calendar-wrapper').updateCalendarOptions({
        date: date
      });
    }
      $('#example').DataTable();
 
    
    var defaultConfig = {
      weekDayLength: 1,
      date: new Date(),
      onClickDate: selectDate,
      showYearDropdown: true,
    };  
    $('.calendar-wrapper').calendar(defaultConfig);

    // $(".custom-file-input").on("change", function() {
    //   var fileName = $(this).val().split("\\").pop();
    //   $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    // });

    
// $("input[type='number']").inputSpinner()

// this.imgSection()
    this.getLoction()
this.getBoatType()
this.boatData()
  }


  
onFileChange(event, imageFor){

 

  var current_Array = [];

  var pervious_Array = [];
  

  var checksameImageChek_current = sessionStorage.getItem("multifile_Ang");

  var checksameImageChek_pervious = sessionStorage.getItem("multifile_Ang");

  current_Array = checksameImageChek_current.split(",");
  pervious_Array = checksameImageChek_pervious.split(",");

  for(var a1=0; a1 < pervious_Array.length; a1++ ){

    current_Array.push(pervious_Array[a1]);
    
  }

  //this to start.........



  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {

      
            var reader = new FileReader();

            reader.onload = (event:any) => {
            }

            var current_Name = event.target.files[i].name;

            current_Name = current_Name.replace(/\s+/g, '');

            var nameCheck = current_Array.find( x => x == current_Name);
            if(nameCheck == current_Name ){
              alert("multiple file name not allowed")
              location.reload();

              break;

            }
            else{

              this.multiImg.push(event.target.files[i]); 
              //this.multiImg_Angular.push(event.target.files[i].name);
              this.multiImg_Angular.push(current_Name);


            }

        
    }
    console.log(this.multiImg);
   sessionStorage.setItem("multifile_Ang",this.multiImg_Angular);
    
}


}


createBoatForm() {
  this.boatform = this.fb.group({
    Boat_id: new FormControl('', [Validators.required,]),
    Boattype_id: new FormControl('', [Validators.required,]),
    Boattype_Name: new FormControl('', [Validators.required,]),
    Location_Name: new FormControl('', [Validators.required,]),
    Boat_Name: new FormControl('', [Validators.required,]),
    Boat_Number: new FormControl('', [Validators.required,]),//
    Boat_Description: new FormControl('', []),
    Owners_Allowed: new FormControl('', [Validators.required,]),
    Location_Id: new FormControl('', [Validators.required,]), 
    Boat_Facility: new FormControl('', [Validators.required,]),
    Launch_Date: new FormControl('', [Validators.required,]),
    PreLaunch_Date: new FormControl('', [Validators.required,]),
    Boat_Status: new FormControl('', [Validators.required,]),
    SummerSeason_SDate: new FormControl('', [Validators.required,]),
    SummerSeason_EDate: new FormControl('', [Validators.required,]),
    WinterSeason_SDate: new FormControl('', [Validators.required,]),
    WinterSeason_EDate: new FormControl('', [Validators.required,]),

    Boat_Image: new FormControl('', []),
    Boat_HandBook: new FormControl('', []),
    Block: new FormControl('', []),
    IsActive: new FormControl('', []),

    Boat_originalhandBook: new FormControl('', []),



  });
}
  imageForm() {
    this.imageForms = this.fb.group({
      image: new FormControl('', [Validators.required,]),
    });
  }
  get bf() { return this.boatform.controls; }

  getLoction(){
    this.http.get<any>(`${this.url}/GetLocation`).subscribe(data => {
     
  this.loctions = data['response']
   }, err => {
   })
  }
  getBoatType(){

    this.http.get<any>(`${this.url}/GetBoatType`).subscribe(data => {
     
  this.boatTypes = data['response']
   }, err => {
   })
  }

  
  
   
  focusOutPreLaunch($event){

    this.previousDate = $event.target.value;
    var preLS = new Date(this.previousDate);
    this.preLaunchDates =  (preLS.getDate()) + '/' + (preLS.getMonth() + 1)  + '/' + preLS.getFullYear();
    this.boatform.get('PreLaunch_Date').setValue(this.preLaunchDates);

  }
  focusOutLaunch($event){

    this.launchDate = $event.target.value;
    var sumerS = new Date(this.launchDate);
    this.launchDates =  (sumerS.getDate()) + '/' + (sumerS.getMonth() + 1)  + '/' + sumerS.getFullYear();
    this.boatform.get('Launch_Date').setValue(this.launchDates);

  }

  onDeSelect(id) {
    console.log(id)
    this.boatform.get('Boattype_id').setValue('');
    this.boatform.get('Boattype_Name').setValue('');

  }

  getBoatTypeId(id){   
    console.log(id)
    this.boatform.get('Boattype_id').setValue(id._id);
    this.boatform.get('Boattype_Name').setValue(id.Boat_Type);
 
   }
  getLoctionTypeId(id){   
    for (let i = 0; i < this.loctions.length; i++) {
     if(this.loctions[i]._id == id){     
      this.boatform.get('Location_Name').setValue(this.loctions[i].Boat_Location)
      this.boatform.get('Location_Id').setValue(this.loctions[i]._id)

     }
    } 
  }

  summer_date:any;
  stD:any;
  fwD:any;
  fwd_2:any;


  focusOutWFrom($event)
  {
    this.fromWDate = $event.target.value;
    var fwd = new Date(this.fromWDate);
    this.fwD = (fwd.getDate() + '/' + (fwd.getMonth() + 1) + '/' + fwd.getFullYear());
    this.boatform.get('WinterSeason_SDate').setValue(this.fwD);
  }
  focusOutWTo($event)
  {
    this.toWDate = $event.target.value;
    var twD = new Date(this.toWDate);
    this.fwd_2 = (twD.getDate() + '/' + (twD.getMonth() + 1) + '/' + twD.getFullYear());
    this.boatform.get('WinterSeason_EDate').setValue(this.fwd_2);

  }
  focusOutSTo($event)
  {
    this.toDate = $event.target.value;
    var td = new Date(this.toDate);
    this.stD = (td.getDate() + '/' + (td.getMonth() + 1) + '/' + td.getFullYear());
    this.boatform.get('SummerSeason_EDate').setValue(this.stD);

  }



  focusOutSFrom($event) {
    this.fromDate = $event.target.value;
    var sssd = new Date(this.fromDate);
    this.summer_date = (sssd.getDate() + '/' + (sssd.getMonth() + 1) + '/' + sssd.getFullYear());
    this.boatform.get('SummerSeason_SDate').setValue(this.summer_date);
  }
 
  boatData(){
    this.data = JSON.parse(sessionStorage.getItem('boatData')); //forgot to close
    console.log(this.data)
if(this.data){


if(this.data.Boat_originalhandBook != null){

  this.Boat_originalhandBook_Name = this.data.Boat_originalhandBook;

}
else{


  this.Boat_originalhandBook_Name = "-";

}
  


var Launch_Date = new Date(this.data.Launch_Date);
this.Launch_Dates = (Launch_Date.getDate()) + '/'+(Launch_Date.getMonth()+1)+'/' + Launch_Date.getFullYear();

var preDate = new Date(this.data.PreLaunch_Date);
this.preDates = (preDate.getDate()) + '/'+(preDate.getMonth()+1)+'/' + preDate.getFullYear();


var sumerS = new Date(this.data.SummerSeason_SDate);
this.sumerS = (sumerS.getDate()) + '/'+(sumerS.getMonth()+1)+'/' + sumerS.getFullYear();

var sumerE = new Date(this.data.SummerSeason_EDate);
this.sumerE = (sumerE.getDate()) + '/'+(sumerE.getMonth()+1)+'/' + sumerE.getFullYear(); 

var winterS = new Date(this.data.WinterSeason_SDate);
this.winterS = (winterS.getDate()) + '/'+(winterS.getMonth()+1)+'/' + winterS.getFullYear();

var winterE = new Date(this.data.WinterSeason_EDate);
this.winterE = (winterE.getDate()) + '/'+(winterE.getMonth()+1)+'/' + winterE.getFullYear();

}
this.dropdownBoatType = []; 


this.boatform.get('Boattype_Name').setValue(this.data.Boattype_Name);
this.boatform.get('Boattype_id').setValue(this.data.Boattype_id);

if(this.data.BoattypeDetails ){
// this.boatform.get('Boattype_Name').setValue(this.data.BoattypeDetails[0].Boat_Type);
this.boatform.get('Boattype_Name').setValue(this.data.BoattypeDetails[0].Boat_Type);

this.dropdownBoatType.push({_id :this.data.Boattype_id, Boat_Type: this.data.BoattypeDetails[0].Boat_Type});
}else{
  this.dropdownBoatType.push({_id :this.data.Boattype_id, Boat_Type: this.data.Boattype_Name});

}


console.log(this.dropdownBoatType)

this.boatform.get('Location_Name').setValue(this.data.Location_Name);
if(this.data.locationDetails){
this.boatform.get('Location_Name').setValue(this.data.locationDetails[0].Boat_Location);
}
this.boatform.get('Boat_id').setValue(this.data._id);
// this.boatform.get('Boattype_id').setValue(this.data.Boattype_id);
this.boatform.get('Boat_Name').setValue(this.data.Boat_Name);
this.boatform.get('Boat_Number').setValue(this.data.Boat_Number);

this.boatform.get('Boat_Description').setValue(this.data.Boat_Description);
this.boatform.get('Owners_Allowed').setValue(this.data.Owners_Allowed);
//this.boatform.get('Owners_Allowed').setValue(3);
this.Owners_Allowed_Label = this.data.Owners_Allowed;
this.boatform.get('Location_Id').setValue(this.data.Location_Id);
this.boatform.get('Boat_Facility').setValue(this.data.Boat_Facility);
this.boatform.get('Launch_Date').setValue(this.Launch_Dates);
this.boatform.get('PreLaunch_Date').setValue(this.preDates);
this.boatform.get('Boat_Status').setValue("Enable");

this.boatform.get('SummerSeason_SDate').setValue(this.sumerS);
this.boatform.get('SummerSeason_EDate').setValue(this.sumerE);
this.boatform.get('WinterSeason_SDate').setValue(this.winterS);
this.boatform.get('WinterSeason_EDate').setValue(this.winterE);
this.boatform.get('Block').setValue(true);
 
this.boatform.get('IsActive').setValue(true);

//console.log();


 this.boatform.get('Boat_originalhandBook').setValue(this.Boat_originalhandBook_Name);

// this.Boat_originalhandBook_Name = this.data.Boat_originalhandBook;

this.multiMg = this.data.Boat_Image
//this.imgSection()
//$('.custom-file-input').trigger('click');

  }

 
  singleImage(event, imageFor)
  {
  
  
    this.handBook = <File>event.target.files[0];
    if(this.handBook != null){

      this.Boat_Handbook_Name = event.target.files[0].name;

    }
   
  }



  editBoat(){
    console.log(this.boatform.value);
    this.boatSubmitted = true;
////

var Data_Temp = this.boatform.value;
    this.boatform.get('PreLaunch_Date').setValue(this.string_to_Date_Convert(Data_Temp.PreLaunch_Date));
    this.boatform.get('Launch_Date').setValue(this.string_to_Date_Convert(Data_Temp.Launch_Date));
    this.boatform.get('SummerSeason_SDate').setValue(this.string_to_Date_Convert(Data_Temp.SummerSeason_SDate));
    this.boatform.get('SummerSeason_EDate').setValue(this.string_to_Date_Convert(Data_Temp.SummerSeason_EDate));
    this.boatform.get('WinterSeason_SDate').setValue(this.string_to_Date_Convert(Data_Temp.WinterSeason_SDate)); 
    this.boatform.get('WinterSeason_EDate').setValue(this.string_to_Date_Convert(Data_Temp.WinterSeason_EDate)); 
    //PreLaunch_Date
console.log(this.boatform.value);







/////////


    if (this.boatform.invalid) {
      return;
  }

  //////////

  if(this.handBook){
    const fd = new FormData();  
    fd.append("file",this.handBook);     
    this.http.post<any>(`${this.url}/FileUploadSingle`, fd).subscribe(data => {
       
      
    
      this.boatform.get('Block').setValue(true);
      var getdatas = data.data;
       
      this.public_SingleImageName = getdatas.filename;

      this.Boat_Handbook_Name =  getdatas.originalname;
     
      ////////Start.............

      if(this.multiImg){

        var imgArrySplit = [];
        var filterData = sessionStorage.getItem("multifile_Ang");

        imgArrySplit = filterData.split(",");


        const fd = new FormData();  
        for (let i = 0; i < this.multiImg.length; i++) {

          var temp_one = this.multiImg[i].name;

        var checkImg =  imgArrySplit.find( X => X == temp_one);
        if(checkImg == temp_one){

          fd.append("files",this.multiImg[i]);///this to start.......

        }
          
         
        }   
        this.http.post<any>(`${this.url}/FileUploadmany`, fd).subscribe(data => {

            this.boatform.get('Boat_Image').setValue(this.multiImg.name);
    
            this.public_MultipleImageName = data.data;
            
            var imgArrySplit_multi = [];
            var filterData_multi = sessionStorage.getItem("multifile_preUpload");

             imgArrySplit_multi = filterData_multi.split(",");

             
             for(var a1 =0; a1 < imgArrySplit_multi.length; a1++){

              this.public_MultipleImageName.push(imgArrySplit_multi[a1]);

             }    
             
            

             //var dddd = this.Boat_Handbook_Name;
             
   
                  this.boatform.get('Block').setValue(true);
                  this.boatform.get('IsActive').setValue(true);                     
    
                  this.boatform.get('Boat_Image').setValue(this.public_MultipleImageName);
                  this.boatform.get('Boat_HandBook').setValue(this.public_SingleImageName);
                  //this.boatform.get('Boat_originalhandBook').setValue(this.public_SingleImageName);
                  this.boatform.get('Boat_originalhandBook').setValue(this.Boat_Handbook_Name);
                 
                  console.log(this.boatform.value);
   
               
                  this.http.post<any>(`${this.url}/EditBoat`,  this.boatform.value   ).subscribe(data => {
                    
                 
                      if(data.status == true){
                         this.getRes = data.message
                         $('#saveBoatModel').trigger('click');
                       }
                       else if(data.status == false){

                         alert(data.message);

                       }
                      }, err => {
                      console.log(err);
                    })
    
    
            }, err => {
              console.log(err);
            })
          }
          else{


            //sumthi...........


            this.currentboatdetails = JSON.parse(sessionStorage.getItem("boatData"));

            this.public_SingleImageName = this.currentboatdetails.Boat_HandBook;

            
            //

            var imgArrySplit_multi = [];
            var filterData_multi = sessionStorage.getItem("multifile_preUpload");

             imgArrySplit_multi = filterData_multi.split(",");

             this.public_MultipleImageName = [];
             
             for(var a1 =0; a1 < imgArrySplit_multi.length; a1++){

              this.public_MultipleImageName.push(imgArrySplit_multi[a1]);

             }             

             

                  this.boatform.get('Block').setValue(true);
                  this.boatform.get('IsActive').setValue(true);                     
    
                  this.boatform.get('Boat_Image').setValue(this.public_MultipleImageName);
                  this.boatform.get('Boat_HandBook').setValue(this.public_SingleImageName);
                  this.boatform.get('Boat_originalhandBook').setValue(this.Boat_Handbook_Name);
                  
   
               
                  this.http.post<any>(`${this.url}/EditBoat`,  this.boatform.value   ).subscribe(data => {
                    
                   
                      if(data.status == true){
                         this.getRes = data.message
                         $('#saveBoatModel').trigger('click');
                       }
                       else if(data.status == false){

                         alert(data.message);

                       }
                      }, err => {
                      console.log(err);
                    })



          }
    
   

        }, err => {
          console.log(err);
        })
    }

    else{

      ///sum thing datas...........

      if(this.multiImg){

        var imgArrySplit = [];
        var filterData = sessionStorage.getItem("multifile_Ang");

        imgArrySplit = filterData.split(",");


        const fd = new FormData();  
        for (let i = 0; i < this.multiImg.length; i++) {

          var temp_one = this.multiImg[i].name;

        var checkImg =  imgArrySplit.find( X => X == temp_one);
        if(checkImg == temp_one){

          fd.append("files",this.multiImg[i]);///this to start.......

        }
          
         
        }   
        this.http.post<any>(`${this.url}/FileUploadmany`, fd).subscribe(data => {

            this.boatform.get('Boat_Image').setValue(this.multiImg.name);
    
            this.public_MultipleImageName = data.data;
            
            var imgArrySplit_multi = [];
            var filterData_multi = sessionStorage.getItem("multifile_preUpload");

             imgArrySplit_multi = filterData_multi.split(",");

             
             for(var a1 =0; a1 < imgArrySplit_multi.length; a1++){

              this.public_MultipleImageName.push(imgArrySplit_multi[a1]);

             }             

                 
             this.currentboatdetails = JSON.parse(sessionStorage.getItem("boatData"));


            

             this.public_SingleImageName = this.currentboatdetails.Boat_HandBook;

                  this.boatform.get('Block').setValue(true);
                  this.boatform.get('IsActive').setValue(true);                     
    
                  this.boatform.get('Boat_Image').setValue(this.public_MultipleImageName);
                  this.boatform.get('Boat_HandBook').setValue(this.public_SingleImageName);
                  this.boatform.get('Boat_originalhandBook').setValue(this.Boat_Handbook_Name);
                   
                  console.log(this.boatform.value);
                  
                  this.http.post<any>(`${this.url}/EditBoat`,  this.boatform.value   ).subscribe(data => {
                                     
                      if(data.status == true){
                         this.getRes = data.message
                         $('#saveBoatModel').trigger('click');
                       }
                       else if(data.status == false){

                         alert(data.message);

                       }
                      }, err => {
                      console.log(err);
                    })
        
    
            }, err => {
              console.log(err);
            })
          }
          else{


            //sumthi...........

            this.currentboatdetails = JSON.parse(sessionStorage.getItem("boatData"));

            this.public_SingleImageName = this.currentboatdetails.Boat_HandBook;
            
            var imgArrySplit_multi = [];
            var filterData_multi = sessionStorage.getItem("multifile_preUpload");

             imgArrySplit_multi = filterData_multi.split(",");

             this.public_MultipleImageName = [];
             for(var a1 =0; a1 < imgArrySplit_multi.length; a1++){

              this.public_MultipleImageName.push(imgArrySplit_multi[a1]);

             }   

                  this.boatform.get('Block').setValue(true);
                  this.boatform.get('IsActive').setValue(true);                     
    
                  this.boatform.get('Boat_Image').setValue(this.public_MultipleImageName);
                  this.boatform.get('Boat_HandBook').setValue(this.public_SingleImageName);
                  this.boatform.get('Boat_originalhandBook').setValue(this.Boat_Handbook_Name);
               
                  this.http.post<any>(`${this.url}/EditBoat`,  this.boatform.value   ).subscribe(data => {
                   
                      if(data.status == true){
                         this.getRes = data.message
                         $('#saveBoatModel').trigger('click');
                       }
                       else if(data.status == false){

                         alert(data.message);

                       }
                      }, err => {
                      console.log(err);
                    })


          }


    }

  
   }

  goToViewPage(){
  //Change all boat url  for edit boat Done By Alagesan on 25.06.2021
              this.router.navigate(['/all-boats/']);

  }

  string_to_Date_Convert(dateString){ 
        
    var dateArray = dateString.split("/");
    var dateObj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
  
    return this.getFormattedDate_second(dateObj)//dateObj;

  }

  getFormattedDate_second(dateVal) {
     
    var newDate = new Date(dateVal);

    var sMonth = this.padValue(newDate.getMonth() + 1);
    var sDay = this.padValue(newDate.getDate());
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = this.padValue(newDate.getMinutes());
    var sAMPM = "AM";

    var iHourCheck = Number(sHour);

    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = 12;
    }

    sHour = this.padValue(sHour);

    //return sDay + "-" + sMonth + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
    return sYear + "/" + sMonth + "/" + sDay;

}

 padValue(value) {
  return (value < 10) ? "0" + value : value;

}

}
