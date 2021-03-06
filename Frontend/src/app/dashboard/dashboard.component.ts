import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
// import environment for dashboard Done By Alagesan	on 06.07.2021
import { environment } from '../../environments/environment';
declare var $: any;
declare var jQuery: any;
declare var Swal: any;

export class Lopupdate {
  Boat_Id?: string;
  Booking_ID?: string;
  LOA?: string;
  IsActive?: boolean;
  Name?:string; 
  _id?:any;
  
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   // Add Base URL for dashboard Done By Alagesan	on 06.07.2021
   EnvironmentURL:string = environment.url;
  url = this.EnvironmentURL+"api/Schedule"
  url_Boat = this.EnvironmentURL+"api/Boat"
  url_Boat_Shedule = this.EnvironmentURL+"api/Schedule";
  Booking: any=[];
  newBooking: any=[];
  todaysBooking: any=[];
  Cancellations: any=[];
  imgUrl = this.EnvironmentURL+"api/uploads/"
  Cancels: any=[];
  adminlogin: any;

  Cancels_First: any = [];
  Cancels_Second: any = [];
  Cancels_Thread: any = [];

  public ApproveLopDetails: Lopupdate = {};
  public IsmodelActive: boolean = false;
  public NotFound: string = 'NotFound';

  getResponce: any;

  New_Booking_Count:any = 0;
  Todays_Booking_Count:any = 0;
  Cancellations_Count:any = 0;
  Stand_by_Booking_Count:any = 0;

  searchLoction: any = '';
  searchLoction_Boat: any = '';
  loctions: any=[];
  Location_Name_dropDown: any = "Select Location";
  Boat_Name_dropDown :any = "Select Boat";
  allBoats: any;
  dropdown_Boat_List: any = [];
  Stand_by_Booking :any = [];
  dropdown_Boat_List_static: any = [];


  public_LocationType_id :any = null;
  public_baotType_Single_id :any = null;
  searchText: any = '';

  constructor(private httpClient: HttpClient,private http: HttpClient ,private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) {
     }
  ngOnInit(): void {

    var public_URL_Schedule = this.EnvironmentURL+"api/Schedule/";
    var public_URL_Days      = this.EnvironmentURL+"api/Days/";
     
      var ScheduleList = null;
      var GetAllUnAvailableDays = null;
      var GetAllUnAvailableDays_Boats = null;



      this.adminlogin = JSON.parse(sessionStorage.getItem("adminLogin"));
      if(this.adminlogin==false){
        this.router.navigate(['']);
      }
        this.getBooking();
        //this.getCancellations();
        this.getLoction();
        this.getAllBoat();
        var getallBoats;     
        
        sessionStorage.setItem("relodePg_book-for-owner","1");
        sessionStorage.setItem("Adminbooking-relodePg","1");
        sessionStorage.setItem("boat-maintenance-reload","1");
        sessionStorage.setItem("view-boat-reload","1");

       
        ///////////......................Resource Timeline ..Start...........

        var public_CurruntSet_Date_Month;
        var public_CurruntSet_Date_Year;
        var public_sheduler_totaldaysbased = [];
        
        ViewAllSchedule();

        $(document).ready(function(){
          $('[data-toggle="tooltip"]').tooltip();   
        });
        
        function Resource_Timeline(){

          
          var currnt_Month = Month_Genarator(new Date() );
          var currnt_Year = Year_Genarator(new Date());
          $(".cls-span-Month").text(currnt_Month);
          $(".cls-span-Year").text(currnt_Year);
          Days_Genarator();

        }



        $(document).on("click",".Cls-btn-left",function() {

          var Substract_Month = addMonths(public_CurruntSet_Date_Month,-1);
          var Substract_year = addyear(public_CurruntSet_Date_Year,-1);
          $(".cls-span-Month").text(Month_Genarator(Substract_Month));
          $(".cls-span-Year").text(Year_Genarator(Substract_year));

          Days_Genarator();

          //alert(Month_Genarator(new Date()));

        });

        $(document).on("click",".Cls-btn-right",function() {

          var addingMonth = addMonths(public_CurruntSet_Date_Month,1);
          var addingyear = addyear(public_CurruntSet_Date_Year,1);
          $(".cls-span-Month").text(Month_Genarator(addingMonth));
          $(".cls-span-Year").text(Year_Genarator(addingyear));

          Days_Genarator();

          //lert(Year_Genarator(new Date()));

        });

      function Days_Genarator(){        
       
        var result = [];
        var days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        var monthNames_Number = [ "1", "2", "3", "4", "5", "6",
            "7", "8", "9", "10", "11", "12" ];

        var r = getDaysInMonth();
        
        $.each(r, function(k, v)
        { 
          
          var obj = Object();
          obj.Day_week = v.getDate() +" "+ days[v.getDay()] ;
          obj.day = v.getDate();
          obj.month = monthNames[v.getMonth()];
          obj.month_Number = monthNames_Number[v.getMonth()];
          obj.year = v.getFullYear();       
          
          result.push(obj);
        });

        Binding_TR_Resource_Timeline(result);

      } 
      
      function Binding_TR_Resource_Timeline(values)
      {        
        if(typeof getallBoats !== "undefined" && getallBoats != null)
        {         
         
          $("#dtHorizontalVerticalExample").html("");
          var tmp_Bind_TH = '<td style="width:270px; font-weight: 500;">Boats</td>';
          var tmp_Bind_TR , tmp_Bind_TD;
          $.each(values, function(key, val)
          {
              
            tmp_Bind_TH += '<td style="width:40px; font-weight: 500;">'+val.Day_week+'</td>'; 
               
          });
  
          var tmp1 = 0;          
          $.each(getallBoats, function(key, val)
          {
                 
              tmp_Bind_TD = '<td id="'+val._id+'">'+val.Boat_Name+'</td>';
              var temp_SheduleList = ScheduleList;
              temp_SheduleList = public_sheduler_totaldaysbased.filter(x => x.Boat_Id == val._id || x.User_RoleType == "UnAvailableDays")
              
              $.each(values, function(key2, val2)
              {                  

                var tmp_sort = temp_SheduleList.find(x => x.day == val2.day &&
                  x.month_Number == val2.month_Number && x.year == val2.year
                  );                                

                 if(typeof tmp_sort !== "undefined" && tmp_sort != null)
                 {
                  tmp_Bind_TD += '<td style="background-color: '+tmp_sort.borderColor+'; border-color: '+tmp_sort.borderColor+';" data-toggle="tooltip" title="'+tmp_sort.title+'"></td>'; 
                 }
                 else
                 {
                  tmp_Bind_TD += '<td></td>';

                 }                   
  
              });
  
              if(tmp1 == 0)
              {                
                tmp_Bind_TR = '<tr>'+tmp_Bind_TD+'</tr>';
                tmp1 = 1;
              }
              else
              {                
                tmp_Bind_TR += '<tr>'+tmp_Bind_TD+'</tr>';
  
              }              
               
          });
         
          
          tmp_Bind_TH = '<tr>'+tmp_Bind_TH+'</tr>';
  
          $("#dtHorizontalVerticalExample").html(tmp_Bind_TH + tmp_Bind_TR);

        }        
     
        else
        {
          alert("Boat data is not loaded please refresh the page.");
          
        }
    }

    function getFormattedDate_second(dateVal) {
      var newDate = new Date(dateVal);
  
      var sMonth = padValue(newDate.getMonth() + 1);
      var sDay = padValue(newDate.getDate());
      var sYear = newDate.getFullYear();
      var sHour = newDate.getHours();
      var sMinute = padValue(newDate.getMinutes());
      var sAMPM = "AM";
  
      var iHourCheck = Number(sHour);
  
      if (iHourCheck > 12) {
          sAMPM = "PM";
          sHour = iHourCheck - 12;
      }
      else if (iHourCheck === 0) {
          sHour = 12;
      }
  
      sHour = padValue(sHour);
  
      return sDay + "-" + sMonth + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
  }


    function getDaysInMonth_Sheduler(datas_Arry,data_UnAvailableDays,data_UnAvailableDays_Boats){

    debugger;
        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        var monthNames_Number = [ "1", "2", "3", "4", "5", "6",
            "7", "8", "9", "10", "11", "12" ];
      
      $.each(datas_Arry, function(key, val){

        var tmp1 = val;
        var tmp1_StartDate = new Date(tmp1.start);
        var tmp2_EndDate = new Date(tmp1.end);
  
  
        var tmp_month = tmp1_StartDate.getMonth();
        var tmp_year = tmp1_StartDate.getFullYear();
        var tmp_Date = tmp1_StartDate.getDate();
  
        var date = new Date(tmp_year, tmp_month, tmp_Date);        
        
        do
        {
          
           var obj = Object();
          var tmp_dt = new Date(date);
          obj.fullofTheDate = tmp_dt;
          obj.day = tmp_dt.getDate();
          obj.month = monthNames[tmp_dt.getMonth()];
          obj.month_Number = monthNames_Number[tmp_dt.getMonth()];
          obj.year = tmp_dt.getFullYear(); 
          
           obj.User_RoleType = val.User_RoleType;
           obj.id = val.id;
            
           obj.title = val.title +" "+ getFormattedDate_second(val.start)+ " to " + getFormattedDate_second(val.end);;
          
        
           obj.start = val.start;
           obj.end = val.end;    
        
         
            obj.color = val.color;
            obj.bgColor = val.bgColor;
            obj.dragBgColor = val.dragBgColor;
            obj.borderColor = val.borderColor;

            obj.Boat_Id = val.Boat_Id;
            obj.Boat_Name = val.Boat_Name;

          public_sheduler_totaldaysbased.push(obj);         
           date.setDate(date.getDate() + 1);
           var tmp_Add_Date = new Date(date);
  
        }while(tmp_Add_Date <= tmp2_EndDate)
       

      });
       
     
      $.each(data_UnAvailableDays, function(key, val){

        var tmp1 = val;
        var tmp1_StartDate = new Date(tmp1);
        var tmp2_EndDate = new Date(tmp1);
  
  
        var tmp_month = tmp1_StartDate.getMonth();
        var tmp_year = tmp1_StartDate.getFullYear();
        var tmp_Date = tmp1_StartDate.getDate();
  
        var date = new Date(tmp_year, tmp_month, tmp_Date);        
        
        do
        {
          
           var obj = Object();
          var tmp_dt = new Date(date);
          obj.fullofTheDate = tmp_dt;
          obj.day = tmp_dt.getDate();
          obj.month = monthNames[tmp_dt.getMonth()];
          obj.month_Number = monthNames_Number[tmp_dt.getMonth()];
          obj.year = tmp_dt.getFullYear(); 
          
           obj.User_RoleType = "UnAvailableDays";
           
            
           obj.title = "UnAvailable Days";
                            
            obj.bgColor = "#3f4240";
            obj.dragBgColor = "#3f4240";
            obj.borderColor = "#3f4240";
            

          public_sheduler_totaldaysbased.push(obj);         
           date.setDate(date.getDate() + 1);
           var tmp_Add_Date = new Date(date);
  
        }while(tmp_Add_Date <= tmp2_EndDate)
       

      });

debugger;
      $.each(data_UnAvailableDays_Boats, function(key, val){
        debugger;

        var tmp1 = val;
        var tmp1_StartDate = new Date(tmp1.start);
        var tmp2_EndDate = new Date(tmp1.start);
  
  
        var tmp_month = tmp1_StartDate.getMonth();
        var tmp_year = tmp1_StartDate.getFullYear();
        var tmp_Date = tmp1_StartDate.getDate();
  
        var date = new Date(tmp_year, tmp_month, tmp_Date);        
        
        do
        {
          
           var obj = Object();
          var tmp_dt = new Date(date);
          obj.fullofTheDate = tmp_dt;
          obj.day = tmp_dt.getDate();
          obj.month = monthNames[tmp_dt.getMonth()];
          obj.month_Number = monthNames_Number[tmp_dt.getMonth()];
          obj.year = tmp_dt.getFullYear(); 
          
           obj.User_RoleType = "UnAvailableDays_Boats";
           //obj.id = val.id;
            
           obj.title = "UnAvailable Days for Boats";
          
            obj.color = "#878a89";
            obj.bgColor = "#878a89";
            obj.dragBgColor = "#878a89";
            obj.borderColor = "#878a89";

            obj.Boat_Id = val.Boat_Id;
            

          public_sheduler_totaldaysbased.push(obj);         
           date.setDate(date.getDate() + 1);
           var tmp_Add_Date = new Date(date);
  
        }while(tmp_Add_Date <= tmp2_EndDate)
       

      });
       



     
    };


    function getDaysInMonth(){
       
        var tmp_month = public_CurruntSet_Date_Month.getMonth();
        var tmp_year = public_CurruntSet_Date_Year.getFullYear();
        var date = new Date(tmp_year, tmp_month, 1);
            
        var days = [];
        while (date.getMonth() === tmp_month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

      function Month_Genarator(dateVal) {
          var newDate = new Date(dateVal);
          public_CurruntSet_Date_Month = newDate;

          var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
      
          var sMonth = padValue(newDate.getMonth() + 1);
          var sDay = padValue(newDate.getDate());
          var sYear = newDate.getFullYear(); 
          
          return monthNames[newDate.getMonth()];
          
          //return sDay + "-" + sMonth + "-" + sYear;
      }

      function Year_Genarator(dateVal) {
        var newDate = new Date(dateVal);
        public_CurruntSet_Date_Year = newDate;
    
        var sMonth = padValue(newDate.getMonth() + 1);
        var sDay = padValue(newDate.getDate());
        var sYear = newDate.getFullYear(); 
        
        return sYear;
        
        //return sDay + "-" + sMonth + "-" + sYear;
    }

      function padValue(value) {
        return (value < 10) ? "0" + value : value;
    }

    function addMonths(date, months)
     {
        var d = date.getDate();
        date.setMonth(date.getMonth() + +months);
        if (date.getDate() != d) {
          date.setDate(0);
        }
        return date;
    }

    function addyear(date, year) 
    { 
      var tmp_mon = public_CurruntSet_Date_Month.getFullYear(); 
      var tmp_year =  public_CurruntSet_Date_Year.getFullYear();

      if(tmp_mon != tmp_year)
      {   
        var d = date.getMonth();    
        date.setFullYear(date.getFullYear() + +year);
        if (date.getMonth() != d) {
          date.setDate(0);
        }
      }
      return date;
    }


    function ViewAllSchedule()
    {      
      ScheduleList = [];
      GetAllUnAvailableDays = [];
      GetAllUnAvailableDays_Boats = [];   

      $.ajax({
          url: public_URL_Schedule+"ViewAllSchedule",
          type: 'GET',
          dataType: 'json',        
          success: function(datas) {
              var respon =  datas.response;
                        
              $.each(respon, function (key, val) {                
                  generateRandomSchedule(val);                 
              });

              ///////

              $.ajax({
                url: public_URL_Days+"GetAllUnAvailableDays",
                type: 'GET',
                dataType: 'json',        
                success: function(GetAllUnAvailableDays_datas) {
                    
                  if(GetAllUnAvailableDays_datas.status == true)
                  {
                    var tmp1_dt = GetAllUnAvailableDays_datas.response;
                      if(tmp1_dt != null)
                      {
                        GetAllUnAvailableDays = tmp1_dt[0].UnAvailableDates;
                      }
                  } 

                  ///////////////

                        $.ajax({
                          url: public_URL_Days+"GetUnAvailabeDaysOfBoats",
                          type: 'GET',
                          dataType: 'json',        
                          success: function(GetUnAvailabeDaysOfBoats_datas) {

                            
                           
                            if(GetUnAvailabeDaysOfBoats_datas.status == true)
                            {
                              var tmp1_dt2 = GetUnAvailabeDaysOfBoats_datas.response;
                              $.each(tmp1_dt2, function(key, val2){
                                

                                try {

                                 // $.each(val2.Boat_Id, function(key, val3){
                                    
                                   $.each(val2.UnAvailableDates, function(key, val4){
                                     
                                     
                                            var obj = Object();
                                            obj.Boat_Id = val2.Boat_Id;//val3;
                                            obj.start = val4; //Jqueary_string_to_Date_Convert(val4);
                                            GetAllUnAvailableDays_Boats.push(obj);
 
                                   });
 
 
 
                                 //}); 
                                  
                                }
                                catch(err) {
                                  //document.getElementById("demo").innerHTML = err.message;
                                }



                                                              

                              });
                              
                            } 
                                                       

                            getDaysInMonth_Sheduler(ScheduleList,GetAllUnAvailableDays,GetAllUnAvailableDays_Boats);
                            getallBoats_Func();
          
                            
                
                          },
                          error: function (error) {          
                              alert(error.responseText);           
                            }
                      });

                  ////////////
      
                },
                error: function (error) {          
                    alert(error.responseText);           
                  }
            });










              /////





             

              

          },
          error: function (error) {          
              alert(error.responseText);           
            }
      });
      
    }

    function getallBoats_Func(){

      var obj = Object();      
        obj.alphabet = ""; 

      $.ajax({
        url: public_URL_Schedule+"GetBoatNames",
        type: 'POST',
        dataType: 'json', 
        data: obj,
        success: function(datas) {
          
          getallBoats = datas.response;
          Resource_Timeline();          
            
        },
        error: function (error) { 
            
            alert(error);
            console.log(error);
                       
        }
    });

    }

  function generateRandomSchedule(val){
    
        var schedule = Object();

        if(val.User_RoleType == "Admin")
        {
            schedule.User_RoleType = "Admin"
            schedule.id = val._id;
            
            schedule.title = val.title;
            schedule.body = "";
            schedule.isReadOnly = val.isReadOnly;
        
            schedule.isAllday = val.isAllday;
            schedule.category = val.category;
        
            schedule.start = val.start;
            schedule.end = val.end;    
        
            schedule.isAllday  = val.isAllday;
            schedule.isFocused = val.isFocused;
            schedule.isPending = val.isPending;
            schedule.isVisible = val.isVisible;
        
            schedule.dueDateClass = val.dueDateClass;  
            
            schedule.isPrivate = val.isPrivate;
            
            schedule.location = val.location;
            //var attendees_arry = generateNames();
        
            schedule.attendees = val.attendees; 
            schedule.recurrenceRule = val.recurrenceRule;
            schedule.state = val.state;
            schedule.color = "#ffffff";
            schedule.bgColor = "#047b0f";
            schedule.dragBgColor = "#047b0f";
            schedule.borderColor = "#047b0f";

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

            ScheduleList.push(schedule);


        }
        else if(val.User_RoleType == "Owner")
        {

          schedule.User_RoleType = "Owner"
        
            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title;// +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);;
            schedule.body = "";//val.body; 
            schedule.isReadOnly = val.isReadOnly;
        
            schedule.isAllday = val.isAllday;
            schedule.category = val.category;
        
            schedule.start = val.start;
            schedule.end = val.end;    
        
            schedule.isAllday  = val.isAllday;
            schedule.isFocused = val.isFocused;
            schedule.isPending = val.isPending;
            schedule.isVisible = val.isVisible;
        
            schedule.dueDateClass = val.dueDateClass;  
            
            schedule.isPrivate = val.isPrivate;
            
            schedule.location = val.location;
            //var attendees_arry = generateNames();
        
            schedule.attendees = val.attendees; 
            schedule.recurrenceRule = val.recurrenceRule;
            schedule.state = val.state;
            schedule.color = "#ffffff";
            schedule.bgColor = "#D50000";
            schedule.dragBgColor = "#D50000";
            schedule.borderColor = "#D50000";

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

            ScheduleList.push(schedule);

        }
        else if(val.User_RoleType == "Maintenance")
        {

          schedule.User_RoleType = "Maintenance"
            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title;// +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);;
            schedule.body = "";//val.body; 
            schedule.isReadOnly = val.isReadOnly;
        
            schedule.isAllday = val.isAllday;
            schedule.category = val.category;
        
            schedule.start = val.start;
            schedule.end = val.end;    
        
            schedule.isAllday  = val.isAllday;
            schedule.isFocused = val.isFocused;
            schedule.isPending = val.isPending;
            schedule.isVisible = val.isVisible;
        
            schedule.dueDateClass = val.dueDateClass;  
            
            schedule.isPrivate = val.isPrivate;
            
            schedule.location = val.location;
            //var attendees_arry = generateNames();
        
            schedule.attendees = val.attendees; 
            schedule.recurrenceRule = val.recurrenceRule;
            schedule.state = val.state;
            schedule.color = "#ffffff";
            schedule.bgColor = "#2c46f8";
            schedule.dragBgColor = "#2c46f8";
            schedule.borderColor = "#2c46f8";

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

            ScheduleList.push(schedule);
        }

        

    





  

  }


  function Jqueary_string_to_Date_Convert(dateString){   
   debugger;
    var dateArray = dateString.split("/");
    //var dateObj = new Date(`${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`);
    var dateObj =dateArray[1] +"/"+dateArray[0]+"/"+ dateArray[2];
  
    return dateObj;

  }


///////...................Resource Timeline end...............
  }

   getFormattedDate_WithOut_Zero_Time(dateVal) {
    var newDate = new Date(dateVal);

    var sMonth = this.padValue(newDate.getMonth() + 1);
    var sDay = this.padValue(newDate.getDate());
    var sYear = newDate.getFullYear();  
    
    return sDay + "-" + sMonth + "-" + sYear;
}

 padValue(value) {
  return (value < 10) ? "0" + value : value;
}




  getBooking(){
    this.http.get<any>(`${this.url}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
     
      
      this.Booking = data['response']
      
      this.Booking.forEach(element => {
        
       
      var date = new Date(element.Current_Time);
      var upadtedate = new Date(element.Updated_time);
       

      var dates = date.getDate()
      var todaysDate = new Date();

      var updatedates = upadtedate.getDate();
      var todaysDates = todaysDate.getDate();

      var to_date = new Date();
      var to_date_only = this.getFormattedDate_WithOut_Zero_Time(to_date);// to_date.getDay();

      var start_Date = new Date(element.start);
      var start_Date_only = this.getFormattedDate_WithOut_Zero_Time(start_Date); //start_Date.getDay();

      

    if(to_date_only  == start_Date_only ){

      var obj_s = Object();

      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
      obj_s._id = element._id;

      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

      this.todaysBooking.push(obj_s);


      }      

     



    //obj2 = element; 
      

      }
    if(updatedates  == todaysDates ){      
      var obj_s = Object();

      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;

      obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
      obj_s._id = element._id;
      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 
      this.newBooking.push(obj_s);


      }      

      
    }

    });


    //this is Start..........
    var standByBooking = data['StandbyBooking']

    standByBooking.forEach(element => {

      var to_date = new Date();
      var to_date_only = this.getFormattedDate_WithOut_Zero_Time(to_date);// to_date.getDay();

      var start_Date = new Date(element.start);
      var start_Date_only = this.getFormattedDate_WithOut_Zero_Time(start_Date); //start_Date.getDay();


if(to_date_only == start_Date_only)
{
      
    if(element.Is_StandByBooking == true){

      var obj_s = Object();

      if(element.BoatDetails.length !== 0){

        obj_s._Id = element._id;
      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;

      obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
      obj_s._id = element._id;
      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

      this.Stand_by_Booking.push(obj_s);


      }      


    }

}

    

    });


    ////End...................

    this.Cancellations = data['Cancelledresponse']
    
   

    /// cancell .... 01

    
    //Cancell ......02

    this.Cancellations.forEach(element => {
      var obj4 = Object();
      var date = new Date(element.Updated_time);
      var dates = date.getDate()
      var todaysDate = new Date();
      var todaysDates = todaysDate.getDate()
      if(dates  == todaysDates )
      {
            
        if(element.BoatDetails.length !== 0){

        
        if(element.BookingStatus == "Accepted"){

          var obj_s = Object();
          
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;
        obj_s.BookingStatus = element.BookingStatus;
        obj_s.Approved_LOA = element.Approved_LOA;
        obj_s.LOA = element.LOA;

        var boatnum = element.BoatDetails[0].Boat_Number;

        if (typeof boatnum !== "undefined" || boatnum != null){
         
          obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
        }
        else{

          obj_s.Boat_Number = 0;
          

        }

        obj_s._id = element._id;
        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 

        
  
         this.Cancels_Second.push(obj_s);
  
  
        }

        else if(element.BookingStatus != "Accepted") 
        {

          var obj_s = Object();
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;
        obj_s.BookingStatus = element.BookingStatus;
        obj_s.Approved_LOA = element.Approved_LOA;
        obj_s.LOA = element.LOA;

        if (typeof element.BoatDetails[0].Boat_Number !== "undefined" || element.BoatDetails[0].Boat_Number != null){
          
          obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
        }
        else{
          
          obj_s.Boat_Number = 0;

        }
        
        obj_s._id = element._id;
        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
         this.Cancels_First.push(obj_s);
  
  
        }

        else
        {

          var obj_s = Object();

        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;
        obj_s.BookingStatus = element.BookingStatus;
        obj_s.Approved_LOA = element.Approved_LOA;
        obj_s.LOA = element.LOA;

        if (typeof element.BoatDetails[0].Boat_Number !== "undefined" || element.BoatDetails[0].Boat_Number != null){
          obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
          
        }
        else{
          
          obj_s.Boat_Number = 0;

        }
        obj_s._id = element._id;
        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
         this.Cancels_Thread.push(obj_s);
  
  
        

        } 
        
        


      }     
        
        
        // obj4 = element       
        //     this.Cancels.push(obj4);
        
      }
  
  
    });


    /*Cancels_First:any[];
  Cancels_Second:any[];*/


  this.Cancellations.forEach(element => {
    var obj4 = Object();
    var date = new Date(element.Updated_time);
    var dates = date.getDate()
    var todaysDate = new Date();
    var todaysDates = todaysDate.getDate()
    if(dates  == todaysDates )
    {
      
      var obj_s = Object();
  
      if(element.BoatDetails.length !== 0){

       

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;
      obj_s.BookingStatus = element.BookingStatus;
      obj_s.Approved_LOA = element.Approved_LOA;

      obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
      obj_s._id = element._id;
      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;
      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

       this.Cancels.push(obj_s);


      }      
      
      
      // obj4 = element       
      //     this.Cancels.push(obj4);
      
    }


  });



    console.log(this.Cancels);
  
    this.Cancellations_Count = this.Cancels.length;
    this.New_Booking_Count = this.newBooking.length;
    this.Todays_Booking_Count = this.todaysBooking.length;
    this.Stand_by_Booking_Count = this.Stand_by_Booking.length;

   }, err => {
   })
  }


  
   public ApproveLop(cancelinfo): void {
       
    this.IsmodelActive = true;
    this.ApproveLopDetails.Boat_Id = cancelinfo._id;
    this.ApproveLopDetails.Booking_ID = cancelinfo.Booking_ID;
    this.ApproveLopDetails.LOA = cancelinfo.LOA;
    this.ApproveLopDetails.IsActive = true;
    this.ApproveLopDetails._id = cancelinfo._id;
    
      this.ApproveLopDetails.Name = cancelinfo.First_Name;
   
  }


  public UpdateLop(): void {

    
    
    if(this.ApproveLopDetails.LOA){
      delete this.ApproveLopDetails.Name
      
        this.http.post<any>(`${this.url}/ApproveCancellation`, this.ApproveLopDetails  ).subscribe(data => {  

         

         if(data.status == true){

          this.getResponce = data.message;
          $('#pop-up-btn_btn').trigger('click');

         }
         
        console.log('uploadsuccess', data);
      });
     }else{
     console.log("LOA Is Required");
    }
  }




  

  getLoction(){
    this.http.get<any>(`${this.url_Boat}/GetLocation`).subscribe(data => {    
     
  this.loctions = data['response']
  
   }, err => {
   })
  }

  getAllBoat(){

    var obj = Object();
             obj.alphabet = "";
           this.http.post<any>(`${this.url_Boat_Shedule}/GetBoatNames`, obj).subscribe(data => { 
             this.dropdown_Boat_List = data.response;                          
              this.dropdown_Boat_List_static = data.response;                
                     
             }, err => {
               console.log(err);
             })

  }
  getLoctionTypeId_Boat(loc){

    
    
  this.public_baotType_Single_id = loc._id;

    this.newBooking = [];
    this.Stand_by_Booking = [];
    this.todaysBooking = [];

    this.Cancels_Thread = [];
    this.Cancels_First = [];
    this.Cancels_Second = [];
    
    this.http.get<any>(`${this.url}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
     
      this.Booking = data['response']
      this.Booking.forEach(element => {
        var obj2 = Object();
        var obj3 = Object();
      var date = new Date(element.Current_Time);
      var upadtedate = new Date(element.Updated_time);

      var dates = date.getDate();
      var todaysDate = new Date();

      var updatedates = upadtedate.getDate();
      var todaysDates = todaysDate.getDate();


      var to_date = new Date();
      var to_date_only = this.getFormattedDate_WithOut_Zero_Time(to_date);// to_date.getDay();

      var start_Date = new Date(element.start);
      var start_Date_only = this.getFormattedDate_WithOut_Zero_Time(start_Date); //start_Date.getDay();




      if(to_date_only  == start_Date_only ){

        var obj_s = Object();
  
        if(element.BoatDetails.length !== 0){
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;

        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
         this.todaysBooking.push(obj_s);
  

        }      
  
        
        }
    
    if(updatedates  == todaysDates ){      
      var obj_s = Object();

      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 
      this.newBooking.push(obj_s);

      }      

      

    }


    /*
    
    if(element.Is_StandByBooking == true){

      var obj_s = Object();

      if(element.BoatDetails.length !== 0){
        obj_s._Id = element._id;
      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;

      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

      this.Stand_by_Booking.push(obj_s);


      }      


    }
  
    */
  
  
  });
  ///

   //this is Start..........
   var standByBooking = data['StandbyBooking']

   standByBooking.forEach(element => {

    var to_date = new Date();
      var to_date_only = this.getFormattedDate_WithOut_Zero_Time(to_date);// to_date.getDay();

      var start_Date = new Date(element.start);
      var start_Date_only = this.getFormattedDate_WithOut_Zero_Time(start_Date); //start_Date.getDay();

      if(to_date_only == start_Date_only)
      {
      
        if(element.Is_StandByBooking == true){

          var obj_s = Object();

          if(element.BoatDetails.length !== 0){

            obj_s._Id = element._id;
          obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
          obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
          obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
          obj_s.start = element.start;
          obj_s.Boat_Id =  element.BoatDetails[0]._id;
          obj_s.end = element.end;
          obj_s.Booking_ID = element.Booking_ID;

          obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
          obj_s._id = element._id;
          obj_s.Location_Name = element.BoatDetails[0].Location_Name;
          obj_s.Location_Id = element.BoatDetails[0].Location_Id;

          if(element.OwnerDetails.length !== 0){

            obj_s.First_Name = element.OwnerDetails[0].First_Name;
            obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
            obj_s.OwnerDetails = element.OwnerDetails[0];

          } 

          this.Stand_by_Booking.push(obj_s);


          }      


        }
      }
   

   });





  this.Cancellations = data['Cancelledresponse']
  this.Cancellations.forEach(element => {
    var obj4 = Object();
    var date = new Date(element.Current_Time);
    var dates = date.getDate()
    var todaysDate = new Date();
    var todaysDates = todaysDate.getDate()
    if(dates  == todaysDates )
    {
      
      var obj_s = Object();
  
      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;
      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

       this.Cancels.push(obj_s);


      }     
           
    }


  });


   //Cancell ......02

   this.Cancellations.forEach(element => {
    var obj4 = Object();
    var date = new Date(element.Updated_time);
    var dates = date.getDate()
    var todaysDate = new Date();
    var todaysDates = todaysDate.getDate()
    if(dates  == todaysDates )
    {
          
      if(element.BoatDetails.length !== 0){

      
      if(element.BookingStatus == "Accepted"){

        var obj_s = Object();
        

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;
      obj_s.BookingStatus = element.BookingStatus;
      obj_s.Approved_LOA = element.Approved_LOA;
      obj_s.LOA = element.LOA;

      var boatnum = element.BoatDetails[0].Boat_Number;

      if (typeof boatnum !== "undefined" || boatnum != null){
       
        obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
      }
      else{

        obj_s.Boat_Number = 0;
        

      }

      obj_s._id = element._id;
      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;
      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

      

       this.Cancels_Second.push(obj_s);


      }

      else if(element.BookingStatus != "Accepted") 
      {

        var obj_s = Object();

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;
      obj_s.BookingStatus = element.BookingStatus;
      obj_s.Approved_LOA = element.Approved_LOA;
      obj_s.LOA = element.LOA;

      if (typeof element.BoatDetails[0].Boat_Number !== "undefined" || element.BoatDetails[0].Boat_Number != null){
        
        obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
      }
      else{
        
        obj_s.Boat_Number = 0;

      }
      
      obj_s._id = element._id;
      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;
      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

       this.Cancels_First.push(obj_s);


      }

      else
      {

        var obj_s = Object();

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;
      obj_s.BookingStatus = element.BookingStatus;
      obj_s.Approved_LOA = element.Approved_LOA;
      obj_s.LOA = element.LOA;

      if (typeof element.BoatDetails[0].Boat_Number !== "undefined" || element.BoatDetails[0].Boat_Number != null){
        obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
        
      }
      else{
        
        obj_s.Boat_Number = 0;

      }
      obj_s._id = element._id;
      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;
      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

       this.Cancels_Thread.push(obj_s);


      

      } 
      
      


    }     
      
      
      // obj4 = element       
      //     this.Cancels.push(obj4);
      
    }


  });


  //

    this.Boat_Name_dropDown = loc.Boat_Name;    
    
  if(this.public_LocationType_id == null)
  {    
    this.newBooking = this.newBooking.filter(x => x.Boat_Id == loc._id);
    this.todaysBooking = this.todaysBooking.filter(x => x.Boat_Id == loc._id);
    
    this.Cancels_Thread = this.Cancels_Thread.filter(x => x.Boat_Id == loc._id);
    this.Cancels_First = this.Cancels_First.filter(x => x.Boat_Id == loc._id);
    this.Cancels_Second = this.Cancels_Second.filter(x => x.Boat_Id == loc._id);   
    
    this.Cancels = this.Cancels.filter(x => x.Boat_Id == loc._id);

    this.Stand_by_Booking = this.Stand_by_Booking.filter(x => x.Boat_Id == loc._id);
  }
  else
  {

    this.newBooking = this.newBooking.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);
    this.todaysBooking = this.todaysBooking.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);
    
    this.Cancels_Thread = this.Cancels_Thread.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);
    this.Cancels_First = this.Cancels_First.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);
    this.Cancels_Second = this.Cancels_Second.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);
    
    
    this.Cancels = this.Cancels.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);
    this.Stand_by_Booking = this.Stand_by_Booking.filter(x => x.Boat_Id == loc._id && x.Location_Id == this.public_LocationType_id);


  }
    
    this.New_Booking_Count = this.newBooking.length;
    this.Todays_Booking_Count = this.todaysBooking.length;
    this.Cancellations_Count = this.Cancels_Thread.length + this.Cancels_First.length + this.Cancels_Second.length;
    this.Stand_by_Booking_Count = this.Stand_by_Booking.length;

   }, err => {
   });

  }

  getLoctionTypeId(loc){

//this to start............
this.dropdown_Boat_List =  this.dropdown_Boat_List_static.filter(x => x.Location_Id == loc._id);
console.log(this.dropdown_Boat_List);
//........


  this.public_LocationType_id = loc._id;
    this.newBooking = [];
    this.Stand_by_Booking = [];
    this.todaysBooking = [];

    this.Cancels_Thread = [];
    this.Cancels_First = [];
    this.Cancels_Second = [];

    
    this.http.get<any>(`${this.url}/ViewBookingDetailsWithBoatAndOwner`).subscribe(data => {
     
      this.Booking = data['response']
      this.Booking.forEach(element => {
        var obj2 = Object();
        var obj3 = Object();
      var date = new Date(element.Current_Time);
      var upadtedate = new Date(element.Updated_time);

      var dates = date.getDate();
      var todaysDate = new Date();

      var updatedates = upadtedate.getDate();
      var todaysDates = todaysDate.getDate();

      var to_date = new Date();
      var to_date_only = this.getFormattedDate_WithOut_Zero_Time(to_date);// to_date.getDay();

      var start_Date = new Date(element.start);
      var start_Date_only = this.getFormattedDate_WithOut_Zero_Time(start_Date); //start_Date.getDay();



      if(to_date_only  == start_Date_only ){

        var obj_s = Object();
  
        if(element.BoatDetails.length !== 0){
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;

        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;

        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
         this.todaysBooking.push(obj_s);

        }      
  
       
  
        }
    
      if(updatedates  == todaysDates ){      
        var obj_s = Object();

        if(element.BoatDetails.length !== 0){

        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;

        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;

        if(element.OwnerDetails.length !== 0){

          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];

        } 
        this.newBooking.push(obj_s);

        }      

        

      }

      /*
      if(element.Is_StandByBooking == true){

        var obj_s = Object();
  
        if(element.BoatDetails.length !== 0){
          obj_s._Id = element._id;
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;

        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
  
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
        this.Stand_by_Booking.push(obj_s);
  
  
        }      
  
  
      }

      */

    });


    //.....

     //this is Start..........
     var standByBooking = data['StandbyBooking']

     standByBooking.forEach(element => {

      var to_date = new Date();
      var to_date_only = this.getFormattedDate_WithOut_Zero_Time(to_date);// to_date.getDay();

      var start_Date = new Date(element.start);
      var start_Date_only = this.getFormattedDate_WithOut_Zero_Time(start_Date); //start_Date.getDay();


      if(to_date_only == start_Date_only)
      {
              
          if(element.Is_StandByBooking == true){
      
            var obj_s = Object();
      
            if(element.BoatDetails.length !== 0){
      
              obj_s._Id = element._id;
            obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
            obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
            obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
            obj_s.start = element.start;
            obj_s.Boat_Id =  element.BoatDetails[0]._id;
            obj_s.end = element.end;
            obj_s.Booking_ID = element.Booking_ID;
      
            obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
            obj_s._id = element._id;
            obj_s.Location_Name = element.BoatDetails[0].Location_Name;
            obj_s.Location_Id = element.BoatDetails[0].Location_Id;
      
            if(element.OwnerDetails.length !== 0){
      
              obj_s.First_Name = element.OwnerDetails[0].First_Name;
              obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
              obj_s.OwnerDetails = element.OwnerDetails[0];
      
            } 
      
            this.Stand_by_Booking.push(obj_s);
      
      
            }      
      
      
          }
      }
 
     
 
     });

      
  this.Cancellations = data['Cancelledresponse']
  this.Cancellations.forEach(element => {
    var obj4 = Object();
    var date = new Date(element.Current_Time);
    var dates = date.getDate()
    var todaysDate = new Date();
    var todaysDates = todaysDate.getDate()
    if(dates  == todaysDates )
    {
      
      var obj_s = Object();
  
      if(element.BoatDetails.length !== 0){

      obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
      obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
      obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
      obj_s.start = element.start;
      obj_s.Boat_Id =  element.BoatDetails[0]._id;
      obj_s.end = element.end;
      obj_s.Booking_ID = element.Booking_ID;

      obj_s.Location_Name = element.BoatDetails[0].Location_Name;
      obj_s.Location_Id = element.BoatDetails[0].Location_Id;
      if(element.OwnerDetails.length !== 0){

        obj_s.First_Name = element.OwnerDetails[0].First_Name;
        obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
        obj_s.OwnerDetails = element.OwnerDetails[0];

      } 

       this.Cancels.push(obj_s);


      }     
           
    }


  });


    //Cancell ......02

    this.Cancellations.forEach(element => {
      var obj4 = Object();
      var date = new Date(element.Updated_time);
      var dates = date.getDate()
      var todaysDate = new Date();
      var todaysDates = todaysDate.getDate()
      if(dates  == todaysDates )
      {
            
        if(element.BoatDetails.length !== 0){
  
          
        
        if(element.BookingStatus == "Accepted"){
  
          var obj_s = Object();
          
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;
        obj_s.BookingStatus = element.BookingStatus;
        obj_s.Approved_LOA = element.Approved_LOA;
        obj_s.LOA = element.LOA;
  
        var boatnum = element.BoatDetails[0].Boat_Number;
  
        if (typeof boatnum !== "undefined" || boatnum != null){
         
          obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
        }
        else{
  
          obj_s.Boat_Number = 0;
          
  
        }
  
        obj_s._id = element._id;
        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
        
  
         this.Cancels_Second.push(obj_s);
  
  
        }
  
        else if(element.BookingStatus != "Accepted") 
        {
  
          var obj_s = Object();
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;
        obj_s.BookingStatus = element.BookingStatus;
        obj_s.Approved_LOA = element.Approved_LOA;
        obj_s.LOA = element.LOA;
  
        if (typeof element.BoatDetails[0].Boat_Number !== "undefined" || element.BoatDetails[0].Boat_Number != null){
          
          obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
        }
        else{
          
          obj_s.Boat_Number = 0;
  
        }
        
        obj_s._id = element._id;
        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
         this.Cancels_First.push(obj_s);
  
  
        }
  
        else
        {
  
          var obj_s = Object();
  
        obj_s.Boat_Image = element.BoatDetails[0].Boat_Image[0];
        obj_s.imgUrl = this.imgUrl + element.BoatDetails[0].Boat_Image[0];
        obj_s.Boat_Name = element.BoatDetails[0].Boat_Name;
        obj_s.start = element.start;
        obj_s.Boat_Id =  element.BoatDetails[0]._id;
        obj_s.end = element.end;
        obj_s.Booking_ID = element.Booking_ID;
        obj_s.BookingStatus = element.BookingStatus;
        obj_s.Approved_LOA = element.Approved_LOA;
        obj_s.LOA = element.LOA;
  
        if (typeof element.BoatDetails[0].Boat_Number !== "undefined" || element.BoatDetails[0].Boat_Number != null){
          obj_s.Boat_Number = element.BoatDetails[0].Boat_Number;
          
        }
        else{
          
          obj_s.Boat_Number = 0;
  
        }
        obj_s._id = element._id;
        obj_s.Location_Name = element.BoatDetails[0].Location_Name;
        obj_s.Location_Id = element.BoatDetails[0].Location_Id;
        if(element.OwnerDetails.length !== 0){
  
          obj_s.First_Name = element.OwnerDetails[0].First_Name;
          obj_s.Parking_Ability = element.OwnerDetails[0].Parking_Ability;
          obj_s.OwnerDetails = element.OwnerDetails[0];
  
        } 
  
         this.Cancels_Thread.push(obj_s);
  
  
        
  
        } 
        
        
  
  
      }     
        
        
        // obj4 = element       
        //     this.Cancels.push(obj4);
        
      }
  
  
    });
  


    //.......

     
    this.Location_Name_dropDown = loc.Boat_Location;   

  if(this.public_baotType_Single_id == null){

    this.newBooking = this.newBooking.filter(x => x.Location_Id == loc._id);
    this.todaysBooking = this.todaysBooking.filter(x => x.Location_Id == loc._id);

    this.Cancels_Thread = this.Cancels_Thread.filter(x => x.Location_Id == loc._id);
    this.Cancels_First = this.Cancels_First.filter(x => x.Location_Id == loc._id);
    this.Cancels_Second = this.Cancels_Second.filter(x => x.Location_Id == loc._id); 

    this.Cancels = this.Cancels.filter(x => x.Location_Id == loc._id);
    this.Stand_by_Booking = this.Stand_by_Booking.filter(x => x.Location_Id == loc._id);

  }
  else
  {

    this.newBooking = this.newBooking.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);
    this.todaysBooking = this.todaysBooking.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);
   
    this.Cancels_Thread = this.Cancels_Thread.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);
    this.Cancels_First = this.Cancels_First.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);
    this.Cancels_Second = this.Cancels_Second.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);
       
    this.Cancels = this.Cancels.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);
    this.Stand_by_Booking = this.Stand_by_Booking.filter(x => x.Location_Id == loc._id && x.Boat_Id == this.public_baotType_Single_id);


  }   

    this.New_Booking_Count = this.newBooking.length;
    this.Todays_Booking_Count = this.todaysBooking.length;
    this.Cancellations_Count = this.Cancels_Thread.length + this.Cancels_First.length + this.Cancels_Second.length;
    this.Stand_by_Booking_Count = this.Stand_by_Booking.length;



   }, err => {
   });
 
 
  }

  Stand_by_Booking_Accept(datas){    

    var obj = Object();
    obj._id = datas._Id;
    obj.action_todo = "Accept";       

    this.http.post<any>(`${this.url}/StandByBooking_AcceptReject`,  obj  ).subscribe(data => {
    
      if(data.status == true)
      {
        alert("Booking is Accepted");
        location.reload(); 
            
        
      }
      else if(data.status == false)
      {
        alert("No responce");

      }
        }, err => {

          alert(err.message);
         
        })


  }

 
  Stand_by_Booking_Reject(datas){
    
    var obj = Object();
    obj._id = datas._Id;
    obj.action_todo = "Reject";       

    this.http.post<any>(`${this.url}/StandByBooking_AcceptReject`,  obj  ).subscribe(data => {
    
      if(data.status == true)
      {
        alert("Booking is Reject");
        location.reload();      
        
      }
      else if(data.status == false)
      {
        alert("No responce");

      }
        }, err => {

          alert(err.message);
         
        })




  }

  pageRefresh(){
    location.reload();
  }

   Angular_string_to_Date_Convert(dateString){   

    var dateArray = dateString.split("/");
    var dateObj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
  
    return dateObj;

  }


}
