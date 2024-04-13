const mongoose  = require('mongoose');

const  userschema =  new mongoose.Schema({
    name:String,
    email:String,
    address:String  
});

module.exports = mongoose.model('studinfos',userschema);