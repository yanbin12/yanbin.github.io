const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'yanbin',
    database:'user',
    port:3306
});
//注册
router.use('/login',function(req,res){
    var user = req.body.user;
    var pass = req.body.pass;
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(`SELECT * FROM user WHERE user='${user}'`,function(err,rows){
            if(err) throw err;
            if(rows.length == 1){
                res.send('账号已被注册');

            }else{
                connection.query(`INSERT INTO user (user,pass) VALUES ('${user}','${pass}')`,function(err,rows){
                    if(err) throw err;
                    res.send('注册成功');
                    connection.release()

                })

            }

        })
    })

});
//登陆
router.use('/add',function(req,res){
    var user = req.body.user;
    var pass = req.body.pass;
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(`SELECT * FROM user WHERE user='${user}' AND pass='${pass}'`,function(err,rows){
            if(err) throw err;
            if(rows.length == 0){
                res.send('账号或密码错误')
            }else{
                res.send('登陆成功');
                connection.release();
            }
        })
    })
});







module.exports = router;