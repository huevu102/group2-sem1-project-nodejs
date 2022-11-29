const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log("Server is running...");
});

// share api access all
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// config to connect mysql
const configDB = {
    host: "139.180.186.20",
    port: 3306,
    database: "t2207e",
    user: "t2207e",
    password: "t2207e123",
    multipleStatements: true
};

// connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// category by cid
app.get("/get-category", function (req, res) {
    const cid = req.query.cid;
    const sql = `select * from Group2_Products P
                    left join Group2_Categories C on P.sid = C.sid
                    where C.cid =` + cid;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});

// sub-category by sid
app.get("/get-sub-category", function (req, res) {
    const sid = req.query.sid;
    const sql = `select * from Group2_Products P 
                    left join Group2_Categories C on P.sid = C.sid
                    where P.sid =` + sid;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});


// product by pid
app.get("/get-product", function (req, res) {
    const pid = req.query.pid;
    const sql = `select * from Group2_Products P
                    left join Group2_Medias M on P.pid = M.pid
                    left join Group2_Categories C on P.sid = C.sid
                    where P.pid =` + pid;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});


// all product
app.get("/get-all-product", function (req, res) {
    const sql = `select distinct * from Group2_Products P
                    left join Group2_Medias M on P.pid = M.pid
                    left join Group2_Categories C on P.sid = C.sid
                    left join Group2_Reviews R on P.pid = R.pid
                    group by P.pid`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});


// TEST rings
app.get("/get-rings", function (req, res) {
    const sql = `select * from Group2_Products where cid in (select cid from Group2_Categories where Categories_Name like 'Rings')`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});