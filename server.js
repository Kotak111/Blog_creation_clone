const express = require('express')
const app = express()
const blogroute=require("./rourtes/blog.route")
const authroute=require("./rourtes/user.route")
const cookieParser=require("cookie-parser")
const port = process.env.PORT
require("./config/db")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
app.use(cookieParser());


app.use("/api/v1/auth",authroute)
app.use("/api/v1/blog",blogroute)
app.get("/",(req,res)=>{
    res.send("<center><h1>Blog Creation App All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111 target=_blank>Repository :- Blog_creation_clone</a></center>")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))