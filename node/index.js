const express = require('express');
require('./db/config');
let cors = require('cors');
const  user  = require('./db/users');
const app  = express();

app.use(express.json());

app.use(cors());
app.post('/singup',async(req,res)=>{
    let data =  new user(req.body);
    let result = await data.save();
    res.send(result);
});

app.get('/data',async(req,res)=>{
    let data = await user.find();
    res.send(data)
});


app.get('/find/:_id',async(req,res)=>{
    let data = await user.findOne({_id:req.params._id});
    res.send(data)
});

app.put('/update/:_id',async(req,res)=>{
    let data = await user.updateOne({ _id: req.params._id },{$set:{name:req.body.name,email:req.body.email,address:req.body.address}});
    console.log(data);
    res.send(data)
});

app.delete('/delete/:_id',async(req,res)=>{
    let data = await user.deleteOne({_id:req.params._id});
    console.log(data);
    res.send(data);
});

app.listen(4000);
