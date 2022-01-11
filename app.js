const database = require('./database');
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) =>{
    res.send("home");
})

app.get("/push_data", (req, res) =>{
    res.send("push");
})

app.post("/push_data", (req, res) =>{
    
    database.getConnection((err, con) => {
        con.query(`UPDATE online set grid_1 = ?, grid_2 = ?, grid_3 = ?, grid_4 = ?, grid_5 = ?, grid_6 = ?, grid_7 = ?, grid_8 = ?`, [req.body.val1,req.body.val2,req.body.val3,req.body.val4,req.body.val5,req.body.val6,req.body.val7,req.body.val8],
            (err, result) => {
        if (err) {
            con.release();
            return res.status(404).json({ err });
        }
        con.release();
        });
    });   
    return res.json({ header: "Post status OK", message: 'No errors.' }) 
})

app.get("/get_data", (req, res) =>{
    var fuf;
    database.getConnection((err, con) => {
        con.query(`Select * from online`,
            (err, result) => {
        if (err) {
            con.release();
            return res.status(404).json({ err });
        }
        fuf = result;       
        con.release();
        return res.json(fuf);
        });
    });       
})


app.listen(6969, () => {
    console.log("Server started");
})