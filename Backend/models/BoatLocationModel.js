const mongoose = require("mongoose")
var schema = mongoose.Schema;

var boatlocationschema = new schema({
    Location_id:
    {
        type: Number,
        required: true,
        unique: true
    },
    
    Boat_Location:
    {
        type: String,
        required: true,
    },
   
    Block:
    {
        type: Boolean,
        required:true,
    },
    IsActive:
    {
        type: Boolean,
        required:true,
    }


});
module.exports = mongoose.model('Tb_BoatLocation', boatlocationschema);