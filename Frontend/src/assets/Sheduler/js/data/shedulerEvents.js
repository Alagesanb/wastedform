

var public_URL = "http://65.2.28.16/api/Schedule/";



function generateNames() {
    var names = [];
    var i = 0;
    var length = chance.integer({min: 1, max: 10});

    for (; i < length; i += 1) {
        names.push("sibi_name_"+ i);
    }

    return names;
}


 function getFormattedDate(dateVal) {
    var newDate = new Date(dateVal);

    var sMonth = padValue(newDate.getMonth() + 1);
    var sDay = padValue(newDate.getDate());
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = padValue(newDate.getMinutes());
    var sAMPM = "AM";

    var iHourCheck = parseInt(sHour);

    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = "12";
    }

    sHour = padValue(sHour);

    return sDay + "-" + sMonth + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
}

function padValue(value) {
    return (value < 10) ? "0" + value : value;
}



function generateRandomSchedule(val){
    var pageIdentiFication = sessionStorage.getItem("pageIdentiFiction");
    if(pageIdentiFication == "AdminBooking"){

        var schedule = new ScheduleInfo();

        if(val.User_RoleType == "Admin")
        {
            
            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);
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
            schedule.bgColor = "#047b0f";
            schedule.dragBgColor = "#047b0f";
            schedule.borderColor = "#047b0f";
            ScheduleList.push(schedule);

        }
        else if(val.User_RoleType == "Owner")
        {
        
            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);;
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
            ScheduleList.push(schedule);

        }
        else if(val.User_RoleType == "Maintenance")
        {

            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);;
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
            ScheduleList.push(schedule);
        }

        

    }
    else if(pageIdentiFication == "book-for-owner"){

        var schedule = new ScheduleInfo();
        if(val.User_RoleType == "Owner")
        {

            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);
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
            schedule.bgColor = "#047b0f";
            schedule.dragBgColor = "#047b0f";
            schedule.borderColor = "#047b0f";
            ScheduleList.push(schedule);

        }
        else if(val.User_RoleType == "Admin")
        {
        
            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);
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
            ScheduleList.push(schedule);

        }
        else if(val.User_RoleType == "Maintenance")
        {

            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);
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
            ScheduleList.push(schedule);
        }

    }
    else if(pageIdentiFication == "boat-maintenance"){
        var schedule = new ScheduleInfo();
        if(val.User_RoleType == "Admin")
        {

            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);
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
            schedule.bgColor = "#047b0f";
            schedule.dragBgColor = "#047b0f";
            schedule.borderColor = "#047b0f";
            ScheduleList.push(schedule);

        }
        else if(val.User_RoleType == "Owner")
        {
        
            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);
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
            ScheduleList.push(schedule);

        }
        else if(val.User_RoleType == "Maintenance")
        {

            schedule.id = val._id;//chance.guid();
            //schedule.calendarId = calendar.id;
            schedule.title = val.title +" "+ getFormattedDate(val.start)+ " to " + getFormattedDate(val.end);
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
            ScheduleList.push(schedule);
        }

    }


   

}


function generateSchedule_old() {   
    
    ScheduleList = [];
    var calendar = Object();
    calendar.bgColor = "#047b0f";
    calendar.borderColor = "#047b0f";
    //calendar.checked = true;
    calendar.color = "#ffffff";
    calendar.dragBgColor = "#047b0f";
   // calendar.id = "1";
   // calendar.name = "My Calendar";

    var renderStart = new Date("Sat May 08 2021 00:00:00 GMT+0530 (India Standard Time)");
var renderEnd = new Date("Sat May 10 2021 00:00:00 GMT+0530 (India Standard Time)");


    generateRandomSchedule(calendar, renderStart, renderEnd);  
    
    console.log(ScheduleList);
    

}

function generateRandomSchedule_old(calendar, renderStart, renderEnd) {
    var schedule = new ScheduleInfo();

    schedule.id = chance.guid();
    schedule.calendarId = calendar.id;
    schedule.title = "sibi test Title";//chance.sentence({words: 3});
    schedule.body = true;//chance.bool({likelihood: 20}) ? chance.sentence({words: 10}) : '';
    schedule.isReadOnly = false;//chance.bool({likelihood: 20});

    schedule.isAllday = true;//chance.bool({likelihood: 30});
    schedule.category = 'allday';

    schedule.start = renderStart;
    schedule.end = renderEnd;    

    schedule.isAllday  = true;
    schedule.isFocused = false;
    schedule.isPending = false;
    schedule.isVisible = true;

   // schedule.category = 'allday';
    schedule.dueDateClass = 'morning';
    //schedule.category = 'time';

    schedule.isPrivate = true;//chance.bool({likelihood: 10});
    
    schedule.location = "Sibi_TestLocation";//chance.address();

    var attendees_arry = generateNames();

    schedule.attendees = attendees_arry; //chance.bool({likelihood: 70}) ? generateNames() : [];
    schedule.recurrenceRule = "sibi_recurrenceRule"; //chance.bool({likelihood: 20}) ? 'repeated events' : '';
    schedule.state = true;//chance.bool({likelihood: 20}) ? 'Free' : 'Busy';
    schedule.color = calendar.color;
    schedule.bgColor = calendar.bgColor;
    schedule.dragBgColor = calendar.dragBgColor;
    schedule.borderColor = calendar.borderColor;

    /*

    if (schedule.category === 'milestone') {
        schedule.color = schedule.bgColor;
        schedule.bgColor = 'transparent';
        schedule.dragBgColor = 'transparent';
        schedule.borderColor = 'transparent';
    }
    */
/*
    schedule.raw.memo = "raw_memo";//chance.sentence();
    schedule.raw.creator.name = "raw_creator_name";//chance.name();
    schedule.raw.creator.avatar = "raw_creator_avatar";//chance.avatar();
    schedule.raw.creator.company = "raw_creator_company";//chance.company();
    schedule.raw.creator.email = "raw_creator_email"; //chance.email();
    schedule.raw.creator.phone = "raw_creator_phone";//chance.phone();

    if (chance.bool({ likelihood: 20 })) {
        
        var travelTime = chance.minute();
        schedule.goingDuration = "13";//travelTime;
        schedule.comingDuration = "13";//travelTime;
    }
    */

    ScheduleList.push(schedule);
}

function ConvertUTCTimeToLocalTime(UTCDateString)
    {
        var convertdLocalTime = new Date(UTCDateString);

        var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

        convertdLocalTime.setHours( convertdLocalTime.getHours() + hourOffset ); 

        return convertdLocalTime;
    }

    
    //data-schedule-id
    var public_shedulDataId = 0;

    
    $(document).on("click",".tui-full-calendar-weekday-schedule",function() {
        
       var currentId = $(this).attr('data-schedule-id');
       public_shedulDataId = currentId;

    });

    $(document).on("click",".tui-full-calendar-popup-delete",function() {
       
        
        var pageIdentiFication = sessionStorage.getItem("pageIdentiFiction");
        var roletype = null;
        if(pageIdentiFication == "AdminBooking"){

            roletype = "Admin";

        }
        else if(pageIdentiFication == "book-for-owner"){

            roletype = "Owner";
        }
        else if(pageIdentiFication == "boat-maintenance"){

            roletype = "Maintenance";

        }

        if(roletype != null){

            var obj = Object();
        obj._id = public_shedulDataId;
        obj.User_RoleType = roletype;

        $.ajax({
            url: public_URL+"DeleteSchedule",
            type: 'POST',
            dataType: 'json', 
            data: obj,
            success: function(datas) {
               
                //
                if(datas.status == true)
                {
                    alert(datas.message);
                    location.reload();    
                }
                else if(datas.status == false)
                {
                    alert(datas.message);                     
                }

               
    
             },
             error: function (error) {          
                       
              }
        });

        }
        else{
            alert("Page error.");
            location.reload();

        }

        

    });

    //tui-full-calendar-popup-delete


$(document).on("click",".tui-full-calendar-popup-save",function() { 
        
    //var ssss = public_shedulDataId;
  
    var pageIdentiFication = sessionStorage.getItem("pageIdentiFiction");
    if(pageIdentiFication == "AdminBooking")
    {

            var checkController = $('.tui-full-calendar-popup-save').children('span').first().text();
            
            var dataGet_AdminSelectBoat = sessionStorage.getItem("AdminSelectBoat");
            if (typeof dataGet_AdminSelectBoat !== "undefined" && dataGet_AdminSelectBoat != null)
            {
                
                dataGet_AdminSelectBoat = JSON.parse(dataGet_AdminSelectBoat);
                var setTitle = "Admin (" + dataGet_AdminSelectBoat.Boat_Name+")";

                    if(checkController == "Save"){    

                    var startdate_date = new Date($("#tui-full-calendar-schedule-start-date").val());
                    var enddate_date = new Date( $("#tui-full-calendar-schedule-end-date").val());
                    var start_str =startdate_date .toString();
                    var end_str = enddate_date.toString();    
                    var AdminId_get = sessionStorage.getItem("UserId");
                    
                    // day calculations.....
                        const Temp_Date_start = new Date(startdate_date);                        
                        const Temp_Date_end = new Date(enddate_date);
                        var Temp_Date_dateDiff= Math.round((Temp_Date_end - Temp_Date_start)/(1000*60*60*24));
                        var Temp_Date_Winter_dateDiff = Temp_Date_dateDiff+1;
                        const Temp_Date_sundays = Math.floor((Temp_Date_Winter_dateDiff + (Temp_Date_start.getDay() + 6) % 7) / 7);
                        const Temp_Date_weekenddays = 2 * Temp_Date_sundays + (Temp_Date_end.getDay()==6) - (Temp_Date_start.getDay()==0);                        
                        const Temp_Date_weekdays = Temp_Date_Winter_dateDiff - Temp_Date_weekenddays;

                        

                    // ...................  
                        var obj = Object();

                        obj.TotalDay_Count = Temp_Date_dateDiff;
                        obj.WeekEnd_Count = Temp_Date_weekenddays;
                        obj.WeekDay_Count = Temp_Date_weekdays;
                    
                        obj.User_RoleType = "Admin";
                        obj.User_Id = AdminId_get;
                        obj.Admin_Id = AdminId_get;

                        obj.Boat_Id = dataGet_AdminSelectBoat._id;
                        obj.Boat_Name = dataGet_AdminSelectBoat.Boat_Name;
                    
                        obj.title = setTitle;
                        obj.body = true;
                        obj.start = start_str;
                        obj.end = end_str;
                        obj.goingDuration ="";
                        obj.comingDuration ="";
                        obj.isAllDay = true;
                        obj.category = "allday";
                        obj.dueDateClass = "morning";
                        obj.location = ""; 
                        //obj.attendees = "false"; // this is string arry..
                        obj.recurrenceRule = ""; //string..
                        obj.isPending = false;
                        obj.isFocused = false;
                        obj.isVisible = true;
                        obj.isReadOnly = false;
                        obj.isPrivate = true;
                        obj.color = "#ffffff";
                        obj.bgColor = "#047b0f";
                        obj.dragBgColor = "#047b0f";
                        obj.borderColor = "#047b0f";
                        obj.customStyle ="";
                        obj.raw ="";
                        obj.state ="";
                        obj.Status = "Enable";
                        obj.IsActive = true;
                    
                        $.ajax({
                            url: public_URL+"AddSchedule",
                            type: 'POST',
                            dataType: 'json', 
                            data: obj,
                            success: function(datas) {
                               
                                if(datas.status == true)
                                {
                                    alert(datas.message);
                                    location.reload();
                    
                                }
                                else if(datas.status == false){
                                    
                                    alert(datas.message);                                   
                    
                                }
                                
                            
                    
                            },
                            error: function (error) {          
                                           
                            }
                        });

                
                
                    }
                    else if(checkController == "Update"){

                        var startdate_date = new Date($("#tui-full-calendar-schedule-start-date").val());
                        var enddate_date = new Date( $("#tui-full-calendar-schedule-end-date").val());
                        var start_str =startdate_date .toString();
                        var end_str = enddate_date.toString();    
                        var AdminId_get = sessionStorage.getItem("UserId");
                        
                        // day calculations.....
                        const Temp_Date_start = new Date(startdate_date);                        
                        const Temp_Date_end = new Date(enddate_date);
                        var Temp_Date_dateDiff= Math.round((Temp_Date_end - Temp_Date_start)/(1000*60*60*24));
                        var Temp_Date_Winter_dateDiff = Temp_Date_dateDiff+1;
                        const Temp_Date_sundays = Math.floor((Temp_Date_Winter_dateDiff + (Temp_Date_start.getDay() + 6) % 7) / 7);
                        const Temp_Date_weekenddays = 2 * Temp_Date_sundays + (Temp_Date_end.getDay()==6) - (Temp_Date_start.getDay()==0);                        
                        const Temp_Date_weekdays = Temp_Date_Winter_dateDiff - Temp_Date_weekenddays;

                        
                    // ...................  
                        var obj = Object();

                        obj.TotalDay_Count = Temp_Date_dateDiff;
                        obj.WeekEnd_Count = Temp_Date_weekenddays;
                        obj.WeekDay_Count = Temp_Date_weekdays;
                                                
                        obj._id = public_shedulDataId;
                        obj.User_RoleType = "Admin";
                        obj.User_Id = AdminId_get;
                        obj.Admin_Id = AdminId_get;

                        obj.Boat_Id = dataGet_AdminSelectBoat._id;
                        obj.Boat_Name = dataGet_AdminSelectBoat.Boat_Name;
                    
                        obj.title = setTitle;
                        obj.body = true;
                        obj.start = start_str;
                        obj.end = end_str;
                        obj.goingDuration ="";
                        obj.comingDuration ="";
                        obj.isAllDay = true;
                        obj.category = "allday";
                        obj.dueDateClass = "morning";
                        obj.location = ""; 
                        //obj.attendees = "false"; // this is string arry..
                        obj.recurrenceRule = ""; //string..
                        obj.isPending = false;
                        obj.isFocused = false;
                        obj.isVisible = true;
                        obj.isReadOnly = false;
                        obj.isPrivate = true;
                        obj.color = "#ffffff";
                        obj.bgColor = "#047b0f";
                        obj.dragBgColor = "#047b0f";
                        obj.borderColor = "#047b0f";
                        obj.customStyle ="";
                        obj.raw ="";
                        obj.state ="";
                        obj.Status = "Enable";
                        obj.IsActive = true;
                        $.ajax({
                            url: public_URL+"EditSchedule",
                            type: 'POST',
                            dataType: 'json', 
                            data: obj,
                            success: function(datas) {
                                if(datas.status == true)
                                {
                                    alert(datas.message);
                                    location.reload();

                                }
                                else if(datas.status == false){
                                    
                                    alert(datas.message);                                   
                    
                                }
                            

                            },
                            error: function (error) {          
                                        
                            }
                        });

                    
                    }

            }
            else{
                alert("select BOAT NAME");
            }
    }
    else if(pageIdentiFication == "book-for-owner"){

        var checkController = $('.tui-full-calendar-popup-save').children('span').first().text();
            
        var dataGet_AdminSelectBoat = sessionStorage.getItem("AdminSelectBoat");
        var dataSelected_OwnerDropDown = sessionStorage.getItem("Owner_SelectOwner");
        if ((typeof dataGet_AdminSelectBoat !== "undefined" && dataGet_AdminSelectBoat != null) 
           &&(typeof dataSelected_OwnerDropDown !== "undefined" && dataSelected_OwnerDropDown != null) )
        {
           
            dataSelected_OwnerDropDown = JSON.parse(dataSelected_OwnerDropDown);
            dataGet_AdminSelectBoat = JSON.parse(dataGet_AdminSelectBoat);
            var setTitle = dataSelected_OwnerDropDown.First_Name  + "(" + dataGet_AdminSelectBoat.Boat_Name+")";

            

                if(checkController == "Save"){    

                var startdate_date = new Date($("#tui-full-calendar-schedule-start-date").val());
                var enddate_date = new Date( $("#tui-full-calendar-schedule-end-date").val());
                var start_str =startdate_date .toString();
                var end_str = enddate_date.toString();    
                var AdminId_get = sessionStorage.getItem("UserId");
                    
                    
                    // day calculations.....
                    const Temp_Date_start = new Date(startdate_date);                        
                    const Temp_Date_end = new Date(enddate_date);
                    var Temp_Date_dateDiff= Math.round((Temp_Date_end - Temp_Date_start)/(1000*60*60*24));
                    var Temp_Date_Winter_dateDiff = Temp_Date_dateDiff+1;
                    const Temp_Date_sundays = Math.floor((Temp_Date_Winter_dateDiff + (Temp_Date_start.getDay() + 6) % 7) / 7);
                    const Temp_Date_weekenddays = 2 * Temp_Date_sundays + (Temp_Date_end.getDay()==6) - (Temp_Date_start.getDay()==0);                        
                    const Temp_Date_weekdays = Temp_Date_Winter_dateDiff - Temp_Date_weekenddays;

                    
                // ...................  
                    var obj = Object();

                    obj.TotalDay_Count = Temp_Date_dateDiff;
                    obj.WeekEnd_Count = Temp_Date_weekenddays;
                    obj.WeekDay_Count = Temp_Date_weekdays;
                
                    obj.User_RoleType = "Owner";
                    obj.User_Id = AdminId_get;
                    obj.Admin_Id = AdminId_get;

                    obj.Boat_Id = dataGet_AdminSelectBoat._id;
                    obj.Boat_Name = dataGet_AdminSelectBoat.Boat_Name;
                
                    obj.title = setTitle;
                    obj.body = true;
                    obj.start = start_str;
                    obj.end = end_str;
                    obj.goingDuration ="";
                    obj.comingDuration ="";
                    obj.isAllDay = true;
                    obj.category = "allday";
                    obj.dueDateClass = "morning";
                    obj.location = ""; 
                    //obj.attendees = "false"; // this is string arry..
                    obj.recurrenceRule = ""; //string..
                    obj.isPending = false;
                    obj.isFocused = false;
                    obj.isVisible = true;
                    obj.isReadOnly = false;
                    obj.isPrivate = true;
                    obj.color = "#ffffff";
                    obj.bgColor = "#D50000";
                    obj.dragBgColor = "#D50000";
                    obj.borderColor = "#D50000";
                    obj.customStyle ="";
                    obj.raw ="";
                    obj.state ="";
                    obj.Status = "Enable";
                    obj.IsActive = true;
                
                    $.ajax({
                        url: public_URL+"AddSchedule",
                        type: 'POST',
                        dataType: 'json', 
                        data: obj,
                        success: function(datas) {
                           
                            if(datas.status == true)
                            {

                                alert(datas.message);
                                location.reload();
                
                            }
                            else if(datas.status == false)
                            {
                                
                                alert(datas.message);
                                //location.reload();
                
                            }
                        
                
                        },
                        error: function (error) {          
                                       
                        }
                    });

            
            
                }
                else if(checkController == "Update"){

                    var startdate_date = new Date($("#tui-full-calendar-schedule-start-date").val());
                    var enddate_date = new Date( $("#tui-full-calendar-schedule-end-date").val());
                    var start_str =startdate_date .toString();
                    var end_str = enddate_date.toString();    
                    var AdminId_get = sessionStorage.getItem("UserId");
                    
                    // day calculations.....
                    const Temp_Date_start = new Date(startdate_date);                        
                    const Temp_Date_end = new Date(enddate_date);
                    var Temp_Date_dateDiff= Math.round((Temp_Date_end - Temp_Date_start)/(1000*60*60*24));
                    var Temp_Date_Winter_dateDiff = Temp_Date_dateDiff+1;
                    const Temp_Date_sundays = Math.floor((Temp_Date_Winter_dateDiff + (Temp_Date_start.getDay() + 6) % 7) / 7);
                    const Temp_Date_weekenddays = 2 * Temp_Date_sundays + (Temp_Date_end.getDay()==6) - (Temp_Date_start.getDay()==0);                        
                    const Temp_Date_weekdays = Temp_Date_Winter_dateDiff - Temp_Date_weekenddays;

                   
                // ...................  
                    var obj = Object();

                    obj.TotalDay_Count = Temp_Date_dateDiff;
                    obj.WeekEnd_Count = Temp_Date_weekenddays;
                    obj.WeekDay_Count = Temp_Date_weekdays;
                    
                    obj._id = public_shedulDataId;
                    obj.User_RoleType = "Owner";
                    obj.User_Id = AdminId_get;
                    obj.Admin_Id = AdminId_get;

                    obj.Boat_Id = dataGet_AdminSelectBoat._id;
                    obj.Boat_Name = dataGet_AdminSelectBoat.Boat_Name;
                
                    obj.title = setTitle;
                    obj.body = true;
                    obj.start = start_str;
                    obj.end = end_str;
                    obj.goingDuration ="";
                    obj.comingDuration ="";
                    obj.isAllDay = true;
                    obj.category = "allday";
                    obj.dueDateClass = "morning";
                    obj.location = ""; 
                    //obj.attendees = "false"; // this is string arry..
                    obj.recurrenceRule = ""; //string..
                    obj.isPending = false;
                    obj.isFocused = false;
                    obj.isVisible = true;
                    obj.isReadOnly = false;
                    obj.isPrivate = true;
                    obj.color = "#ffffff";
                    obj.bgColor = "#047b0f";
                    obj.dragBgColor = "#047b0f";
                    obj.borderColor = "#047b0f";
                    obj.customStyle ="";
                    obj.raw ="";
                    obj.state ="";
                    obj.Status = "Enable";
                    obj.IsActive = true;
                    $.ajax({
                        url: public_URL+"EditSchedule",
                        type: 'POST',
                        dataType: 'json', 
                        data: obj,
                        success: function(datas) {
                            if(datas.status == true)
                            {
                                alert(datas.message);
                                location.reload();

                            }
                            else if(datas.status == false){
                                    
                                alert(datas.message);                                   
                
                            }
                        

                        },
                        error: function (error) {          
                                    
                        }
                    });

                
                }

        }
        else{
            alert("select BOAT NAME");
        }

    }
    else if(pageIdentiFication == "boat-maintenance"){

        var checkController = $('.tui-full-calendar-popup-save').children('span').first().text();
            
         var dataGet_AdminSelectBoat = sessionStorage.getItem("AdminSelectBoat");
         if (typeof dataGet_AdminSelectBoat !== "undefined" && dataGet_AdminSelectBoat != null)
         {
             
             dataGet_AdminSelectBoat = JSON.parse(dataGet_AdminSelectBoat);
             var setTitle = "Maintenance (" + dataGet_AdminSelectBoat.Boat_Name+")";
            
 
                 if(checkController == "Save"){    
 
                 var startdate_date = new Date($("#tui-full-calendar-schedule-start-date").val());
                 var enddate_date = new Date( $("#tui-full-calendar-schedule-end-date").val());
                 var start_str =startdate_date .toString();
                 var end_str = enddate_date.toString();    
                 var AdminId_get = sessionStorage.getItem("UserId");
                     
                     // day calculations.....
                     const Temp_Date_start = new Date(startdate_date);                        
                     const Temp_Date_end = new Date(enddate_date);
                     var Temp_Date_dateDiff= Math.round((Temp_Date_end - Temp_Date_start)/(1000*60*60*24));
                     var Temp_Date_Winter_dateDiff = Temp_Date_dateDiff+1;
                     const Temp_Date_sundays = Math.floor((Temp_Date_Winter_dateDiff + (Temp_Date_start.getDay() + 6) % 7) / 7);
                     const Temp_Date_weekenddays = 2 * Temp_Date_sundays + (Temp_Date_end.getDay()==6) - (Temp_Date_start.getDay()==0);                        
                     const Temp_Date_weekdays = Temp_Date_Winter_dateDiff - Temp_Date_weekenddays;

                     
                 // ...................  
                     var obj = Object();

                     obj.TotalDay_Count = Temp_Date_dateDiff;
                     obj.WeekEnd_Count = Temp_Date_weekenddays;
                     obj.WeekDay_Count = Temp_Date_weekdays;
                 
                     obj.User_RoleType = "Maintenance";
                     obj.User_Id = AdminId_get;
                     obj.Admin_Id = AdminId_get;

                     obj.Boat_Id = dataGet_AdminSelectBoat._id;
                     obj.Boat_Name = dataGet_AdminSelectBoat.Boat_Name;
                 
                     obj.title = setTitle;
                     obj.body = true;
                     obj.start = start_str;
                     obj.end = end_str;
                     obj.goingDuration ="";
                     obj.comingDuration ="";
                     obj.isAllDay = true;
                     obj.category = "allday";
                     obj.dueDateClass = "morning";
                     obj.location = ""; 
                     //obj.attendees = "false"; // this is string arry..
                     obj.recurrenceRule = ""; //string..
                     obj.isPending = false;
                     obj.isFocused = false;
                     obj.isVisible = true;
                     obj.isReadOnly = false;
                     obj.isPrivate = true;
                     obj.color = "#ffffff";
                     obj.bgColor = "#2c46f8";
                     obj.dragBgColor = "#2c46f8";
                     obj.borderColor = "#2c46f8";
                     obj.customStyle ="";
                     obj.raw ="";
                     obj.state ="";
                     obj.Status = "Enable";
                     obj.IsActive = true;
                 
                     $.ajax({
                         url: public_URL+"AddSchedule",
                         type: 'POST',
                         dataType: 'json', 
                         data: obj,
                         success: function(datas) {
                             if(datas.status == true)
                             {
                                 alert(datas.message);
                                 location.reload();
                 
                             }
                             else if(datas.status == false){
                                    
                                alert(datas.message);                                   
                
                            }
                         
                 
                         },
                         error: function (error) {          
                                        
                         }
                     });
 
             
             
                 }
                 else if(checkController == "Update"){
 
                     var startdate_date = new Date($("#tui-full-calendar-schedule-start-date").val());
                     var enddate_date = new Date( $("#tui-full-calendar-schedule-end-date").val());
                     var start_str =startdate_date.toString();
                     var end_str = enddate_date.toString();    
                     var AdminId_get = sessionStorage.getItem("UserId");
                     
                     // day calculations.....
                     const Temp_Date_start = new Date(startdate_date);                        
                     const Temp_Date_end = new Date(enddate_date);
                     var Temp_Date_dateDiff= Math.round((Temp_Date_end - Temp_Date_start)/(1000*60*60*24));
                     var Temp_Date_Winter_dateDiff = Temp_Date_dateDiff+1;
                     const Temp_Date_sundays = Math.floor((Temp_Date_Winter_dateDiff + (Temp_Date_start.getDay() + 6) % 7) / 7);
                     const Temp_Date_weekenddays = 2 * Temp_Date_sundays + (Temp_Date_end.getDay()==6) - (Temp_Date_start.getDay()==0);                        
                     const Temp_Date_weekdays = Temp_Date_Winter_dateDiff - Temp_Date_weekenddays;

                     
                 // ...................  
                     var obj = Object();

                     obj.TotalDay_Count = Temp_Date_dateDiff;
                     obj.WeekEnd_Count = Temp_Date_weekenddays;
                     obj.WeekDay_Count = Temp_Date_weekdays;
                     
                     obj._id = public_shedulDataId;
                     obj.User_RoleType = "Maintenance";
                     obj.User_Id = AdminId_get;
                     obj.Admin_Id = AdminId_get;

                     obj.Boat_Id = dataGet_AdminSelectBoat._id;
                     obj.Boat_Name = dataGet_AdminSelectBoat.Boat_Name;
                 
                     obj.title = setTitle;
                     obj.body = true;
                     obj.start = start_str;
                     obj.end = end_str;
                     obj.goingDuration ="";
                     obj.comingDuration ="";
                     obj.isAllDay = true;
                     obj.category = "allday";
                     obj.dueDateClass = "morning";
                     obj.location = ""; 
                     //obj.attendees = "false"; // this is string arry..
                     obj.recurrenceRule = ""; //string..
                     obj.isPending = false;
                     obj.isFocused = false;
                     obj.isVisible = true;
                     obj.isReadOnly = false;
                     obj.isPrivate = true;
                     obj.color = "#ffffff";
                     obj.bgColor = "#2c46f8";
                     obj.dragBgColor = "#2c46f8";
                     obj.borderColor = "#2c46f8";
                     obj.customStyle ="";
                     obj.raw ="";
                     obj.state ="";
                     obj.Status = "Enable";
                     obj.IsActive = true;
                     $.ajax({
                         url: public_URL+"EditSchedule",
                         type: 'POST',
                         dataType: 'json', 
                         data: obj,
                         success: function(datas) {
                             if(datas.status == true)
                             {
                                 alert(datas.message);
                                 location.reload();
 
                             }
                             else if(datas.status == false){
                                    
                                alert(datas.message);                                   
                
                            }
                         
 
                         },
                         error: function (error) {          
                                     
                         }
                     });
 
                 
                 }
 
         }
         else{
             alert("select BOAT NAME");
         }
 

    }


});



