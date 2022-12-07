const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

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
                    where C.cid = ${cid}`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
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
    const sql = `select * from Group2_Categories where cid = ${cid}`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
        }
    })
});


// sub-category by sid
app.get("/get-sub-category-by-sid", function (req, res) {
    const sid = req.query.sid;
    const sql = `select * from Group2_Products P 
                    left join Group2_Categories C on C.sid = P.sid
                    where P.sid = ${sid}`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
        }
    })
});


// // product by pid (TQH)
// app.get("/get-product-by-pid", function (req, res) {
//     const pid = req.query.pid;
//     const sql = `select * from Group2_Products P
//                     left join Group2_Categories Cate on Cate.sid = P.sid
//                     where P.pid = ${pid}; select * from Group2_Medias where pid = ${pid}` ;
//     conn.query(sql, function (err, data) {
//         if(err){
//             res.status(403).send("Error");
//         }else if(data.length > 0){
//             var p = data[0][0];
//             p.medias= data[1];
//             res.send(p);
//         }else{
//             res.status(404).send("404 not found");
//         }
//     })
// });

// product by pid
app.get("/get-product-by-pid", function (req, res) {
    const pid = req.query.pid;
    const sql = `select * from Group2_Products P
                    left join Group2_Medias M on M.pid = P.pid
                    left join Group2_Categories Cate on Cate.sid = P.sid
                    where P.pid = ${pid}`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
        }
    })
});


// similar product by pid/sid
app.get("/get-similar-product-by-pid", function (req, res) {
    const pid = req.query.pid;
    const sql = `select * from Group2_Products where sid in
                    (select sid from Group2_Products where pid = ${pid}) and pid != ${pid}`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
        }
    })
});


// collection by pid
app.get("/get-collection-by-pid", function (req, res) {
    const pid = req.query.pid;
    const sql = `select * from Group2_Products where collection in
                    (select collection from Group2_Products where pid = ${pid}) and pid != ${pid}`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
        }
    })
});


// review by pid
app.get("/get-review-by-pid", function (req, res) {
    const pid = req.query.pid;
    const sql = `select * from Group2_Reviews R
                    left join Group2_Customers C on C.cusid = R.cusid
                    where R.pid = ${pid} order by R.review_date desc`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
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
        }else{
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


// featured by sid
app.get("/get-featured-by-sid", function (req, res) {
    const sid = req.query.sid;
    const sql = `select * from Group2_Products P
                    left join Group2_Categories C on C.sid = P.sid
                    left join Group2_OrderItems O on O.pid = P.pid
                    where P.sid = ${sid} order by O.quantity desc`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
        }
    })
});


// featured by cid
app.get("/get-featured-by-cid", function (req, res) {
    const cid = req.query.cid;
    const sql = `select * from Group2_Products P
                    left join Group2_Categories C on C.sid = P.sid
                    left join Group2_OrderItems O on O.pid = P.pid
                    where C.cid = ${cid} order by O.quantity desc`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
        }
    })
});


// new arrivals
app.get("/get-new-arrival", function (req, res) {
    const sql = `select * from Group2_Products order by pid desc limit 9`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});


// top 12 best seller
app.get("/get-best-seller", function (req, res) {
    const sql = `select * from Group2_Products where pid in
                    (select pid from Group2_OrderItems group by pid order by quantity desc)`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});


// search product by keyword
app.get("/search-product", function (req, res) {
    const keyword = req.query.keyword;
    const sql = `select * from Group2_Products P
                    left join Group2_Categories C on C.sid = P.sid
                    where P.name like '%${keyword}%' or P.material like '%${keyword}%'
                    or P.collection like '%${keyword}%' or P.jewellery_type like '%${keyword}%'
                    or C.cate_name like '%${keyword}%' or C.sub_name like '%${keyword}%'`;
    conn.query(sql, function (err, data) {
        if(err){
            res.status(403).send("Error");
        }else if(data.length > 0){
            res.send(data);
        }else{
            res.status(404).send("404 not found");
        }
    })
});


// TEST get all product
app.get("/get-all-product", function (req, res) {
    const sql = `select * from Group2_Products`;
    conn.query(sql, function (err, data) {
        if(err){
            res.send("404 not found");
        }
        else{
            res.send(data);
        }
    })
});