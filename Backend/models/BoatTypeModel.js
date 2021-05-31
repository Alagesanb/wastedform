const mongoose = require("mongoose")
var schema = mongoose.Schema;

var boattypeschema = new schema({
    
    Boat_Type:
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
module.exports = mongoose.model('Tb_BoatType', boattypeschema);