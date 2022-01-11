const database = require('./database');
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) =>{
    res.send("home");
})



app.post("/push_data", (req, res) =>{

    var body = req.body.fief;
    var val1;

    database.getConnection((err, con) => {
        con.query(`UPDATE online set grid_1 = ?, grid_2 = ?, grid_3 = ?, grid_4 = ?, grid_5 = ?, grid_6 = ?, grid_7 = ?`, [body,body,body,body,body,body,body],
            (err, result) => {
        if (err) {
            con.release();
            return res.status(404).json({ err });
        }
        con.release();
        });
    });    
    return res.json({ header: "ses", message: 'soos.' })
})

app.get("/get_data", (req, res) =>{


    database.getConnection((err, con) => {
        con.query(`Select * from online`,
            (err, result) => {
        if (err) {
            con.release();
            return res.status(404).json({ err });
        }
        console.log(result[0]);
        con.release();
        });
    });    
    return res.json({ header: "ses", message: 'soos.' })
})


app.listen(6969, () => {
    console.log("Server started");
})