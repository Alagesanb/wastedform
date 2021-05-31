//AuthorName:CHITRA V
//File:Schedule Controller.js
//Module:Manage Schedule
//Created Date:11.05.2021
//Purpose:To Manage Schedule

/***************************************************Import Packages and ViewModels Section******************************** */
const Schedule = require('../models/ScheduleModel')
const Boats=require('../models/AddBoatModel')
const mongoose = require("mongoose")
const moment  = require('moment');
const consecutive = require('../models/ConsecutiveDaysModel');


//const Bookeddays=require('../models/BookedDaysForOwner');
/***************************************************Import Methods and Functions******************************** */
// Function for Add AdminBooking
const AddSchedule= (req, res, next)=>
{
    
    var Total_Count=req.body.TotalDay_Count;
    var WeekDay_Count=req.body.WeekDay_Count;
    var WeekEnd_Count=req.body.WeekEnd_Count;
    var User_role=req.body.User_RoleType;
    var Boat_id=req.body.Boat_Id;
    var start_Date=req.body.start;
    console.log(start_Date)
    var end_Date=req.body.end;
var TodaysDate= moment();
 var CurrentDate=moment(TodaysDate).format('DD-MM-YYYY');
 console.log(CurrentDate);

//var start_Date_NoTime=new Date(start_Date);
//console.log(start_Date_NoTime.toString(),'hi');
var Start_final=moment(start_Date);
 console.log( Start_final);
// var end_Date_NoTime=new Date(end_Date);
var End_final=moment(end_Date);

var dif=Start_final.diff(moment(),'days')
console.log(dif)

    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
     }
     Boats.findById({_id:mongoose.Types.ObjectId(Boat_id)})
        .then(boatDetails=> {
          
     if(boatDetails.Boat_Status=="1")//check whether boat is Active or not
     {
         console.log('1')
          
                        if(dif>=0)//for Previous Date
                        {  
                           
                           if(User_role=='Admin') //for Admin
                           {
                            Schedule.findOne({Boat_Id:Boat_id,start:start_Date,end:end_Date,IsActive:true}).then(results=>
                                {
                                    if(results==null)
                                    {
                                        Schedule.findOne({Boat_Id:Boat_id,start:{$lte:start_Date},end:{$gte:end_Date},IsActive:true}).then(results=>
                                            {
                                            if(results==null)
                                            {
                                         
//Add 
console.log('Admin')
let Add_Schedule = new Schedule({ 
                                     
                    
                                
    Boat_Id:mongoose.Types.ObjectId(req.body.Boat_Id),
    Boat_Name:req.body.Boat_Name,
    calendarId:mongoose.Types.ObjectId(req.body.calendarId),
    title:req.body.title,
    body:req.body.body,
    start:req.body.start,
     end:req.body.end,
     start_NoTime:Start_final,
     end_NoTime:End_final,
     goingDuration:req.body.goingDuration,
     comingDuration:req.body.comingDuration,
     isAllDay:req.body.isAllDay,
     category:req.body.category,
     dueDateClass:req.body.dueDateClass,
     location:req.body.location,
     attendees:req.body.attendees,
     recurrenceRule:req.body.recurrenceRule,
     isPending:req.body.isPending,
     isFocused:req.body.isFocused,
     isVisible:req.body.isVisible,
     isReadOnly:req.body.isReadOnly,
     isPrivate:req.body.isPrivate,
     color:req.body.color,
     bgColor:req.body.bgColor,
     dragBgColor:req.body.dragBgColor,
     borderColor:req.body.borderColor,
     customStyle:req.body.customStyle,
     raw:req.body.raw,
     state:req.body.state, 
     User_RoleType:req.body.User_RoleType,
     User_Id:mongoose.Types.ObjectId(req.body.User_Id),
     Admin_Id:mongoose.Types.ObjectId(req.body.Admin_Id),
     Status:Module_status,
     IsActive: req.body.IsActive,
     Current_Time:moment(Date.now()),
     Updated_time: moment(Date.now())

});

Add_Schedule.save()
 .then(response => {
     res.json({
         
         status:true,
         message: 'Schedule Details Added Successfully'
     })
 })
 .catch(error => {
     res.json({
         message: error
     })
 })
      
}
else
{
    res.json({
            
        status:true,
        message: 'Date Already Booked'
    })

}



})
//Add

}
else
{
    res.json({
        status:false,
        message: 'Date Already Booked'
    })

}
})
}

                        else//For Owner
                        {

                          console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
                           
                            Schedule.findOne({Boat_Id:Boat_id,start:start_Date,end:end_Date,IsActive:true}).then(results=>
                            {
                                                   
                                  console.log('inside Owner')
                                if(results==null)
                                {
                                    Schedule.findOne({Boat_Id:Boat_id,start:{$lte:start_Date},end:{$gte:end_Date}}).then(results=>
                                        {
                                            console.log('inside Owner2')
                                        if(results==null)
                                        {
                                            
                                       

                                    Boats.findById({_id:mongoose.Types.ObjectId(Boat_id)}).then(response=>
                                        {  
                                            var SummerWeekdays=response.Summer_WeekDays;
                                            var SummerWeekendDays=response.Summer_WeekEndDays;
                                            var  WinterWeekDays=response.Winter_WeekDays;
                                            var WinterweekendDays=response.Winter_WeekEndDays;
                                            var Check_StartDate= moment(start_Date);
                                            console.log(Check_StartDate)
                                            console.log(response.SummerSeason_SDate)
                                            var Check_EndDate= new Date(end_Date)
                                            console.log(Check_EndDate)
                                            console.log(response.SummerSeason_EDate)
                                            Boats.findOne({Boat_Id:Boat_id,SummerSeason_SDate:{$lte:'2021-05-31T10:00:00.000Z'}}).then(results=>
                                                {
                                                    console.log('successssssssssssssssssssssss')
                                                   
                                            if(results!=null)//check Date Between Summer Dates
                                            {

                                           
                                                console.log('successssssssssssssssssssssss222222222222222222222')
                                            
                                                consecutive.findOne({Boat_Id:mongoose.Types.ObjectId(Boat_id)})
                                                .then(element=> 
                                                    
                                                    {
            
                                                        if(element.Summer_ConsecutiveDays>=Total_Count)//consecutive count
                                                        {
            
                                                     
if(SummerWeekdays>=WeekDay_Count && SummerWeekendDays>=WeekEnd_Count )//count of weekday and week end
{

     // for updating Summer days
     Boats.findByIdAndUpdate({_id:mongoose.Types.ObjectId(Boat_id)}, 
     {   
                                      
       Summer_WeekDays:SummerWeekdays-WeekDay_Count,
       Summer_WeekEndDays:SummerWeekendDays-WeekEnd_Count
         
     },
     {new: true},
     function(err, data) {
         
         
     });


                     


//Add Summer Section

let Add_Schedule = new Schedule({ 
                                     
                                  
                                
       Boat_Id:mongoose.Types.ObjectId(req.body.Boat_Id),
       Boat_Name:req.body.Boat_Name,
       calendarId:mongoose.Types.ObjectId(req.body.calendarId),
       title:req.body.title,
       body:req.body.body,
       start:req.body.start,
        end:req.body.end,
        start_NoTime:Start_final,
        end_NoTime:End_final,
        goingDuration:req.body.goingDuration,
        comingDuration:req.body.comingDuration,
        isAllDay:req.body.isAllDay,
        category:req.body.category,
        dueDateClass:req.body.dueDateClass,
        location:req.body.location,
        attendees:req.body.attendees,
        recurrenceRule:req.body.recurrenceRule,
        isPending:req.body.isPending,
        isFocused:req.body.isFocused,
        isVisible:req.body.isVisible,
        isReadOnly:req.body.isReadOnly,
        isPrivate:req.body.isPrivate,
        color:req.body.color,
        bgColor:req.body.bgColor,
        dragBgColor:req.body.dragBgColor,
        borderColor:req.body.borderColor,
        customStyle:req.body.customStyle,
        raw:req.body.raw,
        state:req.body.state, 
        User_RoleType:req.body.User_RoleType,
        User_Id:mongoose.Types.ObjectId(req.body.User_Id),
        Admin_Id:mongoose.Types.ObjectId(req.body.Admin_Id),
        Status:Module_status,
        IsActive: req.body.IsActive,
        Current_Time:moment(Date.now()),
        Updated_time: moment(Date.now())

});
 
Add_Schedule.save()
    .then(response => {
        res.json({
            
            status:true,
            message: 'Schedule Details Added Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: error
        })
    })                              }//weekday,weekend
                                        else
                                            {
 
                                             res.json({
                                            status:false,
                                             message: 'Booking Days Exceeds limit'
                                                      })


                                             }
                                    }
                                    else
                                    {

                                        res.json({
                                            status:false,
                                            message: 'You Cannot Book This Much Number Of Days in One Booking'
                                        })


                                    }
                                    })
                               
                                        }
                                    

                            
                                            else
                                            {

                                                if(start_Date>=response.WinterSeason_SDate && end_Date<=response.WinterSeason_EDate)//check Date Between winter Dates
                                                {
                                                   
                                                
                                            
                                                consecutive.findOne({Boat_Id:mongoose.Types.ObjectId(Boat_id)})
                                                .then(element=> 
                                                    
                                                    {

                                                if(element.Winter_ConsecutiveDays>=Total_Count)
                                                {
                                             
                                                    if(WinterWeekDays>=WeekDay_Count && WinterweekendDays>=WeekEnd_Count )//count of weekday and week end
                                                    {
                                                    
                                                         // for updating Summer days
                                                         Boats.findByIdAndUpdate({_id:mongoose.Types.ObjectId(Boat_id)}, 
                                                         {   
                                                                                          
                                                            Winter_WeekDays:WinterWeekDays-WeekDay_Count,
                                                            Winter_WeekEndDays:WinterweekendDays-WeekEnd_Count
                                                             
                                                         },
                                                         {new: true},
                                                         function(err, data) {
                                                             
                                                             
                                                         });
                                                    

//Add Winter Section

let Add_Schedule = new Schedule({ 
                                     
                                  
                                
    Boat_Id:mongoose.Types.ObjectId(req.body.Boat_Id),
    Boat_Name:req.body.Boat_Name,
       calendarId:mongoose.Types.ObjectId(req.body.calendarId),
       title:req.body.title,
       body:req.body.body,
       start:req.body.start,
        end:req.body.end,
        start_NoTime:Start_final,
        end_NoTime:End_final,
        goingDuration:req.body.goingDuration,
        comingDuration:req.body.comingDuration,
        isAllDay:req.body.isAllDay,
        category:req.body.category,
        dueDateClass:req.body.dueDateClass,
        location:req.body.location,
        attendees:req.body.attendees,
        recurrenceRule:req.body.recurrenceRule,
        isPending:req.body.isPending,
        isFocused:req.body.isFocused,
        isVisible:req.body.isVisible,
        isReadOnly:req.body.isReadOnly,
        isPrivate:req.body.isPrivate,
        color:req.body.color,
        bgColor:req.body.bgColor,
        dragBgColor:req.body.dragBgColor,
        borderColor:req.body.borderColor,
        customStyle:req.body.customStyle,
        raw:req.body.raw,
        state:req.body.state, 
        User_RoleType:req.body.User_RoleType,
        User_Id:mongoose.Types.ObjectId(req.body.User_Id),
        Admin_Id:mongoose.Types.ObjectId(req.body.Admin_Id),
        Status:Module_status,
        IsActive: req.body.IsActive,
        Current_Time:moment(Date.now()),
        Updated_time: moment(Date.now())

});
 
Add_Schedule.save()
    .then(response => {
        res.json({
            
            status:true,
            message: 'Schedule Details Added Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: error
        })
    })

                                                    }//weekday weekend count
                                                    else{

                                                        res.json({
                                                            status:false,
                                                             message: 'Booking Days Exceeds limit'
                                                                })
                
                
                                                             
                                                    }
//Add Winter Section
}
                                               
else
{

    res.json({
        status:false,
        message: 'You Cannot Book This Much Number Of Days in One Booking'
    })

}
})                                     }
                                          else
                                          {
                                            res.json({
                                                status:false,
                                                message: 'These Dates Are not Allowed for Booking'
                                            })
                                          }

                                        }//else


                                            
                                        });

                                                  
                                    })
                                    }
                                    else
                                    {

                                        res.json({
                                            status:false,
                                            message: 'Date Already Booked'
                                        })

                                    }
                    
                         
                            });//else inside function owner


                        }
                        else
                        {
                            res.json({
                                status:false,
                                message: 'Date Already Booked'
                            })
                        }

                        });
                        }

                        }
                    
                    
                        else {
                            res.json({
                                status:false,
                                message: 'You Cannot Select Previous Date'
                            })
                        } 
                        
                   
                   
                
            
        }
        else
        {

            res.json({
                status:false,
                message: 'Boat Selected is not Active'
            })

        }
   
    });
        };



 
//View
const ViewAllSchedule= (req, res, next) => {  
    Schedule.find({IsActive:true})
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "No Data"
            })
        })
}

//Function for Delete AdminBooking 
const DeleteSchedule = (req, res, next) => {
    var Roles=req.body.User_RoleType;
    const scheduleid = req.body._id
    // var TodaysDate=moment()
// var CurrentDate=TodaysDate.toDateString('mm/dd/yyyy');
// var TodaysDate2=TodaysDate.toLocaleString();
// var CurrentDate= TodaysDate2.split(' ')[0].replace(/,/g,'');

    Schedule.findById({_id:mongoose.Types.ObjectId(scheduleid)}).then(response=>
        { 
            var start_Date=response.start;
            var Start_final=moment(start_Date);
            var dif=Start_final.diff(moment(),'days')
            console.log(dif);
            var RoleAssigned=response.User_RoleType;
            

            console.log(RoleAssigned);
            if(Roles==RoleAssigned && dif>=0)
            {

    Schedule.findByIdAndUpdate({_id:mongoose.Types.ObjectId(scheduleid)}, 
    { 
      
        IsActive:false,
        Updated_time: moment(Date.now())
     
    },
      
        function(err, data) {
        if(err){
            res.json({ 
                status:false,
                message: 'AN ERROR OCCURED'
            })
        }
        else{
            res.json({

                status:true,
                message: 'Schedule Details Deleted Successfully'
               })
        }
    }); 
}
else
{
    res.json({

        status:true,
        message: 'Allowed User Can Only Delete '
       })


}

})
}
const GetBoatNames = (req, res, next) => { 
    const searchletter=req.body.alphabet
    let re = new RegExp(searchletter,'i') 
    console.log(searchletter)
    Boats.find({IsActive:true,"Boat_Name":re}).select({_id:1,Boat_Name:1,Boattype_Name:1})
        .then(response => {
            res.send({
                response
            })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
}

//edit jibin


const EditSchedule= (req, res, next)=>
{


    var Roles=req.body.User_RoleType;
    const scheduleid = req.body._id
    console.log(req.body.WeekEnd_Count,req.body.WeekDay_Count)
    var Total_Count=req.body.TotalDay_Count;
    var Boat_id=req.body.Boat_Id;
    var start_Date=req.body.start;
    var end_Date=req.body.end;
    var TodaysDate=new Date(Date.now());
    // var CurrentDate=TodaysDate.toDateString('mm/dd/yyyy');
    var TodaysDate2=TodaysDate.toLocaleString();
    var CurrentDate= TodaysDate2.split(' ')[0].replace(/,/g,'');
    console.log(CurrentDate);
    var start_Date_NoTime=new Date(start_Date);
     var start_Date_NoTime2=start_Date_NoTime.toLocaleString();
    var Start_final= start_Date_NoTime2.split(' ')[0].replace(/,/g,'');
    
    
    // var Start_final=start_Date_NoTime.toDateString('mm/dd/yyyy');
     console.log(Start_final);
    var end_Date_NoTime=new Date(end_Date);
     var end_Date_NoTime2=end_Date_NoTime.toLocaleString();
    var End_final= end_Date_NoTime2.split(' ')[0].replace(/,/g,'');
    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
    }  
    
    Boats.findById({_id:mongoose.Types.ObjectId(Boat_id)})
    .then(boatDetails=> {
      
 if(boatDetails.Boat_Status=="1")//check whether boat is Active or not
 {

    consecutive.findOne({Boat_Id:mongoose.Types.ObjectId(Boat_id)})
    .then(element=> {
            
            
                    if(Total_Count<=element.Winter_ConsecutiveDays || Total_Count<=element.Summer_ConsecutiveDays )// check for Consecutive Days(W-10,S-7)
                    {
                        

                        if(Start_final>=CurrentDate)//previousDate
                        {  
                           
                           
                        Schedule.exists({Boat_Id:Boat_id,start_NoTime:Start_final,end_NoTime:End_final}).then(results=>
                            {
                                
                                if(!results)//if date Exist
                                {
                                  
                                  

                                    Schedule.findById({_id:mongoose.Types.ObjectId(scheduleid)}).then(response=>
                                        { 
                                            var RoleAssigned=response.User_RoleType;
                                            console.log(RoleAssigned);
                                            if(Roles==RoleAssigned)//check Roles for Admin,Owner,Maintenance
                                            {   
                                                
                                                //updation
                                                Boats.findById({_id:mongoose.Types.ObjectId(Boat_id)}).then(response=>
                                                    {  
                                                        var SummerWeekdays=response.Summer_WeekDays;
                                                        var SummerWeekendDays=response.Summer_WeekEndDays;
                                                        var  WinterWeekDays=response.Winter_WeekDays;
                                                        var WinterweekendDays=response.Winter_WeekEndDays;
                                                        console.log(SummerWeekdays,SummerWeekendDays,WinterWeekDays,WinterweekendDays);
                                                        if(Start_final>=response.SummerS_SDate && End_final<=response.SummerS_EDate)//check dates for Summer dates
                                                        {
                                         if(req.body.WeekDay_Count<=SummerWeekdays && req.body.WeekEnd_Count<=SummerWeekendDays) //count of weekdays and weekend summer
                                                            
                                         {
                                         
                                          Boats.findByIdAndUpdate({_id:mongoose.Types.ObjectId(Boat_id)}, 
                                          {   
                                                                            
                                            Summer_WeekDays:SummerWeekdays-req.body.WeekDay_Count,
                                            Summer_WeekEndDays:SummerWeekendDays-req.body.WeekEnd_Count
                                              
                                          },
                                          {new: true},
                                          function(err, data) {
                                              
                                              console.log(data)
                                          });


//update Summer

Schedule.findByIdAndUpdate({_id:mongoose.Types.ObjectId(scheduleid)}, 
{ 

    

Boat_Id:mongoose.Types.ObjectId(req.body.Boat_Id),
Boat_Name:req.body.Boat_Name,
calendarId:mongoose.Types.ObjectId(req.body.calendarId),
title:req.body.title,
body:req.body.body,
start:req.body.start,
end:req.body.end,
start_NoTime:Start_final,
end_NoTime:End_final,
goingDuration:req.body.goingDuration,
comingDuration:req.body.comingDuration,
isAllDay:req.body.isAllDay,
category:req.body.category,
dueDateClass:req.body.dueDateClass,
location:req.body.location,
attendees:req.body.attendees,
recurrenceRule:req.body.recurrenceRule,
isPending:req.body.isPending,
isFocused:req.body.isFocused,
isVisible:req.body.isVisible,
isReadOnly:req.body.isReadOnly,
isPrivate:req.body.isPrivate,
color:req.body.color,
bgColor:req.body.bgColor,
dragBgColor:req.body.dragBgColor,
borderColor:req.body.borderColor,
customStyle:req.body.customStyle,
raw:req.body.raw,
state:req.body.state, 
User_RoleType:req.body.User_RoleType,
User_Id:mongoose.Types.ObjectId(req.body.User_Id),
Admin_Id:mongoose.Types.ObjectId(req.body.Admin_Id),
Status:Module_status,
IsActive: req.body.IsActive,
Current_Time:moment(Date.now()),
Updated_time: moment(Date.now())

},

function(err, data) {
if(err){
res.json({ 
status:false,
message: 'AN ERROR OCCURED'
})
}
else{
res.json({

status:true,
message: 'Schedule Details Updated Successfully'
})
}
}); //j

//update Summer

                                        }
                                        else
                                        {
                                            res.json({
                                        
                                                status:true,
                                                message: 'Available WeekEnd Days Are Limited'
                                            })
                                        }
                                    
                                        // for updating weekend days jibin5/22
                                                        }
                                                        
                                        
                                                        else
                                                        {
                                                            if(req.body.WeekDay_Count<=WinterWeekDays && req.body.WeekEnd_Count<=WinterweekendDays) //count of weekdays and weekend Winter
                                                            { 
                                        
                                                            Boats.findByIdAndUpdate({_id:mongoose.Types.ObjectId(Boat_id)}, 
                                                            {   
                                                                                              
                                                                Winter_WeekDays:WinterWeekDays-req.body.WeekDay_Count,
                                                                Winter_WeekEndDays:WinterweekendDays-req.body.WeekEnd_Count
                                                                
                                                            },
                                                            {new: true},
                                                            function(err, data) {
                                                                
                                                                console.log(data.Owners_Allowed)
                                                            });



                                                            //update Winter
                                                            Schedule.findByIdAndUpdate({_id:mongoose.Types.ObjectId(scheduleid)}, 
{ 

    

Boat_Id:mongoose.Types.ObjectId(req.body.Boat_Id),
Boat_Name:req.body.Boat_Name,
calendarId:mongoose.Types.ObjectId(req.body.calendarId),
title:req.body.title,
body:req.body.body,
start:req.body.start,
end:req.body.end,
start_NoTime:Start_final,
end_NoTime:End_final,
goingDuration:req.body.goingDuration,
comingDuration:req.body.comingDuration,
isAllDay:req.body.isAllDay,
category:req.body.category,
dueDateClass:req.body.dueDateClass,
location:req.body.location,
attendees:req.body.attendees,
recurrenceRule:req.body.recurrenceRule,
isPending:req.body.isPending,
isFocused:req.body.isFocused,
isVisible:req.body.isVisible,
isReadOnly:req.body.isReadOnly,
isPrivate:req.body.isPrivate,
color:req.body.color,
bgColor:req.body.bgColor,
dragBgColor:req.body.dragBgColor,
borderColor:req.body.borderColor,
customStyle:req.body.customStyle,
raw:req.body.raw,
state:req.body.state, 
User_RoleType:req.body.User_RoleType,
User_Id:mongoose.Types.ObjectId(req.body.User_Id),
Admin_Id:mongoose.Types.ObjectId(req.body.Admin_Id),
Status:Module_status,
IsActive: req.body.IsActive,
Current_Time:moment(Date.now()),
Updated_time: moment(Date.now())

},

function(err, data) {
if(err){
res.json({ 
status:false,
message: 'AN ERROR OCCURED'
})
}
else{
res.json({

status:true,
message: 'Schedule Details Updated Successfully'
})
}
}); //j
//Update Winter

                                                        }
                                                        else
                                                        {

                                                            res.json({
                                        
                                                                status:true,
                                                                message: 'Available WeekEnd Days Are Limited'
                                                            })


                                                        }
                                                        }
                                                        
                                                    });

                                                //updation
                        }//j
                        else {
                            res.json({

                                status:true,
                                message: 'Allowed User can Only Delete'
                               })
                        } 

                    });
                            }
                           
                            else {
                                res.json({
                                    status:false,
                                    message: 'This dates are not Available'
                                })
                            } 
                        
                        
                            });
                        
                        }

                    
            
                        else {
                            res.json({
                                status:false,
                                message: 'Cannot Select Previous Date'
                            })
                        } 
                        
                            }
                    else
                    {

                        res.json({
                            status:false,
                            message: 'Allowed Days Greater Than Consecutive Days'
                        })

                    }
                // });//loop
                
            });
        }
        else
        {

            res.json({
                status:false,
                message: 'Boat Selected is not Active'
            })

        }

    });
        };


const ViewBookingDetailsWithBoatAndOwner = (req, res, next) => { 

    mongoose.model('Tb_Schedule').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_addowners",
    "localField": "User_Id",
    "foreignField": "_id",
    "as": "OwnerDetails"
    }
   },
    {
        "$lookup": {
            "from": "tb_boatmasters",
            "localField": "Boat_Id",
            "foreignField": "_id",
            "as": "BoatDetails"
        }
    },
    
        {
            "$match": { IsActive:true
            }
        }, 
    
    
    {
    $project:{
        calendarId:1,start:1,end:1,start_NoTime:1,end_NoTime:1,category:1,dueDateClass:1,User_RoleType:1,Current_Time:1,Updated_time:1,
    "OwnerDetails.Profile_Image":1,
    "OwnerDetails.First_Name":1,
    "OwnerDetails.Mobile":1,
    "OwnerDetails.Parking_Ability":1,
    "BoatDetails.Location_Name":1,
    "BoatDetails.Boattype_Name":1,
    "BoatDetails.Location_Id":1,
    "BoatDetails.Boattype_id":1,
    "BoatDetails.Boat_Name": 1,
    "BoatDetails.Boat_Facility":1,
    "BoatDetails.Boat_Description":1,
    "BoatDetails. Owners_Allowed": 1,
    "BoatDetails.Launch_Date": 1,
    "BoatDetails.PreLaunch_Date":1,
    "BoatDetails.Boat_Image": 1,
    "BoatDetails.Boat_HandBook":1,
    "BoatDetails.Boat_Status":1,
    "BoatDetails.Total_Days":1,
    "BoatDetails.Summer_WeekDays":1,
    "BoatDetails. Summer_WeekEndDays":1,
    "BoatDetails.Winter_WeekDays":1,
    "BoatDetails.Winter_WeekEndDays":1,
    
          
    }
    }
    ]
    ).exec(function(err, response){
    if (err)
    {
        res.json({
            status:false,
            message: 'AN ERROR OCCURED'
        })
    }
    else
    {
        res.json({
            status:true,
            response
        })

    }
     })
}


//Cancelled Booking



const ViewCancelledBooking = (req, res, next) => { 

    mongoose.model('Tb_Schedule').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_addowners",
    "localField": "User_Id",
    "foreignField": "_id",
    "as": "OwnerDetails"
    }
   },
    {
        "$lookup": {
            "from": "tb_boatmasters",
            "localField": "Boat_Id",
            "foreignField": "_id",
            "as": "BoatDetails"
        }
    },
    
        {
            "$match": { IsActive:false
            }
        }, 
    
    
    {
    $project:{
        calendarId:1,start:1,end:1,start_NoTime:1,end_NoTime:1,category:1,dueDateClass:1,User_RoleType:1,Current_Time:1,Updated_time:1,
    "OwnerDetails.Profile_Image":1,
    "OwnerDetails.First_Name":1,
    "OwnerDetails.Mobile":1,
    "OwnerDetails.Parking_Ability":1,
    "BoatDetails.Location_Name":1,
    "BoatDetails.Boattype_Name":1,
    "BoatDetails.Location_Id":1,
    "BoatDetails.Boattype_id":1,
    "BoatDetails.Boat_Name": 1,
    "BoatDetails.Boat_Facility":1,
    "BoatDetails.Boat_Description":1,
    "BoatDetails. Owners_Allowed": 1,
    "BoatDetails.Launch_Date": 1,
    "BoatDetails.PreLaunch_Date":1,
    "BoatDetails.Boat_Image": 1,
    "BoatDetails.Boat_HandBook":1,
    "BoatDetails.Boat_Status":1,
    "BoatDetails.Total_Days":1,
    "BoatDetails.Summer_WeekDays":1,
    "BoatDetails. Summer_WeekEndDays":1,
    "BoatDetails.Winter_WeekDays":1,
    "BoatDetails.Winter_WeekEndDays":1,
    
          
    }
    }
    ]
    ).exec(function(err, response){
    if (err)
    {
        res.json({
            status:false,
            message: 'AN ERROR OCCURED'
        })
    }
    else
    {
        res.json({
            status:true,
            response
        })

    }
     })
}


//Get Booking By Boat Id









module.exports = {AddSchedule,EditSchedule,DeleteSchedule,ViewAllSchedule,GetBoatNames,ViewCancelledBooking,ViewBookingDetailsWithBoatAndOwner}
 
    