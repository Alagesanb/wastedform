//AuthorName:Chitra.V
//File:Boatcontroller.js
//Module:Add Boat
//Created Date:09.03.2021
//Purpose:To Save the Details of adding a new Boat in the Database.
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const async = require('async')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { Op } = require('sequelize')
const multer=require('multer')
const path = require("path"); 
const addseason = require('../models/SeasonModel');//jibin
const boattypemodel = require('../models/BoatTypeModel');
const boatmodel=require('../models/AddBoatModel');
const boat = require("../models/BoatTypeModel")
const location = require("../models/BoatLocationModel")
const GetBoatDetails=require('../models/AddBoatModel')//jibin
const moment  = require('moment');
const { uuid } = require('uuidv4');

// Function for Save BoatType
// Function for Save BoatType
const AddBoatType = (req, res, next) =>
{
const boattype=req.body.Boat_Type;
// const regex = new RegExp(boattype)
// console.log(regex)
boattypemodel.findOne({ Boat_Type:req.body.Boat_Type }, (err, response)=> {
    
    if(!response)
    {

let BoatType = new boattypemodel({
Boat_Type: req.body.Boat_Type,
Type_Description:req.body.Type_Description,
Block:req.body.Block,
IsActive:req.body.IsActive,
Current_Time: req.body.Current_Time,
Updated_time: req.body.Updated_time


})
BoatType.save()
.then(response => {
res.json({
status:true,
message: 'BoatType Details Added Successfully',
data:BoatType

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
        status:false,
        message: 'BoatType Already Exist'
    })

}

})
}  

// Function for Edit BoatType
const EditBoatType = (req, res, next) => {
    const type_id = req.body._id
    boattypemodel.findByIdAndUpdate({_id:mongoose.Types.ObjectId(type_id)},
    {
    
    Boat_Type: req.body.Boat_Type,
    Type_Description:req.body.Type_Description,
    Block:req.body.Block,
    IsActive:req.body.IsActive,
    Current_Time: req.body.Current_Time,
    Updated_time: req.body.Updated_time
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
    message: 'Boat Type Details Updated Successfully'
    
    })
    }
    });
    }
 // Function for Delete BoatType

const DeleteBoatType = (req, res, next) => {
    const type_id = req.body._id
    boattypemodel.findByIdAndDelete(type_id).then(response => {
    res.json({
    status:true,
    message:"Boat Type Details Deleted Successfully"
    })
    })
    .catch(error => {
    res.json({
    status:false,
    message: 'AN ERROR OCCURED'
    })
    })
    }

    //  Function for Show All BoatTypeDetails
const GetallBoatTypeDetails = (req, res, next) => {
boattypemodel.find()
.then(response => {
res.json({
status:true,
response
})
})
.catch(error => {
res.json({
status:false,
message: error
})
})
}
//Function for Show All BoatDetails
const GetallBoatDetails = (req, res, next) => { 
    mongoose.model('Tb_BoatMaster').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatlocations",
    "localField": "Location_Id",
    "foreignField": "_id",
    "as": "locationDetails"
    }
   },
    {
        "$lookup": {
            "from": "tb_boattypes",
            "localField": "Boattype_id",
            "foreignField": "_id",
            "as": "BoattypeDetails"
        }
    },
    {
        "$match":{$and:[{ IsActive: true,Boat_Status:"1" }]}
    },
    {
    $project:{"locationDetails.Boat_Location":1,"BoattypeDetails.Boat_Type":1,
      Boat_Name: 1,
            Boat_Facility:1,
            Boat_Description:1,
            Owners_Allowed: 1,
            Launch_Date: 1,
            PreLaunch_Date:1,
            Boat_Image: 1,
            Boat_originalimage:1,
            Boat_originalhandBook:1,
            Boat_HandBook:1,
            Boat_Status:1,
            Total_Days:1,
            Summer_WeekDays:1,
            Summer_WeekEndDays:1,
            Winter_WeekDays:1,
            Winter_WeekEndDays:1,
            SummerSeason_SDate:1,
            SummerSeason_EDate:1,
            WinterSeason_SDate:1,
            WinterSeason_EDate:1,
            Location_Id :1,
            Boattype_id:1,
            IsActive:1
          
    }
    },
    {
        "$sort": {
            "_id":-1
        }
    },
    ]
    ).exec(function(err, response){
        console.log(response);
        res.json({
            status:true,
            response
        })
    })
}
//Function for Show BoatDetails using id
const GetBoatDetailsById = (req, res, next) => { 
   
    const boatid = mongoose.Types.ObjectId(req.body._id);
  
    mongoose.model('Tb_BoatMaster').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatlocations",
    "localField": "Location_Id",
    "foreignField": "_id",
    "as": "locationDetails"
    }
   },
    {
        "$lookup": {
            "from": "tb_boattypes",
            "localField": "Boattype_id",
            "foreignField": "_id",
            "as": "BoattypeDetails"
        }
    },
    {
        "$match":{
          "$and":[
            {"_id":boatid},
            {"IsActive":true}
          ]
       }
      } ,
    {
    $project:{"locationDetails.Boat_Location":1,"BoattypeDetails.Boat_Type":1,
      Boat_Name: 1,
            Boat_Facility:1,
            Boat_Description:1,
            Owners_Allowed: 1,
            Launch_Date: 1,
            PreLaunch_Date:1,
            Boat_Image: 1,
            Boat_HandBook:1,
            Boat_Status:1,
            IsActive:1
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
// Function for Save BoatDetails
const AddNewBoat = (req, res, next) => 
{ 
    
    if(req.body.Boat_Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Boat_Status=="Disable")
    {
        var Module_status = 0;
     }
     else if (req.body.Boat_Status=="Archive")
     {
         var Module_status = 2;
      }
// for summer
var S_weekdays=0;
var S_Weekenddays=0;    
var W_weekdays=0;
var W_Weekenddays=0;
const S_start = new Date(req.body.SummerSeason_SDate);

 //var S_start2=S_start.toLocaleString();
var SummerS_Start=S_start.toDateString();

const S_end = new Date( req.body.SummerSeason_EDate);

//var S_end2=S_end.toLocaleString();
var SummerE_End= S_end.toDateString();

var dateDiff= Math.round((S_end -S_start)/(1000*60*60*24));
var Summer_dateDiff=dateDiff+1;
const sundays = Math.floor((Summer_dateDiff + (S_start.getDay() + 6) % 7) / 7); 
const weekenddays=2*sundays + (S_end.getDay()==6) - (S_start.getDay()==0); 
//console.log(weekenddays)
const weekdays=Summer_dateDiff-weekenddays;
//console.log(weekdays)
//for summer

//for winter
const W_start = new Date(req.body.WinterSeason_SDate);

//var W_start2=W_start.toLocaleString();
var WinterS_Start=W_start.toDateString();
//WinterS_Start=W_start.toDateString('mm/dd/yyyy');
const W_end = new Date( req.body.WinterSeason_EDate);
// var W_end2=W_end.toLocaleString();
var WinterE_End= W_end.toDateString();
// WinterE_End=W_end.toDateString('mm/dd/yyyy');
console.log(SummerS_Start,SummerE_End,WinterS_Start,WinterE_End);
var W_dateDiff= Math.round((W_end -W_start)/(1000*60*60*24));
var Winter_dateDiff=W_dateDiff+1;
const W_sundays = Math.floor((Winter_dateDiff + (W_start.getDay() + 6) % 7) / 7); 
const Winter_weekenddays=2*W_sundays + (W_end.getDay()==6) - (W_start.getDay()==0); 
//console.log(Winter_weekenddays)
const Winter_weekdays=Winter_dateDiff-Winter_weekenddays;
//console.log(Winter_weekdays)

//for winter

if(S_start!==null)
{
S_weekdays=weekdays;
S_Weekenddays=weekenddays;
//S_weekdays=weekdays.toFixed(0);//Added  by chitra on 15.04.2021
//S_Weekenddays=weekenddays.toFixed(0);//Added  by chitra on 15.04.2021
// console.log(S_weekdays);
// console.log(S_Weekenddays);
}
if(W_start!==null)
{
    W_weekdays=Winter_weekdays;
    W_Weekenddays=Winter_weekenddays;
   // W_weekdays=Winter_weekdays.toFixed(0);//Added  by chitra on 15.04.2021
  //  W_Weekenddays=Winter_weekenddays.toFixed(0);//Added  by chitra on 15.04.2021
    // console.log( W_Weekenddays);

}
const L_Date=new Date(req.body.Launch_Date); 
const P_Date=new Date(req.body.PreLaunch_Date);

//Total Days Count of Winter and Summer//Added By chitra on 30.03.2021
const Total_Days=Number(S_weekdays)+Number(S_Weekenddays)+Number(W_weekdays)+Number(W_Weekenddays);
////////////////////////////
if(P_Date.getTime() < L_Date.getTime()&& L_Date.getTime()<S_start.getTime()  && S_start.getTime()
<S_end.getTime() && S_end.getTime()<W_start.getTime() && W_start.getTime()< W_end.getTime() )
{
         console.log(req.body)
         let Add_Boat = new boatmodel({
            Boat_Name: req.body.Boat_Name,
            Boat_Facility: req.body.Boat_Facility,
            Boat_Description:req.body.Boat_Description,
            Location_Id: mongoose.Types.ObjectId(req.body.Location_Id),
            Boattype_id:mongoose.Types.ObjectId(req.body.Boattype_id),
            Location_Name:req.body.Location_Name,
            Boattype_Name:req.body.Boattype_Name,
            Owners_Allowed: req.body.Owners_Allowed,
            Launch_Date: req.body.Launch_Date,
            PreLaunch_Date: req.body.PreLaunch_Date,
            Boat_Image: req.body.Boat_Image,
            Boat_originalimage: req.body.Boat_originalimage,
            Boat_HandBook: req.body.Boat_HandBook,
            Boat_originalhandBook:req.body.Boat_originalhandBook,
            SummerSeason_SDate:req.body.SummerSeason_SDate,
            SummerSeason_EDate:req.body.SummerSeason_EDate,  
            WinterSeason_SDate:req.body.WinterSeason_SDate,
            WinterSeason_EDate:req.body.WinterSeason_EDate,  

            SummerS_SDate:SummerS_Start,
            SummerS_EDate:SummerE_End,
            WinterS_SDate:WinterS_Start,
            WinterS_EDate:WinterE_End,
            // Summer_WeekDays:S_weekdays,
            // Summer_WeekEndDays:S_Weekenddays,  
            // Winter_WeekDays:W_weekdays,
            // Winter_WeekEndDays:W_Weekenddays,  
            // Total_Days: Total_Days,   
            Block: req.body.Block,
            Boat_Status:Module_status,
            IsActive:req.body.IsActive,
            Current_Time:moment(Date.now()),
            Updated_time: req.body.Updated_time

        })
       
        Add_Boat.save()
            .then(response => {
                res.json({
                    status:true,
                    message: 'Boat Details Added Successfully',
                    data:Add_Boat           
                    
                })
            })
            .catch(error => {
                res.json({
                    status:false,
                    message: 'AN ERROR OCCURED'
                })
            })
        }
        else
        {
            res.json({
                status:false,
                message: 'Enter Proper Date Formats'
            })

        }
 }
//Function For FileUpload
const FileUploadSingle =(req,res,msg)=>
{
//  res.send(req.file.filename);
res.json({

    status:true,
    data:req.file,
    message:"Success,File Uploaded...!"
   })

}
var storage = multer.diskStorage({
destination: function (req, file, cb) {

// Uploads is the Upload_folder_name
cb(null, "uploads")
},
filename: function (req, file, cb) {
cb(null, uuid()+ path.extname(file.originalname))

}
})
const maxSize = 50 * 1024 * 1024;
const Fieldsize = 8 * 1024 * 1024;//jibin
var upload1 = multer({
storage: storage,
limits: { fileSize: maxSize,fieldSize:Fieldsize },
fileFilter: function (req, file, cb){

// Set the filetypes, it is optional
var filetypes = /jpeg|jpg|png|pdf|txt|doc/;
var mimetype = filetypes.test(file.mimetype);
var extname = filetypes.test(path.extname(
file.originalname).toLowerCase());
if (mimetype && extname) {
return cb(null, true);

}

cb("Error: File upload only supports the "
+ "following filetypes - " + filetypes);

}
}) 
 
 //Function for  Update the BoatDetails
  //Function for Update the BoatDetails
const EditBoat = (req, res, next) => {
    const boat_id = req.body.Boat_id
    if(req.body.Boat_Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Boat_Status=="Disable")
    {
        var Module_status = 0;
     }
     else if (req.body.Boat_Status=="Archive")
     {
         var Module_status = 2;
      }
    //jb
    
    var S_weekdays=0;
    var S_Weekenddays=0;
    var W_weekdays=0;
    var W_Weekenddays=0;
    const S_start = new Date(req.body.SummerSeason_SDate);

    //var S_start2=S_start.toLocaleString();
   var SummerS_Start=moment(S_start).format('DD-MM-YYYY');
   
   const S_end = new Date( req.body.SummerSeason_EDate);
   //SummerE_End=S_end.toDateString('mm/dd/yyyy');
   //var S_end2=S_end.toLocaleString();
   var SummerE_End= moment(S_end).format('DD-MM-YYYY');
   
    var dateDiff= Math.round((S_end -S_start)/(1000*60*60*24));
    console.log(dateDiff)
    var Summer_dateDiff=dateDiff+1;
    const sundays = Math.floor((Summer_dateDiff + (S_start.getDay() + 6) % 7) / 7);
    const weekenddays=2*sundays + (S_end.getDay()==6) - (S_start.getDay()==0);
    console.log(weekenddays)
    const weekdays=Summer_dateDiff-weekenddays;
    console.log(weekdays)
    //for summer
    
    //for winter
    const W_start = new Date(req.body.WinterSeason_SDate);

    //var W_start2=W_start.toLocaleString();
    var WinterS_Start=  moment(W_start).format('DD-MM-YYYY');
    //WinterS_Start=W_start.toDateString('mm/dd/yyyy');
    const W_end = new Date( req.body.WinterSeason_EDate);
    //var W_end2=W_end.toLocaleString();
    var WinterE_End= moment(W_end).format('DD-MM-YYYY');
    
    var W_dateDiff= Math.round((W_end -W_start)/(1000*60*60*24));
    var Winter_dateDiff=W_dateDiff+1;
    const W_sundays = Math.floor((Winter_dateDiff + (W_start.getDay() + 6) % 7) / 7);
    const Winter_weekenddays=2*W_sundays + (W_end.getDay()==6) - (W_start.getDay()==0);
    console.log(Winter_weekenddays)
    const Winter_weekdays=Winter_dateDiff-Winter_weekenddays;
    console.log(Winter_weekdays)
    
    //for winter
    
    if(S_start!==null)
    {
    S_weekdays=weekdays;
    S_Weekenddays=weekenddays;
    console.log(S_weekdays);
    console.log(S_Weekenddays);
    }
    if(W_start!==null)
    {
    
    W_weekdays=Winter_weekdays;
    W_Weekenddays=Winter_weekenddays;
    console.log( W_weekdays);
    console.log( W_Weekenddays);
    
    }
    const Total_Days=S_weekdays+S_Weekenddays+W_weekdays+W_Weekenddays;
    const L_Date=new Date(req.body.Launch_Date);
    const P_Date=new Date(req.body.PreLaunch_Date);
    //jb
    console.log(req.body.Launch_Date)
if(P_Date.getTime() < L_Date.getTime()&& L_Date.getTime()<S_start.getTime()  && S_start.getTime()<S_end.getTime() && S_end.getTime()<W_start.getTime() && W_start.getTime()< W_end.getTime() )
{
    boatmodel.findByIdAndUpdate({_id:mongoose.Types.ObjectId(boat_id)},
    {
    Boat_Name: req.body.Boat_Name,
    Boat_Facility: req.body.Boat_Facility,
    Boat_Description:req.body.Boat_Description,
    Location_Id: req.body.Location_Id,
    Boattype_id:req.body.Boattype_id,
    Boat_Status:req.body.Boat_Status,
    Location_Name:req.body.Location_Name,
    Boattype_Name:req.body.Boattype_Name,
    Owners_Allowed: req.body.Owners_Allowed,
    Launch_Date: req.body.Launch_Date,
    PreLaunch_Date: req.body.PreLaunch_Date,
    Boat_Image: req.body.Boat_Image,
    Boat_originalhandBook:req.body.Boat_originalhandBook,//Added by chitra on 09.04.2021
    Boat_HandBook: req.body.Boat_HandBook,
    Boat_originalimage: req.body.Boat_originalimage,//Added by chitra on 09.04.2021
    // SummerSeason_SDate:req.body.SummerSeason_SDate,
    // SummerSeason_EDate:req.body.SummerSeason_EDate,
    // WinterSeason_SDate:req.body.WinterSeason_SDate,
    // WinterSeason_EDate:req.body.WinterSeason_EDate,
            SummerS_SDate:SummerS_Start,
            SummerS_EDate:SummerE_End,
            WinterS_SDate:WinterS_Start,
            WinterS_EDate:WinterE_End,
    Total_Days: Total_Days,
    Block:req.body.Block,
    IsActive:req.body.IsActive,
    Boat_Status:Module_status,
    Current_Time: req.body.Current_Time,
    Updated_time:moment(Date.now()),
},
    
    function(err, data) {
    if(err){
    res.json({
    message: 'error'
    })
    }
    else{
    res.json({
    
    status:true,
    message: 'Boat Details Updated Successfully'
    })
    }
    });
}
else
{
    res.json({
        status:false,
        message: 'Enter Proper Date Formats'
    })

}
 }
    //Function for Delete the BoatDetails
    const DeleteBoat = (req, res, next) => {
        const boat_id = req.body._id
        boatmodel.findByIdAndUpdate({_id:mongoose.Types.ObjectId(boat_id)}, 
        {

            IsActive:false,
            Updated_time: moment(Date.now())
        },
      
        function(err, data) {
            if(err){
                res.json({
                    message: 'error'
                })
            }
            else{
                res.json({

                    status:true,
                    message: 'BoatDetails Deleted Successfully'
                   })
            }
        });  
    }
    const GetBoatType = (req, res, next) => {
        boat.find({}).select({_id:1,Boat_Type:1})
        .then(response => {
        res.json({
        response
        })
        })
        .catch(error => {
        res.json({
        message: error
        })
        })
        }
        const GetLocation = (req, res, next) => {  
            location.find({}).select({_id:1,Boat_Location:1})
                .then(response => {
                    res.json({
                        response
                    })
                })
                .catch(error => {
                    res.json({
                        message: error
                    })
                })
        }
  //Function for Show BoatDetails using LocationId
const GetBoatDetailsByLocation = (req, res, next) => { 
    const LocationId = mongoose.Types.ObjectId(req.body.Location_Id);
    mongoose.model('Tb_BoatMaster').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatlocations",
    "localField": "Location_Id",
    "foreignField": "_id",
    "as": "locationDetails"
    }
   },
    {
        "$lookup": {
            "from": "tb_boattypes",
            "localField": "Boattype_id",
            "foreignField": "_id",
            "as": "BoattypeDetails"
        }
    },
    {
        "$match": { Location_Id: LocationId }
    },
    
    
    {
    $project:{"locationDetails.Boat_Location":1,"BoattypeDetails.Boat_Type":1,
      Boat_Name: 1,
            Boat_Facility:1,
            Boat_Description:1,
            Owners_Allowed: 1,
            Launch_Date: 1,
            PreLaunch_Date:1,
            Boat_Image: 1,
            Boat_HandBook:1,
            Boat_Status:1,
            Total_Days:1,
            Summer_WeekDays:1,
            Summer_WeekEndDays:1,
            Winter_WeekDays:1,
            Winter_WeekEndDays:1
          
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
//Function for Show BoatDetails using LocationId
const PostBoatDetailsByLocation = (req, res, next) => { 
    const LocationId = mongoose.Types.ObjectId(req.body.Location_Id);
    mongoose.model('Tb_BoatMaster').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatlocations",
    "localField": "Location_Id",
    "foreignField": "_id",
    "as": "locationDetails"
    }
   },
    {
        "$lookup": {
            "from": "tb_boattypes",
            "localField": "Boattype_id",
            "foreignField": "_id",
            "as": "BoattypeDetails"
        }
    },
    {
        "$match": { Location_Id: LocationId }
    },
    
    
    {
    $project:{"locationDetails.Boat_Location":1,"BoattypeDetails.Boat_Type":1,
      Boat_Name: 1,
            Boat_Facility:1,
            Boat_Description:1,
            Owners_Allowed: 1,
            Launch_Date: 1,
            PreLaunch_Date:1,
            Boat_Image: 1,
            Boat_HandBook:1,
            Boat_Status:1,
            Total_Days:1,
            Summer_WeekDays:1,
            Summer_WeekEndDays:1,
            Winter_WeekDays:1,
            Winter_WeekEndDays:1
          
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
// code for Add Season Jibin
const AddSeason = (req, res, next) => {
    var S_weekdays=0;
    var S_Weekenddays=0;    
    var W_weekdays=0;
    var W_Weekenddays=0;
const start = new Date( req.body.Season_SDate);
console.log(start)
const end = new Date( req.body.Season_EDate);
var dateDiff= Math.round((end -start)/(1000*60*60*24));
console.log(dateDiff)
//working weekenddays


const sundays = Math.floor((dateDiff + (start.getDay() + 6) % 7) / 7); 
const weekenddays=2*sundays + (end.getDay()==6) - (start.getDay()==0); 
console.log(weekenddays)
const weekdays=dateDiff-weekenddays;
console.log(weekdays)
//working weekenddays

const seasontype=req.body.Season_Type;
if(seasontype=="Summer")
{
  S_weekdays=weekdays;
  S_Weekenddays=weekenddays;
console.log(S_weekdays);
console.log(S_Weekenddays);
}

else
{
  W_weekdays=weekdays;
  W_Weekenddays=weekenddays;
}
    
        let Add_Season = new addseason({
           
            Boat_Name:req.body.Boat_Name,
            Boat_Id:req.body.Boat_Id,
            Season_Type: req.body.Season_Type,
            Season_SDate:req.body.Season_SDate,
            Season_EDate:req.body.Season_EDate,  
            Summer_WeekDays:S_weekdays,
            Summer_WeekEndDays:S_Weekenddays,  
            Winter_WeekDays:W_weekdays,
            Winter_WeekEndDays:W_Weekenddays,     
            Block: req.body.Block,
            IsActive: req.body.IsActive,
            Current_Time: req.body.Current_Time,
            Updated_time: req.body.Updated_time

        })
        Add_Season.save()
            .then(response => {
                res.json({
                    status:true,
                    response
                })
            })
            .catch(error => {
                res.json({
                    status:false,
                    message: 'invalid'
                })
            })
   
}
 // launch filter
const LaunchFilter = (req, res, next) => {
    var Date1 = req.body.Launch_Date1
    // var Launch_Date1= moment(req.body.Launch_Date1).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //req.params.startTime = 2016-09-25 00:00:00
    var Date2 = req.body.Launch_Date2
    
    var Datetype=req.body.DateType
    console.log(Datetype)
    if(Datetype=="Launch_Date")
    {
    GetBoatDetails.find({ $or: [{ Launch_Date: { $gt:new Date(Date1), $lt:new Date(Date2) }}, { Launch_Date: { $gt:new Date(Date1), $lt: new Date(Date2) }}] })
    .then(response => {
    if (GetBoatDetails) {
    
    
    
    try
    {
    
    res.json({
    
    
        response
    })
    
    
    }
    
    catch(error)
    {
    res.json({
    status:false,
    message: 'No boat Found'
    })
    }
    
    
    
    }
    
    })
    }
    
    else
    {
    console.log('hiiiiiiiii')
    GetBoatDetails.find({ $or: [{ PreLaunch_Date: { $gt:new Date(Date1), $lt:new Date(Date2) }}, { PreLaunch_Date: { $gt:new Date(Date1), $lt: new Date(Date2) }}] })
    .then(response => {
    if (GetBoatDetails) {
    
    
    
    try
    {
    
    res.json({
    
    
        response
    })
    
    
    }
    
    catch(error)
    {
    res.json({
    status:false,
    message: 'No boat Found'
    })
    }
    
    
    
    }
    
    })
    }
    
    
    }
//Function for Multiple File Uploading
const FileUploadmany =(req,res,next)=>
{
    const files=[];
        req.files.forEach(item=>{
        files.push(item.filename,item.originalname.split(/\s/).join(''))
        })
    res.json({

        status:true,
        data:files,
        message:"Success,File Uploaded...!"
       })
  
//     const files=[];
//     req.files.forEach(item=>{
//     files.push(item.filename)
//     })
//  res.send(files);
    
}
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        console.log(file)
    //   callback(null, file.originalname)
    callback(null, uuid()+ path.extname(file.originalname)) 
    }
  });
  const Multi_maxSize = 50 * 1024 * 1024;//jibin
  const Multi_Fieldsize = 8 * 1024 * 1024;//jibin
  var upload = multer({ storage: storage,limits: { fileSize: Multi_maxSize,fieldSize: Multi_Fieldsize} });
//Function for Show Archive BoatDetails based on location
const GetArchieveBoatDetailsInLocation = (req, res, next) => {
    if(req.body.Boat_Status=="Archive")
    {
        var  Module_status = 2;
    }

    
    const LocationId = mongoose.Types.ObjectId(req.body.Location_Id); 
    mongoose.model('Tb_BoatMaster').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatlocations",
    "localField": "Location_Id",
    "foreignField": "_id",
    "as": "locationDetails"
    }
   },
   {
    "$match":{
      "$and":[
       {"Location_Id":LocationId},
        {"Boat_Status":Module_status.toString()},
        {"IsActive":true}
      ]
   }
  } ,
    {
    $project:{"locationDetails.Boat_Location":1,
      Boat_Name: 1,
            Boat_Facility:1,
            Boat_Description:1,
            Owners_Allowed: 1,
            Launch_Date: 1,
            PreLaunch_Date:1,
            Boat_Image: 1,
            Boat_originalimage:1,
            Boat_originalhandBook:1,
            Boat_HandBook:1,
            Boat_Status:1,
            Total_Days:1,
            Summer_WeekDays:1,
            Summer_WeekEndDays:1,
            Winter_WeekDays:1,
            Winter_WeekEndDays:1,
            SummerSeason_SDate:1,
            SummerSeason_EDate:1,
            WinterSeason_SDate:1,
            WinterSeason_EDate:1,
            Location_Id :1,
            Boattype_id:1,
            Boattype_Name:1
          
    }
   }
   ]
      ).exec(function(err, response){
        console.log(response);
        res.json({
            status:true,
            response
        })
    })
}
//Function for Show All Archive BoatDetails
const GetAllArchieveBoatDetails = (req, res, next) => {
    if(req.body.Boat_Status=="Archive")
    {
        var  Module_status = 2;
    }

    mongoose.model('Tb_BoatMaster').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatlocations",
    "localField": "Location_Id",
    "foreignField": "_id",
    "as": "locationDetails"
    }
   },
   {
    "$match":{
      "$and":[
        {"Boat_Status":Module_status.toString()},
        {"IsActive":true}
      ]
   }
  } ,
    {
    $project:{"locationDetails.Boat_Location":1,
      Boat_Name: 1,
            Boat_Facility:1,
            Boat_Description:1,
            Owners_Allowed: 1,
            Launch_Date: 1,
            PreLaunch_Date:1,
            Boat_Image: 1,
            Boat_originalimage:1,
            Boat_originalhandBook:1,
            Boat_HandBook:1,
            Boat_Status:1,
            Total_Days:1,
            Summer_WeekDays:1,
            Summer_WeekEndDays:1,
            Winter_WeekDays:1,
            Winter_WeekEndDays:1,
            SummerSeason_SDate:1,
            SummerSeason_EDate:1,
            WinterSeason_SDate:1,
            WinterSeason_EDate:1,
            Location_Id :1,
            Boattype_id:1,
            Boattype_Name:1
          
    }
   }
   ]
      ).exec(function(err, response){
        console.log(response);
        res.json({
            status:true,
            response
        })
    })
}

//get Boat Details From Boat Collection


const GetBoatDetailsByBoatId= (req, res, next) => {
    boatid=req.body.boatid;
    boatmodel.find({_id:mongoose.Types.ObjectId(boatid)})
    .then(response => {
    res.json({
    Status:true,
    Data:response
    
    })
    })
    .catch(error => {
    res.json({
    Status:false
    })
    })
    }

    



module.exports = {AddBoatType,GetLocation,GetBoatType,
    AddNewBoat,FileUploadSingle,upload1,upload,
    FileUploadmany,GetallBoatDetails,
    GetBoatDetailsById,EditBoat,DeleteBoat,
    AddSeason,LaunchFilter,
     GetBoatDetailsByLocation,
     GetallBoatTypeDetails,
     EditBoatType,
     DeleteBoatType,
     PostBoatDetailsByLocation,
     GetArchieveBoatDetailsInLocation,GetAllArchieveBoatDetails,GetBoatDetailsByBoatId }