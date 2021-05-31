//AuthorName:Chitra V
//File:Days Settings Controller.js
//Module:Manage Days Settings
//Created Date:04.05.2021
//Purpose:To Manage Days Settings

/***************************************************Import Packages and ViewModels Section******************************** */
const moment  = require('moment');
const mongoose = require("mongoose")
const shares = require('../models/AddNewShareModel');
const consecutive = require('../models/ConsecutiveDaysModel');
const nextbooking = require('../models/NextBookingModel');
const Boats=require('../models/AddBoatModel');//jibin 5/22
const unavailableForAll=require('../models/AddUnAvailableDaysForAllBoatsModel');
const unavailableSingle=require('../models/AddUnAvailableDaysModel');
const { forEach } = require('async');
const { exists } = require('../models/AddBoatModel');
/***************************************************Import Methods and Functions******************************** */
// Function for AddNewShares//
const AddNewShares= ( req, res, next)=>
{
   
    const boat_id=mongoose.Types.ObjectId(req.body.Boat_Id); 
    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
     }

     
const Total_Days=Number(req.body.No_of_SummerWeekDays)+Number(req.body.No_of_SummerWeekEndDays)+Number(req.body.No_of_WinterWeekDays)+Number(req.body.No_of_WinterWeekEndDays);
console.log(Total_Days)
////////////////////////////
     // for updating weekend days jibin 5/22
  Boats.findByIdAndUpdate({_id:mongoose.Types.ObjectId(boat_id)}, 
    {            
        
                          
            Summer_WeekDays:req.body.No_of_SummerWeekDays,
            Summer_WeekEndDays:req.body.No_of_SummerWeekEndDays,  
            Winter_WeekDays:req.body.No_of_WinterWeekDays,
            Winter_WeekEndDays:req.body.No_of_WinterWeekEndDays, 
            Total_Days: Total_Days, 
               
    },
    {new: true},
    function(err, data) {
        
        console.log(data.Owners_Allowed)
    });
 // for updating weekend days jibin5/22

           let add_Shares = new shares({  
            Boat_Id:boat_id,                  
            No_of_Shares: req.body.No_of_Shares,
            No_of_SummerWeekDays: req.body.No_of_SummerWeekDays,
            No_of_SummerWeekEndDays: req.body.No_of_SummerWeekEndDays,  
            No_of_WinterWeekDays: req.body.No_of_WinterWeekDays,
            No_of_WinterWeekEndDays: req.body.No_of_WinterWeekEndDays,          
            Status:Module_status,
            Block:req.body.Block,
            IsActive:req.body.IsActive,
            Current_Time:moment(Date.now()),
            Updated_time: moment(Date.now())

        });
         
        add_Shares.save()
            .then(response => {
                res.json({
                    
                    status:true,
                    message: 'Shares Added Successfully',
                    data:response
                })
            })
            .catch(error => {
                res.json({
                    message: error
                })
            })
    
   
};
// Function for AddConsecutivDays//
const AddConsecutiveDays= ( req, res, next)=>
{
    const boat_id=mongoose.Types.ObjectId(req.body.Boat_Id);  
  
    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
     }
           let add_days = new consecutive({     
            Boat_Id:boat_id,
            Boat_Name:req.body.Boat_Name, 
            Summer_ConsecutiveDays: req.body.Summer_ConsecutiveDays,
            Winter_ConsecutiveDays: req.body.Winter_ConsecutiveDays,           
            Status:Module_status,
            Block:req.body.Block,
            IsActive:req.body.IsActive,
            Current_Time:moment(Date.now()),
            Updated_time: moment(Date.now())

        });
        add_days.save()
            .then(response => {
                res.json({
                    
                    status:true,
                    message: 'Consecutive Days Added Successfully',
                    data:add_days
                })
            })
            .catch(error => {
                res.json({
                    message: error
                })
            })
    
   
};
// Function for AddNextBookings//
const AddNextBookings= ( req, res, next)=>
{
    const boat_id=mongoose.Types.ObjectId(req.body.Boat_Id); 
    console.log(req.body);
    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
     }
           let add_bookings= new nextbooking({                  
            
            Boat_Id:boat_id,
            Boat_Name:req.body.Boat_Name,
            Next_BookingDay: req.body.Next_BookingDay,
            Status:Module_status,
            Block:req.body.Block,
            IsActive:req.body.IsActive,
            Current_Time:moment(Date.now()),
            Updated_time: moment(Date.now())

        });
         
        add_bookings.save()
            .then(response => {
                res.json({
                    
                    status:true,
                    message: 'NextBooking Day Added Successfully',
                    data:add_bookings
                })
            })
            .catch(error => {
                res.json({
                    message: error
                })
            })
    
   
};
// Function for EditNewShares
const EditNewShares = (req, res, next) => {
    const shareid = req.body._id
    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
     }
   shares.findByIdAndUpdate({_id:mongoose.Types.ObjectId(shareid)}, 
    { 
        No_of_Shares: req.body.No_of_Shares,
        No_of_SummerWeekDays: req.body.No_of_SummerWeekDays,
        No_of_SummerWeekEndDays: req.body.No_of_SummerWeekEndDays,  
        No_of_WinterWeekDays: req.body.No_of_WinterWeekDays,
        No_of_WinterWeekEndDays: req.body.No_of_WinterWeekEndDays,               
        Status:Module_status,
        Block:req.body.Block,
        IsActive:req.body.IsActive,
        Current_Time:req.body.Current_Time,
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
                message: 'Shares Updated Successfully'
               })
        }
    });  
};
// Function for EditConsecutivDays
const EditConsecutiveDays = (req, res, next) => {
    const daysid = req.body._id
    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
     }
    consecutive.findByIdAndUpdate({_id:mongoose.Types.ObjectId(daysid)}, 
    { 
        Summer_ConsecutiveDays: req.body.Summer_ConsecutiveDays,
        Winter_ConsecutiveDays: req.body.Winter_ConsecutiveDays,           
        Status:Module_status,
        Block:req.body.Block,
        IsActive:req.body.IsActive,
        Current_Time:req.body.Current_Time,
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
                message: 'Consecutive Days Updated Successfully'
               })
        }
    });  
};
// Function for EditNextBookings
const EditNextBookings = (req, res, next) => {
    const bookingid = req.body._id
    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
     }
    nextbooking.findByIdAndUpdate({_id:mongoose.Types.ObjectId(bookingid)}, 
    { 
        Next_BookingDay: req.body.Next_BookingDay,
        Status:Module_status,
        Block:req.body.Block,
        IsActive:req.body.IsActive,
        Current_Time:req.body.Current_Time,
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
                message: 'NextBooking Day Updated Successfully'
               })
        }
    });  
};
// Function for ListShares
const ViewAllShares= (req, res, next) => {  
    shares.find({IsActive:true})
        .then(response => {
            res.json({
                status:true,
                response
            })
        })
        .catch(error => {
            res.json({
                message: "No Data"
            })
        })
}
// Function for ListConsecutivDays
const ViewAllConsecutiveDays= (req, res, next) => {  
    consecutive.find({IsActive:true})
        .then(response => {
            res.json({
                status:true,
                response
            })
        })
        .catch(error => {
            res.json({
                message: "No Data"
            })
        })
}
// Function for ListNextBookings
const ViewAllNextBookings= (req, res, next) => {  
    nextbooking.find({IsActive:true})
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                status:true,
                message: "No Data"
            })
        })
}
//Function for Delete Shares
const DeleteShares = (req, res, next) => {
    const shareid = req.body._id
    shares.findByIdAndUpdate({_id:mongoose.Types.ObjectId(shareid)}, 
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
                message: 'Share Allocation Details Deleted Successfully'
               })
        }
    });  
}
//Function for Delete NextBookings
const DeleteNextBooking = (req, res, next) => {
    const bookingid = req.body._id
    nextbooking.findByIdAndUpdate({_id:mongoose.Types.ObjectId(bookingid)}, 
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
                message: 'Booking Details Deleted Successfully'
               })
        }
    });  
}
//Function for Delete Consecutive
const DeleteConsecutiveDays = (req, res, next) => {
    const bookingid = req.body._id
    consecutive.findByIdAndUpdate({_id:mongoose.Types.ObjectId(bookingid)}, 
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
                message: 'Consecutive Days Details Deleted Successfully'
               })
        }
    });  
}
//Get Days By Boat_Id jibin 5/26

const GetConsecutiveDaysByBoatId= (req, res, next) => {
    var boatid=req.body.Boat_Id;
   consecutive.findOne({Boat_Id:mongoose.Types.ObjectId(boatid)})
    .then(response => {
    res.json({
    Status:true,
    Data:response
    
    })
    })
    .catch(error => {
    res.json({
    Status:false,
    Data:'No Data'
    })
    })
    }


    //Get NextBooking By Boat_Id jibin 5/26

    const GetNextBookingDaysByBoatId= (req, res, next) => {
        var boatid=req.body.Boat_Id;
        nextbooking.findOne({Boat_Id:mongoose.Types.ObjectId(boatid)})
        .then(response => {
        res.json({
        Status:true,
        Data:response
        
        })
        })
        .catch(error => {
        res.json({
        Status:false,
        Data:'No Data'
        })
        })
        }

//Add UnavailabledaysForSingle


const AddUnavailabledaysSingle= ( req, res, next)=>
{
    var flag=0;

  var UnAvailableArr= req.body.UnAvailableDates;
var arr=[...new Set(UnAvailableArr)];
  console.log(arr)
    unavailableForAll.find({IsActive:true})
    .then(response => {
       
        var Results=JSON.stringify(response); 
               
               data = JSON.parse(Results);
            

               var array = [];
               data.forEach(function(item) {
    array.push(item.UnAvailableDates);
});
var merged = [].concat.apply([], array);


let uniqueChars = [...new Set(merged)];
console.log(uniqueChars ) 

try{



arr.forEach((e1)=>uniqueChars.forEach((e2)=>
{
    
    if(e1==e2)
    {
         flag=1; 
     
    }

    else
    {        
           
    }

   
}

));
}
catch(e)
{
    console.log('looop end');
}
   
    console.log(flag)
    if(flag==0)
    {



if(req.body.Status=="Enable")
{

    var  Module_status = 1;
}
else if (req.body.Status=="Disable")
{
    var Module_status = 0;
 }
 
 
 

       let add_UnAvailabledays = new unavailableSingle({ 

        Boat_Id:req.body.Boat_Id, 
        Boat_Name:req.body.Boat_Name, 
        UnAvailableDates:req.body.UnAvailableDates,         
        Status:Module_status,
        Block:req.body.Block,
        IsActive:true,
        Current_Time:moment(Date.now()),
        Updated_time: moment(Date.now())

    });


    

    add_UnAvailabledays.save()
        .then(response => {
            res.json({
                
                status:true,
                message: 'Added Successfully',
                data:response
                
            })
        })
        .catch(error => {
            res.json({
                status:false,
                message: 'cannot Add'
            })
        })    
    }
    else
    {
      
      
   

        res.json({
            status:false,
            message: 'Dates Not Available'
        })

    }
})
};



         
//Add And Update unavailable days

const AddUnavailabledaysForAll= ( req, res, next)=>
{
  
    unavailableForAll.count(function (err, count) {
        if (!err && count === 0) {
            if(req.body.Status=="Enable")
            {
        
                var  Module_status = 1;
            }
            else if (req.body.Status=="Disable")
            {
                var Module_status = 0;
             }
                   let add_UnAvailabledays = new unavailableForAll({               
                    UnAvailableDates:req.body.UnAvailableDates,         
                    Status:Module_status,
                    Block:req.body.Block,
                    IsActive:true,
                    Current_Time:moment(Date.now()),
                    Updated_time: moment(Date.now())
        
                });
                add_UnAvailabledays.save()
                    .then(response => {
                        res.json({
                            
                            status:true,
                            message: 'Added Successfully',
                            data:response
                        })
                    })
                    .catch(error => {
                        res.json({
                            status:false,
                            message: 'cannot Add'
                        })
                    })
            
        }

        else
        {
            if(req.body.Status=="Enable")
            {
        
                var  Module_status = 1;
            }
            else if (req.body.Status=="Disable")
            {
                var Module_status = 0;
             }

            unavailableForAll.findOneAndUpdate({},
            { 
                
                UnAvailableDates:req.body.UnAvailableDates,         
                Status:Module_status,
                Block:req.body.Block,
                IsActive:true,               
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
                        message: ' Updated Successfully'
                       })
                }

            });
        }
     
    });
};


//GetAll UnAvailable Days


const GetAllUnAvailableDays= (req, res, next) => {  
    unavailableForAll.find({IsActive:true})
        .then(response => {
            res.json({
                status:true,
                response
            })
        })
        .catch(error => {
            res.json({
                message: "No Data"
            })
        })
    }
//Get Unavialable days of Boats
        const GetUnAvailabeDaysOfBoats= (req, res, next) => {  
            unavailableSingle.find({IsActive:true})
                .then(response => {
                    res.json({
                        status:true,
                        response
                    })
                })
                .catch(error => {
                    res.json({
                        message: "No Data"
                    })
                })
            }

module.exports = {AddNewShares,AddConsecutiveDays,AddNextBookings,EditNewShares,EditConsecutiveDays,EditNextBookings,DeleteShares,DeleteNextBooking,DeleteConsecutiveDays,ViewAllShares,ViewAllConsecutiveDays,ViewAllNextBookings,GetConsecutiveDaysByBoatId,GetNextBookingDaysByBoatId,AddUnavailabledaysForAll,AddUnavailabledaysSingle,GetAllUnAvailableDays,GetUnAvailabeDaysOfBoats}