const mongoose = require("mongoose")
const express = require("express")
const user = require("./module")

const app = express()
app.use(express.json())

const url = "mongodb://127.0.0.1:27017/ayushDB"

const pr = mongoose.connect(url)

pr.then(()=>console.log("Database conetted"))
pr.catch(() => console.log("er"))

app.listen(9000,function(){
    console.log("Server is running at 9000")
})

app.get("/",async(req,res)=>
{
    try
    {
        const alluser = await user.find()
        res.json(alluser)
    }
    catch{
        res.json("Something went wrong")
    }
    
})

app.get("/:id",async(req,res)=>
{
    const uid = req.params.id;
    try
    {
        const oneuser = await user.findById(uid)
        res.json(oneuser)
    }
    catch
    {
        res.send("Something went wrong")
    }
})

app.post("/",async(req,res)=>
{
    try
    {
        const newuser = await user.create(req.body)
        res.json(newuser)
    }
    catch
    {
        res.send("something went wrong")
    }
})

app.put("/:id",async(req,res)=>
{
    const uid = req.params.id;
    try
    {
        const updateuser= await user.updateOne(
            {
                "_id" :uid
            },
            req.body
        )
        res.json(updateuser)
    }
    catch{
        res.send("Something went wrong")
    }
})

app.delete("/:id",async(req,res)=>
{
    const uid = req.params.id;
    try
    {
        const deletuser = await user.findById(uid)
        deletuser.deleteOne()
        res.send("Record deleted")
    }
    catch
    {
        res.send("Something went wrong")
    }
})

app.post("/login",async(req,res)=>{


    try
    {
        const dbuser = await user.findOne({name:req.body.name});

        if(dbuser == null)
        {
            res.send("no uer found ");
        }
        else
        {
            if(req.body.password == dbuser.password)
            {
                res.send("login sccess !!!")
            }
            else
            {
                res.send("invalid login")
            }
        }
    }
    catch
    {
        res.send("Something went wrong")
    }
})