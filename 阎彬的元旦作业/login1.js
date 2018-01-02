var express = require('express');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var app = express();

app.use(cookieParser('bfajhflaksfkabfljfpiafjafksafas'));

app.get('/loginup',function(req,res,next){
	fs.readFile('./login.txt',function(err,data){
		if(err){
			console.log(err);
			return
		}
		var json = eval('('+data+')');
		if(json[req.query.user]){
			res.send({num:'0'})
		}else{
			json[req.query.user] = req.query.pass;
			fs.writeFile('login.txt',JSON.stringify(json),function(err){
				if(err){
					console.log(err);
			        return
				}
				res.send({num:'1'})
			})
		}
	})
});

app.get('/login',function(req,res){
	req.secret = 'bfajhflaksfkabfljfpiafjafksafas';
	fs.readFile('./login.txt',function(err,data){
		if(err){
			console.log(err);
			return
		}
		var json = eval('('+data+')');
		console.log(req.query.pass);
		if(json[req.query.user] == req.query.pass){
			  if(eval('('+req.query.check+')')){
			 	res.cookie('user',req.query.user+'-'+req.query.pass,{maxAge:5*60*1000,signed:true})
			 }else{		 	
			 	res.clearCookie('user')
			 }
			res.send({num:'1'})
		}else{
			 
			res.send({num:'0'})
		}
	})
});

app.get('/keeplogin',function(req,res){
	var userjson = req.signedCookies;
	if(userjson.user){
		console.log(1);
		
	var user = userjson.user.split('-')[0];
	var pass = userjson.user.split('-')[1];
	fs.readFile('./login.txt',function(err,data){
		if(err){
			console.log(err);
			return
		}
		var json = eval('('+data+')');
		if(json[user] == pass){
			res.send({num:'1'})
		}else{
			 
			res.send({num:'0'})
		}
	})
	}else{
		console.log(1);
		res.send({num:'0'})
	}
	
});

app.use(express.static('./yanbin'));
app.listen(8004,function(){
	console.log('启动了')
})
