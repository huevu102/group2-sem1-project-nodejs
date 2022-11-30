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
app.get("/get-category-by-cid", function (req, res) {
    const cid = req.query.cid;
    const sql = `select * from Group2_Products P
                    left join Group2_Categories C on C.sid = P.sid
                    where C.cid =` + cid;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});


// category
app.get("/get-category", function (req, res) {
    const sql = `select distinct C.cid, C.cate_name
                    from Group2_Products P left join Group2_Categories C on C.sid = P.sid`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});



// sub-category by cid
app.get("/get-sub-category-by-cid", function (req, res) {
    const cid = req.query.cid;
    const sql = `select * from Group2_Categories where cid = ` + cid;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});


// sub-category by sid
app.get("/get-sub-category-by-sid", function (req, res) {
    const sid = req.query.sid;
    const sql = `select * from Group2_Products P 
                    left join Group2_Categories C on C.sid = P.sid
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
app.get("/get-product-by-pid", function (req, res) {
    const pid = req.query.pid;
    const sql = `select * from Group2_Products P
                    left join Group2_Medias M on M.pid = P.pid
                    left join Group2_Categories Cate on Cate.sid = P.sid
                    where P.pid =` + pid;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});


// similar product by pid/sid
app.get("/get-similar-product-by-pid", function (req, res) {
    const pid = req.query.pid;
    const sql = `select * from Group2_Products where sid in
                    (select sid from Group2_Products where pid = ` + pid + `)`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});


// review by pid
app.get("/get-review-by-pid", function (req, res) {
    const pid = req.query.pid;
    const sql = `select * from Group2_Reviews R
                    left join Group2_Customers C on C.cusid = R.cusid
                    where R.pid = ` + pid;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
});


// rings
app.get("/get-rings", function (req, res) {
    const sql = `select * from Group2_Products P left join Group2_Categories C on C.sid = P.sid
                    where C.cate_name like 'Rings'`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});


// earrings
app.get("/get-earrings", function (req, res) {
    const sql = `select * from Group2_Products P left join Group2_Categories C on C.sid = P.sid
                    where C.cate_name like 'Earrings'`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});


// bracelets
app.get("/get-bracelets", function (req, res) {
    const sql = `select * from Group2_Products P left join Group2_Categories C on C.sid = P.sid
                    where C.cate_name like 'Bracelets'`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});


// necklaces
app.get("/get-necklaces", function (req, res) {
    const sql = `select * from Group2_Products P left join Group2_Categories C on C.sid = P.sid
                    where C.cate_name like 'Necklaces'`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});


// TEST all product
app.get("/get-all-product", function (req, res) {
    const sql = `select * from Group2_Products P left join Group2_Categories C on C.sid = P.sid`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
})