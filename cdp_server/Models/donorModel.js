const mongoose = require("mongoose");

const donorSchema = mongoose.Schema({
    donorname: {type:String, required:true},
    contact: {type:Number, required:true},
    location: {type:String, required:true},
    address: {type:String, required:true},
    authid: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },

});
const donor = mongoose.model("donor", donorSchema);

module.exports = {donor}