//AuthorName:JIBIN B RAJ
//File:Ownercontroller.js
//Module:ManageBoatOwners
//Created Date:13.03.2021
//Purpose:To Save the Details of adding a new Boat in the Database.

/***************************************************Import Packages and ViewModels Section******************************** */
const multer=require('multer')
const path = require('path'); 
const moment  = require('moment');
const jwt = require('jsonwebtoken')
const async = require('async')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')//Added By chitra on 13.04.2021
const crypto = require('crypto')//Added By chitra on 13.04.2021
const NewOwners = require('../models/AddOwnerModel');
const upload= require('../middleware/upload');
const Duration = require('../models/OwnershipDuration');  
const Boats=require('../models/AddBoatModel');
const Share=require('../models/ShareAllocationModel');
const ManageOwner=require('../models/ManageOwnerModel');
const mongoose = require("mongoose")
const addseason = require('../models/SeasonModel');//jibin
var loginData = require('../EmailCredentials');
const { gmail: { host, pass } } = loginData;
const { uuid } = require('uuidv4');

/***************************************************Import Methods and Functions******************************** */
// Function for Add Owner//Modified By Chitra on 13.04.2021
const AddOwner= ( req, res, next)=>
{
    console.log(req.body)
    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
     }
   var unhashedPW=req.body.Password;
   var Emailid=req.body.Email;
    //Added these lines by chitra for encrypting password on 13.04.2021
     bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        NewOwners.findOne({Email:Emailid}).then(results=>
            {

            if(!results)
            {
      
         let Add_Owner = new NewOwners({                  
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Home_Address: req.body.Home_Address,           
            Email: req.body.Email,
            Password:hashedPass,//Added by chitra   on 13.04.2021       
            Profile_Image:req.body.Profile_Image, 
            Profile_ImageOriginalName:req.body.Profile_ImageOriginalName, //Added by chitra   on 20.04.2021                          
            Mobile:req.body.Mobile,
            Family_Name:req.body.Family_Name,
            Parking_Ability:req.body.Parking_Ability, 
            Sailing_Ability:req.body.Sailing_Ability,
            Housekeeping:req.body.Housekeeping,
            Notes:req.body.Notes,
            Emergency_Contact_Name:req.body.Emergency_Contact_Name,
            Emergency_Contact_Mobile:req.body.Emergency_Contact_Mobile,                  
            Block:req.body.Block,
            IsActive:req.body.IsActive,
            Status:Module_status,
            Current_Time:moment(Date.now()),
            Updated_time: moment(Date.now())

        });
         
        Add_Owner.save()
            .then(response => {
                 //mail           

    var transporter = nodemailer.createTransport({

        service: 'Gmail',
       
        auth: {                  
            user:"noreply.smartboatbooking@gmail.com",
            pass:"Smart@123!!!"
          
            
        }
        
    });

    var mailOptions = {
       
        from:"noreply.smartboatbooking@gmail.com",
        to: response.Email,
        subject: 'LOGIN CREDENTIALS',
            
        text: 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        '<a href="http://65.2.28.16/owner-login' + '">Verify your Account</a>\n\n' +
        'Password'+':' + unhashedPW +'\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.json({
                status:true,
                info: 'Successfully send'
            })
        }
    });           


//mail
    
                res.json({
                    
                    status:true,
                    message: 'Owner Details Added Successfully'
              


                })
            })
            .catch(error => {
                res.json({
                    message: error
                })
            })
        }
        else {
            res.json({
                status:false,
                message: 'Email Already Exist'
            })
        } 
        });
    })
};
// Function for EditOwner//Done By chitra on 13.04.2021
const EditOwner = (req, res, next) => {
    const ownerid = req.body._id
    if(req.body.Status=="Enable")
    {

        var  Module_status = 1;
    }
    else if (req.body.Status=="Disable")
    {
        var Module_status = 0;
     }
    
//       if(req.body.Password != null || req.body.Password!=""){

//         bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
//         req.body.Password=hashedPass
       
        
//     })
      
// }
// else {

//     req.body.Password=null;
// }

     NewOwners.findByIdAndUpdate({_id:mongoose.Types.ObjectId(ownerid)},
    { 
        
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Home_Address: req.body.Home_Address,           
            Email: req.body.Email,
            Password:req.body.Password,  //Added by chitra   on 13.04.2021   
            Profile_Image:req.body.Profile_Image, 
            Profile_ImageOriginalName:req.body.Profile_ImageOriginalName, //Added by chitra   on 20.04.2021                                           
            Mobile:req.body.Mobile,
            Family_Name:req.body.Family_Name,
            Parking_Ability:req.body.Parking_Ability, 
            Sailing_Ability:req.body.Sailing_Ability,
            Housekeeping:req.body.Housekeeping,
            Notes:req.body.Notes,
            Emergency_Contact_Name:req.body.Emergency_Contact_Name,
            Emergency_Contact_Mobile:req.body.Emergency_Contact_Mobile,
            Block:req.body.Block,
            IsActive:req.body.IsActive,
            Status:Module_status,
            Current_Time:req.body.Current_Time,
            Updated_time: moment(Date.now())
    },
    {new: true},
    
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
                message: 'Owner Details Updated Successfully',
                data:req.body
               })
        }
    });  

     
};
//Function for Delete  Owner//Done By chitra on 13.04.2021
const DeleteOwner = (req, res, next) => {
    const ownerid = req.body._id
    var bool=new Boolean(false);
    NewOwners.findByIdAndUpdate({_id:mongoose.Types.ObjectId(ownerid)}, 
    { 
      
        IsActive:bool,
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
                message: 'Owner Deleted Successfully'
               })
        }
    });  
}
//Function for Enable/Disable Owner //Done By chitra on 19.04.2021
const EnableDisableOwner = (req, res, next) => {
    const ownerid = req.body._id
    if(req.body.Status=="Enable")
           {
       
            var  Module_status = 1;
           }
           else if (req.body.Status=="Disable")
           {
               var Module_status = 0;
            }
        
     NewOwners.findByIdAndUpdate({_id:mongoose.Types.ObjectId(ownerid)}, 
    { 
        Status:Module_status
            
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
                message: 'Owner Status Updated Successfully'
               })
        }
    });  
}
 //Manage Owner Table View

const GetSeasonDetailsById= (req, res, next) => {
    boatid=req.body.boatid;
    Boats.find({_id:mongoose.Types.ObjectId(boatid)})
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
 
//Function For FileUpload
const FileUploadSingle =(req,res,next)=>
{


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
const Fieldsize = 8 * 1024 * 1024;

var upload1 = multer({

storage: storage,
limits: { fileSize: maxSize,fieldSize:Fieldsize  },
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
 // add Duration
const AddDuration = (req, res, next) => {
    const boat_id=mongoose.Types.ObjectId(req.body.Boat_Id);  
    const owner_id=mongoose.Types.ObjectId(req.body.Owner_Id); 
    console.log(req.body)

    const D_start = new Date(req.body.From_Date);

    var D_start2=D_start.toLocaleString();
    var DurationS_Start= D_start2.split(' ')[0].replace(/,/g,'');
    const D_end = new Date(req.body.To_Date);
    var D_end2=D_end.toLocaleString();
    var DurationE_End= D_end2.split(' ')[0].replace(/,/g,'');


    let Add_Duration = new Duration({

        Owner_Id:owner_id,
        Owner_Name:req.body.Owner_Name,
        Boat_Id:boat_id,                
        Boat_Type:req.body.Boat_Type, 
        From_Date:req.body.From_Date,
        Duration_SDate:DurationS_Start,
        Duration_EDate:DurationE_End,
        To_Date:req.body.To_Date,          
        Block: req.body.Block,
        IsActive: true,
        Current_Time:moment(Date.now()),
        Updated_time: moment(Date.now())

    });
   
    Add_Duration.save()
        .then(response => {
            res.json({
                status:true,
                message: 'Duration Added Successfully'
            })
        })
        .catch(error => {
            res.json({
                status:false,
                message: error
            })
        })

}

// Function for EditDuration//Done by  chitra on 15.04.2021
const EditDuration = (req, res, next) => {

    const boat_id=mongoose.Types.ObjectId(req.body.Boat_Id);  
    const owner_id=mongoose.Types.ObjectId(req.body.Owner_Id); 
    console.log(req.body)

    const D_start = new Date(req.body.From_Date);

    var D_start2=D_start.toLocaleString();
    var DurationS_Start= D_start2.split(' ')[0].replace(/,/g,'');
    const D_end = new Date(req.body.To_Date);
    var D_end2=D_end.toLocaleString();
    var DurationE_End= D_end2.split(' ')[0].replace(/,/g,'');

    const durationid = req.body._id
    Duration.findByIdAndUpdate({_id:mongoose.Types.ObjectId(durationid)}, 
    { 
        
        Owner_Id:owner_id,
        Owner_Name:req.body.Owner_Name,
        Boat_Id:boat_id,                
        Boat_Type:req.body.Boat_Type, 
        From_Date:req.body.From_Date,
        Duration_SDate:DurationS_Start,
        Duration_EDate:DurationE_End,
        To_Date:req.body.To_Date,          
        Block: req.body.Block,
        IsActive: true,
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
                message: 'Ownership Duration Updated Successfully'
               })
        }
    });  
}

//Function for Delete Duration //Done by  chitra on 15.04.2021
const DeleteDuration = (req, res, next) => {
    const durationid = req.body._id
    var bool=new Boolean(false);
    Duration.findByIdAndUpdate({_id:mongoose.Types.ObjectId(durationid)}, 
    { 
      
        IsActive:bool,
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
                message: 'Duration Deleted Successfully'
               })
        }
    });  
}
// populate DropDown
const GetOwners = (req, res, next) => {  
    var mysort = { _id: -1 };
    NewOwners.find({IsActive:true}).select({_id:1,First_Name:1}).sort(mysort)//Added by chitra on 13.04.2021
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
const GetBoats = (req, res, next) => {  
    
    Boats.find({}).select({_id:1,Boat_Name:1})
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

//Share Allocation
const AddShare_Allocation = (req, res, next) => {
   

    let Add_Share = new Share({
        Owner_Name: req.body.Owner_Name,
        Boat_name:req.body.Boat_name, 
        Boat_Type:req.body.Boat_Type,               
        SharePercentage:req.body.SharePercentage,
        To_Date:req.body.To_Date,          
        Block: req.body.Block,
        IsActive: req.body.IsActive,
        Current_Time: req.body.Current_Time,
        Updated_time: req.body.Updated_time

    })
    Add_Share.save()
        .then(response => {
            res.json({
                status:true,
                message: 'AddShare Added Successfully'
            })
        })
        .catch(error => {
            res.json({
                status:false,
                message: 'invalid'
            })
        })

}


//Manage Owners
const GetBoatDetailsById= (req, res, next) => {
    let userid = req.body.userid
    Duration.findById(userid).select({Boat_Type:1,Boat_Name:1,_id: 0})
        .then(response => { 
                 //block
                 
                let x=response.Boat_Name
                console.log(x)
                Boats.find({Boat_Name:{ $regex: '.*' + x + '.*' }}).select({Owners_Allowed:1,_id: 0})
        .then(result => { 

const RESULTS = Object.assign({}, result, response);
var boats =RESULTS._doc;
var ownerallowed=RESULTS[0];

                res.send({
                Result:[
                    status=true,
                    Owners_Allowed=ownerallowed,
                    Boat_Details=boats
                ]
                  
                })
        
        }) 
         
        .catch(error => {
            res.json({
                status:false,
                message: 'AN ERROR OCCURED'
            })
     })
                 //block
                
        
        }) 
         
        .catch(error => {
            res.json({
                status:false,
                message: 'AN ERROR OCCURED'
            })
     })
    
    
    }
//Add Mange Owner

const AddMangeOwner = (req, res, next) => {
   console.log(req.body);
    const boat_id=mongoose.Types.ObjectId(req.body.Boat_Id);  
    const owner_id=mongoose.Types.ObjectId(req.body.Owner_Id); 
//   Boats.findByIdAndUpdate({_id:mongoose.Types.ObjectId(boat_id)},{new: true, useFindAndModify: false}, 
//     {                     
//     Owner_Name:req.body.Owner_Name,     
//     },
//     function(err, data) {
        
//         console.log(data.Owner_Name)
//     }); 

Boats.findById({_id:mongoose.Types.ObjectId(boat_id)}).then(response=>
    {  
        console.log(response.Owners_Allowed)
        Owners_Allowed=response.Owners_Allowed;
        console.log(Owners_Allowed,'owners')
       
    NewOwners.findById({_id:mongoose.Types.ObjectId(owner_id)}).then(results=>
        {
            ManageOwner.count({Boat_Id:boat_id}, function( err, count){
                console.log( "Number of users:", count );
            
            if(count<Owners_Allowed)
            {
           
    let AddMange_Owner  = new ManageOwner({

        Boat_Id:boat_id,
        Owner_Name: req.body.Owner_Name,      
        Boat_Name:req.body.Boat_Name, 
        Boat_Type:req.body.Boat_Type,               
        Home_Address:results.Home_Address,
        First_Name:results.First_Name,
        Last_Name:results.Last_Name,
        Mobile:results.Mobile,
        Family_Name:results.Family_Name,
        Email:results.Email,
        Owners_Allowed:response.Owners_Allowed,
       Parking_Ability:results.Parking_Ability,
       Summer_WeekDays:req.body.No_of_SummerWeekDays,
       Summer_WeekEndDays:req.body.No_of_SummerWeekEndDays,  
       Winter_WeekDays:req.body.No_of_WinterWeekDays,
       Winter_WeekEndDays:req.body.No_of_WinterWeekEndDays, 
       Sailing_Ability:results.Sailing_Ability,
        Profile_Image:results.Profile_Image,
        Profile_ImageOriginalName:results.Profile_ImageOriginalName,
        ShareAllocation:req.body.ShareAllocation,    
        Block: req.body.Block,
        IsActive: req.body.IsActive,
        Current_Time: req.body.Current_Time,
        Updated_time: req.body.Updated_time,
        Owner_Id:owner_id

    })
    
    AddMange_Owner.save()
        .then(response => {
            res.json({
                status:true,               
                message: ' Added Successfully'                
            })
        })
    
        .catch(error => {
            res.json({
                status:false,
                message: 'invalid'
            })
        })    
    }
    else {
        res.json({
            status:false,
            message: 'Allowed Owner Exceeds Limit'
        })
    } 
   
});
});
})
}


//View
const ViewAllOwners= (req, res, next) => {  
    NewOwners.find({IsActive:true})
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
const DeleteOwnersById= (req, res, next) => {  
    ownerid=req.body.ownerid;
    console.log(ownerid)
    NewOwners.findByIdAndDelete(ownerid)
        .then(response => {
            res.json({
                Status:true,
                message:'Deleted Succesfully'
            })
        })
        .catch(error => {
            res.json({
                Status:false
            })
        })
}

//Manage Owner Table  Details //Done by  chitra on 03.04.2021
const GetAllOwnerDetails = (req, res, next) => { 
    mongoose.model('Tb_ManageOwner').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatmasters",
    "localField": "Boat_Id",
    "foreignField": "_id",
    "as": "BoatDetails"
    }
   },
   {$sort: {"_id": -1}},
    {
    $project:{ Owner_Name:1,ShareAllocation: 1, Boat_Name:1,Family_Name:1,Mobile:1,Email:1,Profile_Image:1,Profile_ImageOriginalName:1,Home_Address:1, Parking_Ability:1,Sailing_Ability:1,First_Name:1,Last_Name:1,
        Summer_WeekDays:1,Summer_WeekEndDays:1,Winter_WeekDays:1,Winter_WeekEndDays:1,
         "BoatDetails.Summer_WeekEndDays": 1,
         "BoatDetails.Summer_WeekDays": 1,
         "BoatDetails.Winter_WeekEndDays":1,
        "BoatDetails.Winter_WeekDays": 1,
        "BoatDetails.Total_Days": 1,
        "BoatDetails._id": 1
                
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
// Function for Edit BoatDetails

const UpdateOwnerById = (req, res, next) => {
    const ownerid = req.body.ownerid
    //Added these lines by chitra for encrypting password on 13.04.2021
    bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
     NewOwners.findByIdAndUpdate({_id:mongoose.Types.ObjectId(ownerid)}, 
    { 
        
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Home_Address: req.body.Home_Address,           
            Email: req.body.Email,
            Password: hashedPass,  //Added by chitra   on 13.04.2021                     
            Mobile:req.body.Mobile,
            Family_Name:req.body.Family_Name,
            Parking_Ability:req.body.Parking_Ability,                   
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
                message: 'Owner Details Updated Successfully'
               })
        }
    });  
})
};
//Get Owners By Boat_Id
const GetOwnerDetailsByBoatId= (req, res, next) => {  
    boatid=req.body.boatid;
    console.log(boatid)
     ManageOwner.find({Boat_Id:mongoose.Types.ObjectId(boatid)})
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
//Manage Owner Table View Details //Done by  chitra on 03.04.2021
const GetAllOwnerDetailsTableView = (req, res, next) => { 
    mongoose.model('Tb_ManageOwner').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatmasters",
    "localField": "Boat_Id",
    "foreignField": "_id",
    "as": "BoatDetails"
    }
   },
    
    {
    $project:{"BoatDetails.Summer_WeekEndDays": 1,
    "BoatDetails.Summer_WeekDays": 1,
    "BoatDetails.Winter_WeekEndDays": 1,
    "BoatDetails.Winter_WeekDays": 1,
     Owner_Name:1,ShareAllocation: 1,  Boat_Name:1,
     Owners_Allowed:1,Boat_Id:1, Owner_Id:1,Boat_Type:1
      
                      
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

//manage owner delete
const DeleteManageOwnersById= (req, res, next) => {  
   const tableid=req.body.id;
    ManageOwner.findByIdAndDelete(tableid)
        .then(response => {
            res.json({
                Status:true,
                message:'Deleted Succesfully'
            })
        })
        .catch(error => {
            res.json({
                Status:false
            })
        })
}

//edit manage owner
const UpdateManageOwnerById = (req, res, next) => {
    const tableid=req.body.id;
    ManageOwner.findByIdAndUpdate({_id:mongoose.Types.ObjectId(tableid)}, 
    {               
        ShareAllocation:req.body.ShareAllocation,    
       
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
                message: 'OwnerDetails Updated Successfully'
               })
        }
    });  
}
//Manage Owner Table View Details //Done by chitra on 09.04.2021
const GetOwnerDetailsOneByOne = (req, res, next) => { 
    const BoatId = mongoose.Types.ObjectId(req.body.boat_id);
    mongoose.model('Tb_ManageOwner').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatmasters",
    "localField": "Boat_Id",
    "foreignField": "_id",
    "as": "BoatDetails"
    }
   },
   {
    "$match": { Boat_Id: BoatId }
},

    {
    $project:{"BoatDetails.Summer_WeekEndDays": 1,
    "BoatDetails.Summer_WeekDays": 1,
    "BoatDetails.Winter_WeekEndDays": 1,
    "BoatDetails.Winter_WeekDays": 1,
     Owner_Name:1,ShareAllocation: 1,  Boat_Name:1,
     Owners_Allowed:1,Boat_Id:1, Owner_Id:1,Boat_Type:1,Profile_Image:1,Profile_ImageOriginalName:1
      
                      
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

  //Function for Show BoatDetails using Particular Owner
//   const GetBoatDetailsByOwner = (req, res, next) => { 
//     const ownerid = mongoose.Types.ObjectId(req.body._id);
//     mongoose.model('Tb_ManageOwner').aggregate(
//         [
//     //     {
//     //     "$lookup":{
//     //     "from":"tb_manageowners",
//     //     "localField": "Owner_Id",
//     //     "foreignField": "Owner_Id",
//     //     "as": "OwnerDetails"
//     //     }
//     //    },
//        {
//        "$lookup":{
//         "from":"tb_addowners",
//         "localField": "Owner_Id",
//         "foreignField": "_id",
//         "as": "OwnerDetails"
//         }
//        },
//     {
//         "$match": { Owner_Id: ownerid }
//     },
    
    
//     {
//     $project:{"OwnerDetails.First_Name":1,"OwnerDetails.Last_Name":1,
//     "OwnerDetails.Home_Address":1,"OwnerDetails.Email":1,
//     "OwnerDetails.Mobile":1,
//     "OwnerDetails.Family_Name":1,"OwnerDetails.Parking_Ability":1,
//       Boat_Name: 1,
      
//             Boat_Facility:1,
//             Boat_Description:1,
//             Owners_Allowed: 1,
//             Launch_Date: 1,
//             PreLaunch_Date:1,
//             Boat_Image: 1,
//             Boat_HandBook:1,
//             Boat_Status:1,
//             Total_Days:1,
//             Summer_WeekDays:1,
//             Summer_WeekEndDays:1,
//             Winter_WeekDays:1,
//             Winter_WeekEndDays:1
          
//     }
//     }
//     ]
//     ).exec(function(err, response){
//     if (err)
//     {
//         res.json({
//             status:false,
//             message: 'AN ERROR OCCURED'
//         })
//     }
//     else
//     {
//         res.json({
//             status:true,
//             response
//         })

//     }
//      })
// }


 
 
  // Function for Owner login // Done By chitra on 19.04.2021
 const OwnerLogin = (req, res, next) => {
    var username = req.body.Email
    var password = req.body.Password
    
    NewOwners.findOne({ $or: [{ Email: username }, { Email: username  }] })
        .then(user => {           
            if (NewOwners) {
               try
               {
                
                bcrypt.compare(password, user.Password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
               
                    if (result) {
                        let token = jwt.sign({ name: user.Email }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            status:true,
                            message: ' Login Successfully',
                            data:user,
                            token
                        })
                    } 
                    else
                     {
                        res.json({
                            status:false,
                            message:'Password doesnot match'
                        })
                    }
                
                    })
               }
            
          catch(error)
          {
            res.json({
                status:false,
                message: 'No User Found'
            })
          }          
            
    }
  })
    
}
 //forget password

const ForgotPasswordOwner = (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            NewOwners.findOne({ Email: req.body.Email }, (err, user) => {
                if (!user) {
                    res.json({
                        status:false,
                        info: 'No user'
                    })
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save((err) => {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {

            

            var transporter = nodemailer.createTransport({

                service:'Gmail',
             
               
                auth: {                  
                    user:"noreply.smartboatbooking@gmail.com",
                    pass:"Smart@123!!!"
                   // user:"noreply.smartdata@gmail.com",
                   // pass:"Smartdata@data"
                    
                }
                
            });

            var mailOptions = {
                from:"noreply.smartboatbooking@gmail.com",
                to: user.Email,
                subject: 'SmartBoating',
                text: 'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    '<a href="http://localhost:4200/reset' + '">Verify your Account</a>\n\n' +
                    'token'+':' + token +'\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    res.json({
                        status:true,
                        info: 'Successfully send'
                    })
                }
            });           

        }
    ], function (err) {
            if (err)
                return next(err);
            else {
                res.json({
                    message: 'Error'
                })
            }
    });

}  

//reset Password
const ChangePassword = function (req, res) {
    bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
    async.waterfall([
        function (done) {
            NewOwners.findOne({ resetPasswordToken: req.body.resetPasswordToken
               // resetPasswordExpires: { $gt: Date.now() 
               // }
             }, function (err, user, next) {
                if (!user) {
                    res.json({
                        Status:false,
                        message: 'Invalid Token'
                    })
                }
                

                user.Password = hashedPass /*req.body.Password;*/ /*bcrypt.hash(req.body.Password, 10)*/
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save((err) => {
                    done(err, user);
                });
                
                              
            });
        },

        function (user, done) {
            // console.log('got this far 4')
            var smtpTrans = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user:"noreply.smartboatbooking@gmail.com",
                    pass:"Smart@123!!!"
                }
            });
            var mailOptions = {
                to: user.Email,
                from: "noreply.smartboatbooking@gmail.com",
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    ' - This is a confirmation that the password for your account ' + user.Email + ' has just been changed.\n'
            };
            smtpTrans.sendMail(mailOptions, function (err) {
                // req.flash('success', 'Success! Your password has been changed.');
               // done(err);
                res.json({
                    Status:true,
                    message: 'Successfully send'
                })
            });
        }
    ], function (err) {
            res.json({
                message: err
            })
    });
    })
}
//Get BoatDetails By Ownerid //Done by chitra on 17.05.2021
const GetBoatDetailsByOwner = (req, res, next) => { 
    const OwnerId = mongoose.Types.ObjectId(req.body.owner_id);
    mongoose.model('Tb_ManageOwner').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatmasters",
    "localField": "Boat_Id",
    "foreignField": "_id",
    "as": "BoatDetails"
    }
   },
 
   {
    "$match": { Owner_Id: OwnerId }
},

    {
    $project:{"BoatDetails.Summer_WeekEndDays": 1,
    "BoatDetails.Summer_WeekDays": 1,
    "BoatDetails.Winter_WeekEndDays": 1,
    "BoatDetails.Winter_WeekDays": 1,
    "BoatDetails.Location_Name": 1,
    "BoatDetails.Boattype_Name": 1,
    "BoatDetails.Location_Id": 1,
    "BoatDetails.Boattype_id": 1,
    "BoatDetails.Boat_Image":1,
     ShareAllocation: 1,  Boat_Name:1,
     Owners_Allowed:1,Boat_Id:1, Boat_Type:1,Profile_Image:1,Profile_ImageOriginalName:1
                      
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

//list api from Boat,ManageOwner

const GetAllOwnerssWithBoatDetails = (req, res, next) => { 
    mongoose.model('Tb_ManageOwner').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatmasters",
    "localField": "Boat_Id",
    "foreignField": "_id",
    "as": "BoatDetails"
    }
   },

   {
    "$lookup":{
    "from":"tb_addowners",
    "localField": "Owner_Id",
    "foreignField": "_id",
    "as": "OwnerDetails"
    }
   },
   {$sort: {"_id": -1}},
    {
    $project:{ 
        Owner_Id:1, _id:0,
         "BoatDetails.Summer_WeekEndDays": 1,
         "BoatDetails.Summer_WeekDays": 1,
         "BoatDetails.Winter_WeekEndDays": 1,
        "BoatDetails.Winter_WeekDays": 1,
        "BoatDetails.Total_Days": 1,
        "BoatDetails._id": 1,
        "BoatDetails.Boat_Name": 1,
        //ownerDetails
        "OwnerDetails.First_Name": 1,
        "OwnerDetails.Last_Name": 1,
        "OwnerDetails.Home_Address": 1,
       "OwnerDetails.Email": 1,
       "OwnerDetails.Parking_Ability": 1,
       "OwnerDetails.Profile_Image": 1,
       "OwnerDetails.Family_Name": 1,
       "OwnerDetails.ShareAllocation": 1,
       "OwnerDetails.Mobile": 1,
       "OwnerDetails.Profile_ImageOriginalName": 1
                
    }
    }
    ]
    ).exec(function(err, response){
        jsonObject =  response.map(JSON.stringify);
        
        uniqueSet = new Set(jsonObject);
        uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        const result = uniqueArray.reduce((acc, {Owner_Id, BoatDetails,OwnerDetails}) => {
            const existing = acc.find(i => i.Owner_Id === Owner_Id)
            if (existing) { existing.BoatDetails.push(BoatDetails) } 
            else {acc.push({Owner_Id,OwnerDetails,  BoatDetails: [BoatDetails]})}
            
            return acc
          }, [])
          
          console.log(result)
     
       
        res.json({
            status:true,
            result
        })
    })
}


//Manage Owner Table  Details //Done by  jibin 5/25
const GetBoatNameByOwnerId = (req, res, next) => { 
    const OwnerId = mongoose.Types.ObjectId(req.body.owner_id);
    mongoose.model('Tb_ManageOwner').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatmasters",
    "localField": "Boat_Id",
    "foreignField": "_id",
    "as": "BoatDetails"
    }
   },
 
   {
    "$match": { Owner_Id: OwnerId }
},

    {
    $project:{_id:0,
    "BoatDetails.Boat_Name": 1,
    "BoatDetails.Boattype_Name": 1,
    "BoatDetails._id": 1,
   
   
                          
    }
    }
    ]
    ).exec(function(err, results){
        jsonObject =  results.map(JSON.stringify);
        
        uniqueSet = new Set(jsonObject);
        response = Array.from(uniqueSet).map(JSON.parse);
       
        res.json({
            status:true,
            response
        })
    })
}

// list Duration


//View
const ListAllDuration= (req, res, next) => {  
    var mysort = { _id: -1 };
    Duration.find({IsActive:true}).sort(mysort )
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


//Get Details From Manage Owner
const GetAllOwnerDetails_FromManageOwner = (req, res, next) => { 
    mongoose.model('Tb_ManageOwner').aggregate(
    [
    {
    "$lookup":{
    "from":"tb_boatmasters",
    "localField": "Boat_Id",
    "foreignField": "_id",
    "as": "BoatDetails"
    }
   },
   {$sort: {"_id": -1}},
    {
    $project:{ Owner_Name:1,ShareAllocation: 1, Boat_Name:1,Family_Name:1,Mobile:1,Email:1,Profile_Image:1,Profile_ImageOriginalName:1,Home_Address:1, Parking_Ability:1,Sailing_Ability:1,First_Name:1,Last_Name:1,
        Summer_WeekDays:1,Summer_WeekEndDays:1,Winter_WeekDays:1,Winter_WeekEndDays:1,
       
        "BoatDetails._id": 1
                
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





module.exports = {AddOwner,EditOwner,DeleteOwner,AddDuration,GetAllOwnerDetails_FromManageOwner,
    EditDuration,DeleteDuration,GetOwners,GetBoats,AddShare_Allocation
    ,AddMangeOwner,ViewAllOwners,DeleteOwnersById,GetBoatDetailsById,
    UpdateOwnerById,GetSeasonDetailsById, FileUploadSingle,upload1,GetAllOwnerDetails,
    GetOwnerDetailsByBoatId,GetAllOwnerDetailsTableView,DeleteManageOwnersById,UpdateManageOwnerById,
    GetOwnerDetailsOneByOne,GetBoatDetailsByOwner,EnableDisableOwner,OwnerLogin,ForgotPasswordOwner,ChangePassword,GetAllOwnerssWithBoatDetails,GetBoatNameByOwnerId,ListAllDuration }
 
    