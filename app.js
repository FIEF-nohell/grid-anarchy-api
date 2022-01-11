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

    database.getConnection((err, con) => {
        con.query(`UPDATE online set grid_1 = ?, grid_2 = ?, grid_3 = ?, grid_4 = ?, grid_5 = ?, grid_6 = ?, grid_7 = ?`, [body[0],body[1],body[2],body[3],body[4],body[5],body[6]],
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
    return res.json({ header: "Request status OK", message: 'No errors.' })
})


app.listen(6969, () => {
    console.log("Server started");
})