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

// category by Categories_id
app.get("/get-category", function (req, res) {
    const cateId = req.query.cateId;
    const sql = `select * from Group2_Products where cid in (select cid from Group2_Categories where Categories_id = '${cateId}')`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});

// sub-category by cid
app.get("/get-sub-category", function (req, res) {
    const subId = req.query.subId;
    const sql = `select * from Group2_Products where cid =` + subId;
    console.log(sql);
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
    const sql = `select * from Group2_Products P left join Group2_Medias M on P.pid = M.pid
       where P.pid =` + pid;
    console.log(sql);
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