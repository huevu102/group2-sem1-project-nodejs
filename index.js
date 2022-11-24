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

// category by Categories_Name
app.get("/get-category", function (req, res) {
    const cate = req.query.cate;
    const sql = `select * from Group2_Products where cid in (select cid from Group2_Categories where Categories_Name like '${cate}')`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});

// sub-category by Sub_Categories
app.get("/get-sub-category", function (req, res) {
    const subCate = req.query.subCate;
    const sql = `select * from Group2_Products where cid in (select cid from Group2_Categories where Sub_Categories like '${subCate}')`;
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