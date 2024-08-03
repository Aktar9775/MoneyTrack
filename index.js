const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/Money');
let db = mongoose.connection
db.on('error', ()=>console.log("Error In conncting Database"));
db.once('open', ()=>console.log("connected To DB"));


app.post("/add", (req, res)=>{
    var category = req.body.category
    var amount = req.body.amount
    var info = req.body.info
    var date = req.body.date

    var Data = {
        "Category" : category,
        "Amount" : amount,
        "Info" : info,
        "Date" : date,
    }

    db.collection('Data').insertOne(Data, (err, collection)=>{
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    })


})
app.get("/", (req, res)=>{
    res.set({"Allow-access-Allow-origin": '*'})
    return res.redirect('index.html')
})

app.listen(3000, ()=>{
    console.log("Server connected on 3000");
})
