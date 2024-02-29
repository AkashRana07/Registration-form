const express=require("express");
const app=express();
const path=require("path");
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const mongoose = require('mongoose');
app.set("views",path.join(__dirname,"/views"));
let port=3000;
app.listen(port,()=>{
    console.log("working");
})
app.set("view engine","ejs");
app.use(express.urlencoded({exended:true}));
app.use(express.json());
app.get("/",(req,res)=>{
    res.render("index.ejs");
})
async function mongodb(){
    await mongoose.connect('mongodb://127.0.0.1:27017/college')
    .then(() => console.log('Connected!'));
}
mongodb();
let sch=new mongoose.Schema({
    name:String,
    pass:String,
    email:String
})
const User=mongoose.model("User",sch);
app.post("/",(req,res)=>{
    let {name,pass,email}=req.body;
    console.log({name,pass,email});
    res.redirect("/");
    const user1=new User({name,pass,email});
    user1.save();
})
