// import environment for schedule event Done By Alagesan	on 06.07.2021
//import { environment } from '../../environments/environment';

// Add Base URL for schedule event  Done By Alagesan	on 06.07.2021
//EnvironmentURL:string = environment.url;
/*
// DO NOT CHANGE THE URL - SIBI
*/
var public_URL = "http://65.2.28.16/api/Schedule/";

var public_Day_URL = "http://65.2.28.16/api/Days/";

var public_StandByBooking = "http://65.2.28.16/api/StandByBooking/";

var public_shedulDataId = 0;

function getFormattedDate_WithOut_Zero_Time(dateVal) {
    var newDate = new Date(dateVal);

    var sMonth = padValue(newDate.getMonth() + 1);
    var sDay = padValue(newDate.getDate());
    var sYear = newDate.getFullYear();  
    
    return sDay + "-" + sMonth + "-" + sYear;
}

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

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

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

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

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

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

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

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;           

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

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

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

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

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

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

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

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

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

            schedule.Boat_Id = val.Boat_Id;
            schedule.Boat_Name = val.Boat_Name;

            schedule.Owner_Id = val.User_Id;  

            ScheduleList.push(schedule);
        }

    }
    else if(pageIdentiFication == "view-boat"){

        var boatdats = JSON.parse(sessionStorage.getItem("boatData"));
        if (typeof boatdats !== "undefined" && boatdats != null) {

            if(val.Boat_Id == boatdats._id){

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
                    schedule.color = "#fff";
                    schedule.bgColor = "#047b0f";
                    schedule.dragBgColor = "#047b0f";
                    schedule.borderColor = "#047b0f";
        
                    schedule.Boat_Id = val.Boat_Id;
                    schedule.Boat_Name = val.Boat_Name;
        
                    schedule.Owner_Id = val.User_Id;           
        
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
                    schedule.color = "#fff";
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
                    schedule.color = "#fff";
                    schedule.bgColor = "#2c46f8";
                    schedule.dragBgColor = "#2c46f8";
                    schedule.borderColor = "#2c46f8";
        
                    schedule.Boat_Id = val.Boat_Id;
                    schedule.Boat_Name = val.Boat_Name;
        
                    schedule.Owner_Id = val.User_Id;  
        
                    ScheduleList.push(schedule);
                }

            }
            
        }
        else{
            alert("Empty_Boat......");
        }

       

    }
    else if(pageIdentiFication == "owner-dashboard-Reservation"){

        var owner_drp_Id = JSON.parse(sessionStorage.getItem("Ownerlogin"));
        var owner_boats_OwnerLog = JSON.parse(sessionStorage.getItem("Owner_pg_boatListed"));

        if((typeof owner_drp_Id !== "undefined" && owner_drp_Id != null) && 
           (typeof owner_boats_OwnerLog !== "undefined" && owner_boats_OwnerLog != null))
        {
            var conditionChek = owner_boats_OwnerLog.find(x => x._id == val.Boat_Id);
            if(typeof conditionChek !== "undefined" && conditionChek != null)
            {
                var schedule = new ScheduleInfo();
                if(val.User_RoleType == "Owner")
                {
                    if(owner_drp_Id._id == val.User_Id)
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
    
                        schedule.Boat_Id = val.Boat_Id;
                        schedule.Boat_Name = val.Boat_Name;
    
                        schedule.Owner_Id = val.User_Id;           
    
                        ScheduleList.push(schedule);

                    }
                    else
                    {
                        schedule.id = val._id;//chance.guid();
                        //schedule.calendarId = calendar.id;
                        schedule.title = "";
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

                   

                }
                else if(val.User_RoleType == "Admin")
                {
                
                    schedule.id = val._id;//chance.guid();
                    //schedule.calendarId = calendar.id;
                    schedule.title = "";
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

                    schedule.id = val._id;//chance.guid();
                    //schedule.calendarId = calendar.id;
                    schedule.title = "";
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
            }

        }
        else{
            alert("Owner details empty or Boat Empty");
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
   
    $(document).on("click",".tui-full-calendar-weekday-schedule",function() {
       
       var currentId = $(this).attr('data-schedule-id');         
        sessionStorage.setItem("view-Booking-id",currentId);
       public_shedulDataId = currentId;

    });

    $(document).on("click",".tui-full-calendar-popup-eye",function() {

         // document.location.href="/booking-details/"; 
         // Booking page open new tab for sheduler page //Done By Alagesan on 14.06.2021	
         window.open("/booking-details/");
         var currentId = $(this).attr('data-schedule-id');          
         sessionStorage.setItem("view-Booking-id",currentId);
         public_shedulDataId = currentId;
 
     });

     ////delete........sheduler......
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

    //$(document).on("click",".tui-full-calendar-popup-delete",function() {

        // Not accessing Id ...Pending work...

        //alert("sorry delete not allowed (popup) only for  display calendar items");

   // });


    //tui-full-calendar-month-more-schedule tui-full-calendar-month-more-allday tui-full-calendar-weekday-schedule-title
//public_shedulDataId

    //delete.....End

    function getAllDates(startDate, stopDate) {          
        var dateArray =[];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(currentDate);
            var ddd = new Date(currentDate);
            var currentDate = new Date(ddd.setDate(ddd.getDate() + 1)); 
        }
        return dateArray;
    }

  function GetAllUnAvailableDays_settings(obj){

         
        var datas = JSON.parse(sessionStorage.getItem("GetAllUnAvailableDays_Owners"));         
            //
        if (typeof datas !== "undefined" && datas != null) 
        {

            if(datas.status == true)
            {
            var startDate = new Date(obj.start);
            var stopDate = new Date(obj.end);
            var temp_res = datas.response[0];            
            var temp_unAvilable = []; 
            
            if (typeof temp_res !== "undefined" && temp_res != null) 
            {
                $.each(temp_res.UnAvailableDates, function(index, val) {                
                    var str_tmp = new Date(val);
                    temp_unAvilable.push(getFormattedDate_WithOut_Zero_Time(str_tmp));               
                }); 
                
                
    
                var allDate =  getAllDates(startDate, stopDate);
                var FirstChek = 0;
                var Confirm_StartDate = null;
                var ConFirm_EndDate = null;            
                $.each(allDate, function(index, val) {               
                    if(FirstChek == 0)
                    {
                        var tmp_values = getFormattedDate_WithOut_Zero_Time(val);
                                           
                        if(jQuery.inArray(tmp_values, temp_unAvilable) !== -1) {  
                             //console.log("is in array");                        
                            alert("This date ( "+tmp_values+" ) is unavilable");
                            return false;
                        } else {
                            //console.log("is NOT in array");
                            Confirm_StartDate = val; 
                        }                   
                        
                        FirstChek = 1;
                    }
                    else{
    
                        var tmp_values = getFormattedDate_WithOut_Zero_Time(val);
                                                            
                        if(jQuery.inArray(tmp_values, temp_unAvilable) !== -1) {
                            //console.log("is in array");
                            alert("This date ( "+tmp_values+" ) is unavilable");
                            return false;
                        } else {
                            //console.log("is NOT in array");
                            ConFirm_EndDate = val; 
                        }                      
    
                    }               
    
                });
    
    
                    if(Confirm_StartDate != null && ConFirm_EndDate != null)
                    {
                       
                        obj.start = Confirm_StartDate;
                        obj.end = ConFirm_EndDate;
                        //AddSchedule_ApiCalling(obj); 
                       // GetUnAvailabeDaysOfBoats_Owner(obj);                   
                       var datas_2 = JSON.parse(sessionStorage.getItem("GetUnAvailabeDaysOfBoats_Owners"));         
                       var data_2_boat = JSON.parse(sessionStorage.getItem("AdminSelectBoat"));                        
                            if ((typeof datas_2 !== "undefined" && datas_2 != null) && 
                                (typeof data_2_boat !== "undefined" && data_2_boat != null) ) 
                                {
                                
                                 var temp_unAvilable_Boats = [];                             
                                 var tmp_Unavilable = datas_2.find(x => x.Boat_Id == data_2_boat._id);
    
                                 if(typeof tmp_Unavilable !== "undefined" && tmp_Unavilable != null){
    
                                    $.each(tmp_Unavilable.UnAvailableDates, function(index, val2) {                              
                                        var str_tmp = new Date(val2);
                                        temp_unAvilable_Boats.push(getFormattedDate_WithOut_Zero_Time(str_tmp));               
                                     });                              
                                     //var aaa = temp_unAvilable_Boats;
        
                                     var allDate =  getAllDates(obj.start, obj.end);
                                    var FirstChek = 0;
                                    var Confirm_StartDate = null;
                                    var ConFirm_EndDate = null;            
                                    $.each(allDate, function(index, val) {               
                                        if(FirstChek == 0)
                                        {
                                            var tmp_values = getFormattedDate_WithOut_Zero_Time(val);
                                                            
                                            if(jQuery.inArray(tmp_values, temp_unAvilable_Boats) !== -1) {  
                                                //console.log("is in array");                        
                                                alert("This date ( "+tmp_values+" ) is unavilable");
                                                return false;
                                            } else {
                                                //console.log("is NOT in array");
                                                Confirm_StartDate = val; 
                                            }                   
                                            
                                            FirstChek = 1;
                                        }
                                        else{
        
                                            var tmp_values = getFormattedDate_WithOut_Zero_Time(val);
                                                                                
                                            if(jQuery.inArray(tmp_values, temp_unAvilable_Boats) !== -1) {
                                                //console.log("is in array");
                                                alert("This date ( "+tmp_values+" ) is unavilable");
                                                return false;
                                            } else {
                                                //console.log("is NOT in array");
                                                ConFirm_EndDate = val; 
                                            }                      
        
                                        }               
        
                                    });
                                   
                                    obj.start = Confirm_StartDate;
                                    obj.end = ConFirm_EndDate;
        
                                    AddSchedule_ApiCalling(obj);
    
                                 }
                                 else{
    
                                    AddSchedule_ApiCalling(obj);
    
                                 }
                                 
                                
    
                               
    
                            }
                            else{
    
                                AddSchedule_ApiCalling(obj); 
    
                            }
    
                        
                    } 
                    else{
                        //alert("Error..");
                        AddSchedule_ApiCalling(obj); 
                    }          
            }
            else{

                AddSchedule_ApiCalling(obj); 

            }
           

            }
            else{

                AddSchedule_ApiCalling(obj); 

            }
            
           
        }
        else{
            alert("You cannot book on these days since the date of booking selection is before pre-launch date.")
        }           
     
     }


     function GetUnAvailabeDaysOfBoats_Owner(obj){

        var datas = JSON.parse(sessionStorage.getItem("GetUnAvailabeDaysOfBoats_Owners"));         
            //
        if (typeof datas !== "undefined" && datas != null) 
        {
            // var temp_unAvilable = [];  
            // $.each(temp_res.UnAvailableDates, function(index, val) {                
            //     var str_tmp = new Date(val);
            //     temp_unAvilable.push(getFormattedDate_WithOut_Zero_Time(str_tmp));               
            // }); 
            
            // var aaa = temp_unAvilable;


            //AddSchedule_ApiCalling(obj);

        }
        else{

            AddSchedule_ApiCalling(obj); 

        }

     }


    function AddSchedule_ApiCalling(obj){ 
        
        
        
        obj.commends = $(".commen-cammends-sheduler").val();

        var timer1 = $("#sheduler-calender-timer1").val();    
        var timer2 = $("#sheduler-calender-timer2").val();           
        
        var start_str = new Date(obj.start); 
        var end_str   = new Date(obj.end);        

        start_str = new Date(start_str.setHours(conver_Hours(timer1),conver_Minit(timer1),00,0));
       
        end_str = new Date(end_str.setHours(conver_Hours(timer2),conver_Minit(timer2),00,0));
        
        obj.start = start_str.toString();
        obj.end   = end_str.toString();
        obj.specialDayCheck = false;

        var check_SpecialDay = SpecialDaysCalculations(start_str,end_str);
        
        if(check_SpecialDay.specialday_check == false){
            
        
            if(obj.Is_StandByBooking == true){

                $.ajax({
                    url: public_StandByBooking+"AddStandByBooking",
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
                        
                        console.log(error.responseText);
                                
                    }
                });

            }
            else
            {       
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
                        
                        console.log(error.responseText);
                                
                    }
                });
            }
        }
        else{
           
            alert("You are booked Special day");
            obj.specialDayCheck = true;
            obj.Special_Day = check_SpecialDay.data_SpecialDays_Arry;
            debugger;

            console.log(obj);

            if(obj.Is_StandByBooking == true){

                $.ajax({
                    url: public_StandByBooking+"AddStandByBooking",
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
                        
                        console.log(error.responseText);
                                
                    }
                });

            }
            else
            {       
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
                        
                        console.log(error.responseText);
                                
                    }
                });
            }

        }

    }

    //special day calculations................Start.......

     function SpecialDaysCalculations(start_Date,end_date){

       
         var data_SpecialDays =[];
         var specialday_check = false;

         var obj_main = Object();


         var date_specialday = JSON.parse(sessionStorage.getItem("load_SpecialDays"));

            var tmp_month_f = start_Date.getMonth();
            var tmp_year_f = start_Date.getFullYear();
            var tmp_Date_f = start_Date.getDate();
            var date_f = new Date(tmp_year_f, tmp_month_f, tmp_Date_f); 
        
           do{

         $.each(date_specialday, function (key, val) { 

                       
            var obj = Object();
            obj._id =val._id;
            obj.Name = val.Name;
            obj.Start_Date = new Date(val.Start_Date); 
            obj.End_Date = new Date(val.End_Date); 


            var tmp_month = obj.Start_Date.getMonth();
            var tmp_year = obj.Start_Date.getFullYear();
            var tmp_Date = obj.Start_Date.getDate();
      
            var date = new Date(tmp_year, tmp_month, tmp_Date); 

            do
            {
                
                var specialDay_Convert = getFormattedDate_WithOut_Zero_Time(date);
                var selectedDay_Convert =  getFormattedDate_WithOut_Zero_Time(date_f);
                

                if(specialDay_Convert == selectedDay_Convert){

                    var obj2 = Object();
                    obj2._id =val._id;
                    obj2.Name = val.Name;
                    obj2.special_date = Jqueary_string_to_Date_Convert(specialDay_Convert);
                    data_SpecialDays.push(obj2);
                    specialday_check = true;

                }



                date.setDate(date.getDate() + 1);
                var tmp_Add_Date = new Date(date);       
             }while(tmp_Add_Date <= obj.End_Date)

            
            //generateRandomSchedule(val);                 
         });

         date_f.setDate(date_f.getDate() + 1);
         var tmp_Add_Date_f = new Date(date_f);

        }while(tmp_Add_Date_f <= end_date)

        obj_main.specialday_check = specialday_check;
        obj_main.data_SpecialDays_Arry = data_SpecialDays;

        return obj_main;
     }

    function Jqueary_string_to_Date_Convert(dateString){   

        var dateArray = dateString.split("-");
        var dateObj = new Date(`${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`);
      
        return dateObj;
    
      }


   //End..................................................


    function calculate_NextBookingDays(datas,tmb_Obj)
    {
       
      
        var temp_data = JSON.parse(datas);
         /*
            tmb_Obj.Start_Date;
            tmb_Obj.End_Date;
        */

        if(typeof temp_data !== "undefined" && temp_data != null)
        {
            var temp_BoatDetails = temp_data.BoatDetails[0];

            var currentDate = new Date();
            //var currentDate = new Date("2021-06-20T00:00:00.000Z");

            var Launch_Date = new Date(temp_BoatDetails.Launch_Date);
            var PreLaunch_Date = new Date(temp_BoatDetails.PreLaunch_Date);                   

            var Start_Date =  tmb_Obj.Start_Date;
            var End_Date = tmb_Obj.End_Date;

            if(PreLaunch_Date <= Start_Date && Launch_Date >=  Start_Date)
            {
                //prelaunch date..
               // alert("pre-"+ PreLaunch_Date +"-Start_Date-"+Start_Date+"-Launch_Date-"+Launch_Date+"prelaunch date..");
               // alert(1);
               return 1;

            }
            else if(PreLaunch_Date <= Start_Date && Launch_Date <=  Start_Date && currentDate <= Launch_Date)
            {
                //launch date after
               // alert("pre-"+ PreLaunch_Date +"-Start_Date-"+Start_Date+"-Launch_Date-"+Launch_Date+"-currentDate-"+currentDate+"launch date after..");
                //alert("launch date after");
                //alert(2);

                return 2;
            }
            else if(PreLaunch_Date <= Start_Date && Launch_Date <=  Start_Date && Launch_Date <= currentDate )
            {
                //current day after the launch date

               // alert("pre-"+ PreLaunch_Date +"-Start_Date-"+Start_Date+"-Launch_Date-"+Launch_Date+"-currentDate-"+currentDate+"current day after the launch date..");
                //alert(3);

                return 3;

               // alert("current day after the launch date");
            }
            else
            {
                alert("You are trying to book this boat before its pre-launch date. This boat is not open for booking now. Please try after its pre-launch date.");
                //location.reload();
               

            }


           
        }



    }

    function getFormattedDate_Sat_Sun_only(dateVal) {       
        var newDate = new Date(dateVal);
        var days = ['Sun','Mon','Tues','Wed','Thrus','Fri','Sat'];
        var currentDay = days[newDate.getDay()];  
        if(currentDay == 'Sun' || currentDay == 'Sat'){
            return true;
        }
        else{
            return false;
        }  
       
    }

    function conver_Hours(dateVal){

        var newDate = new Date("1/1/2013 " + dateVal);        
        var sHour = newDate.getHours();
        var iHourCheck = parseInt(sHour);    
        sHour = padValue(iHourCheck);
    
        return sHour;
  
        
    }

    function conver_Minit(dateVal){

        var newDate = new Date("1/1/2013 " + dateVal);         
        var sMinute = padValue(newDate.getMinutes());
            
        return sMinute;
  
        

    }


$(document).on("click",".tui-full-calendar-popup-save",function() { 
    
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

                        obj.Check_Status = 3;
                        
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

                        AddSchedule_ApiCalling(obj);
                    
                        // $.ajax({
                        //     url: public_URL+"AddSchedule",
                        //     type: 'POST',
                        //     dataType: 'json', 
                        //     data: obj,
                        //     success: function(datas) {
                               
                        //         if(datas.status == true)
                        //         {
                        //             alert(datas.message);
                        //             location.reload();
                    
                        //         }
                        //         else if(datas.status == false){
                                    
                        //             alert(datas.message);                                   
                    
                        //         }
                                
                            
                    
                        //     },
                        //     error: function (error) {          
                                           
                        //     }
                        // });

                
                
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
            var user_id_owner = dataSelected_OwnerDropDown._id;
                       

                if(checkController == "Save"){    

                var startdate_date = new Date($("#tui-full-calendar-schedule-start-date").val());
                var enddate_date = new Date( $("#tui-full-calendar-schedule-end-date").val());
                var start_str =startdate_date.toString();
                var end_str = enddate_date.toString();    
                var AdminId_get = sessionStorage.getItem("UserId");

                  
                //this to start
                var Next_Booking_Days_check = sessionStorage.getItem("SettNextBookingDays_boat");
                var nextBookingDay = 0;
                if(typeof Next_Booking_Days_check !== "undefined" && Next_Booking_Days_check != null)
                {
                    ////sumthinggggg
                    var tmb_Obj = Object()
                    tmb_Obj.Start_Date = startdate_date;
                    tmb_Obj.End_Date = enddate_date;

                    nextBookingDay = calculate_NextBookingDays(Next_Booking_Days_check,tmb_Obj);

                }
                    
                    
                    // day calculations.....
                    const Temp_Date_start = new Date(startdate_date);                        
                    const Temp_Date_end = new Date(enddate_date);
                    var Temp_Date_dateDiff= Math.round((Temp_Date_end - Temp_Date_start)/(1000*60*60*24));
                    var Temp_Date_Winter_dateDiff = Temp_Date_dateDiff+1;
                    const Temp_Date_sundays = Math.floor((Temp_Date_Winter_dateDiff + (Temp_Date_start.getDay() + 6) % 7) / 7);
                    var Temp_Date_weekenddays = 2 * Temp_Date_sundays + (Temp_Date_end.getDay()==6) - (Temp_Date_start.getDay()==0);                        
                    var Temp_Date_weekdays = Temp_Date_Winter_dateDiff - Temp_Date_weekenddays;

                     // ................... 

                     ///Stand By Booking... start...
                     var Is_StandByBooking; //= JSON.parse("false");
                     var currentDates = getFormattedDate_WithOut_Zero_Time( new Date());
                     var startDateConvertDate = getFormattedDate_WithOut_Zero_Time(start_str); 
                     if(currentDates == startDateConvertDate)
                     {
                         if(2 <= Temp_Date_dateDiff){

                            Temp_Date_dateDiff = Temp_Date_dateDiff - 2;
                         }                     

                         if(2 <= Temp_Date_weekdays){

                            Temp_Date_weekdays = Temp_Date_weekdays - 2;
                         }

                         var chek_Sun_satar = getFormattedDate_Sat_Sun_only(start_str);
                            if(chek_Sun_satar == true){
                                if(2 <= Temp_Date_weekenddays)
                                {
                                    Temp_Date_weekenddays = Temp_Date_weekenddays - 2;
                                }

                            }

                            Is_StandByBooking = JSON.parse("true");
                            alert("You are trying to make a Standy By Day Booking!");

                     }
                       
                       


                    ///
                                          
                    var obj = Object();                 

                    obj.Check_Status = nextBookingDay;
                    obj.Is_StandByBooking = Is_StandByBooking;

                    obj.TotalDay_Count = Temp_Date_dateDiff;
                    obj.WeekEnd_Count = Temp_Date_weekenddays;
                    obj.WeekDay_Count = Temp_Date_weekdays;
                
                    obj.User_RoleType = "Owner";
                    obj.User_Id = user_id_owner;
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
                    
                     GetAllUnAvailableDays_settings(obj);                                  
                              
            
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
                    obj.User_Id = user_id_owner;
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

                     AddSchedule_ApiCalling(obj);
                 
                    //  $.ajax({
                    //      url: public_URL+"AddSchedule",
                    //      type: 'POST',
                    //      dataType: 'json', 
                    //      data: obj,
                    //      success: function(datas) {
                    //          if(datas.status == true)
                    //          {
                    //              alert(datas.message);
                    //              location.reload();
                 
                    //          }
                    //          else if(datas.status == false){
                                    
                    //             alert(datas.message);                                   
                
                    //         }
                         
                 
                    //      },
                    //      error: function (error) {          
                                        
                    //      }
                    //  });
 
             
             
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
    else if(pageIdentiFication == "owner-dashboard-Reservation"){

        
        var checkController = $('.tui-full-calendar-popup-save').children('span').first().text();
            
        var dataGet_AdminSelectBoat = sessionStorage.getItem("Owner_pg_boatListed");
        var dataSelected_OwnerDropDown = sessionStorage.getItem("Ownerlogin");
        if ((typeof dataGet_AdminSelectBoat !== "undefined" && dataGet_AdminSelectBoat != null) 
           &&(typeof dataSelected_OwnerDropDown !== "undefined" && dataSelected_OwnerDropDown != null) )
        {
           
            dataSelected_OwnerDropDown = JSON.parse(dataSelected_OwnerDropDown);
            dataGet_AdminSelectBoat = JSON.parse(dataGet_AdminSelectBoat);
            var setTitle = dataSelected_OwnerDropDown.First_Name  + "(" + dataGet_AdminSelectBoat.Boat_Name+")";
            var user_id_owner = dataSelected_OwnerDropDown._id;
                       

                if(checkController == "Save"){    

                var startdate_date = new Date($("#tui-full-calendar-schedule-start-date").val());
                var enddate_date = new Date( $("#tui-full-calendar-schedule-end-date").val());
                var start_str =startdate_date.toString();
                var end_str = enddate_date.toString();    
                var AdminId_get = sessionStorage.getItem("UserId");

                  
                //this to start
                var Next_Booking_Days_check = sessionStorage.getItem("SettNextBookingDays_boat");
                var nextBookingDay = 0;
                if(typeof Next_Booking_Days_check !== "undefined" && Next_Booking_Days_check != null)
                {
                    ////sumthinggggg
                    var tmb_Obj = Object()
                    tmb_Obj.Start_Date = startdate_date;
                    tmb_Obj.End_Date = enddate_date;

                    nextBookingDay = calculate_NextBookingDays(Next_Booking_Days_check,tmb_Obj);

                }
                    
                
                    // day calculations.....
                    const Temp_Date_start = new Date(startdate_date);                        
                    const Temp_Date_end = new Date(enddate_date);
                    var Temp_Date_dateDiff= Math.round((Temp_Date_end - Temp_Date_start)/(1000*60*60*24));
                    var Temp_Date_Winter_dateDiff = Temp_Date_dateDiff+1;
                    const Temp_Date_sundays = Math.floor((Temp_Date_Winter_dateDiff + (Temp_Date_start.getDay() + 6) % 7) / 7);
                    var Temp_Date_weekenddays = 2 * Temp_Date_sundays + (Temp_Date_end.getDay()==6) - (Temp_Date_start.getDay()==0);                        
                    var Temp_Date_weekdays = Temp_Date_Winter_dateDiff - Temp_Date_weekenddays;

                     // ...................                     
                     ///Stand By Booking... start... 
                     var Is_StandByBooking;                                
                     var currentDates = getFormattedDate_WithOut_Zero_Time( new Date());
                     var startDateConvertDate = getFormattedDate_WithOut_Zero_Time(start_str); 
                     if(currentDates == startDateConvertDate)
                     {
                         if(2 <= Temp_Date_dateDiff){

                            Temp_Date_dateDiff = Temp_Date_dateDiff - 2;
                         }                     

                         if(2 <= Temp_Date_weekdays){

                            Temp_Date_weekdays = Temp_Date_weekdays - 2;
                         }

                            var chek_Sun_satar = getFormattedDate_Sat_Sun_only(start_str);
                            if(chek_Sun_satar == true){
                                if(2 <= Temp_Date_weekenddays)
                                {
                                    Temp_Date_weekenddays = Temp_Date_weekenddays - 2;
                                }

                            }

                            Is_StandByBooking = true;

                     }
                       
                       


                    ///
                                          
                    var obj = Object();                   
                    
                    obj.Check_Status = nextBookingDay;
                    obj.Is_StandByBooking = Is_StandByBooking;

                    obj.TotalDay_Count = Temp_Date_dateDiff;
                    obj.WeekEnd_Count = Temp_Date_weekenddays;
                    obj.WeekDay_Count = Temp_Date_weekdays;
                
                    obj.User_RoleType = "Owner";
                    obj.User_Id = user_id_owner;
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
                    
                     GetAllUnAvailableDays_settings(obj);                                  
                              
            
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
                    obj.User_Id = user_id_owner;
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


});



