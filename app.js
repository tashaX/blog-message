var express = require("express");
var session = require("express-session");
var path = require("path");
var bodyParser = require("body-parser");
var user = require('./user');
var post = require('./post');
var user_id;

var app = express();
app.use(express.static(path.join(__dirname,"/html")));
app.use(bodyParser.json());

app.use(session({secret: 'my-secret'}));
var sessions;

app.listen(7777, function() {
	console.log("Started listening on port", 7777);
});

app.get('/home', function(req, res) {
	if(sessions && sessions.username) {
		res.sendFile(__dirname + '/html/home.html');
	}
	else{
		res.send('unauthorized');
	}
});
	
app.post('/signin', function(req, res) {
	sessions = req.session;
	var user_name = req.body.email;
	var password = req.body.password;
	
	user.validateSignIn(user_name, password, function(result, id) {
		if(result){
			sessions.username = user_name;
			user_id = id;
			res.send('success');	
		}
		else {
			res.send("fail");
		}
	});
	
});

app.post('/signup', function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	
	if (name && email && password) {
		user.signup(name, email, password, function(result) {
		res.send(result);
		});
	}
	
	else {
		res.send('failure');
	}
});

app.post('/addpost', function(req, res) {
	var title = req.body.title;
	var subject = req.body.subject;
	var id = req.body.id;
	var date = req.body.date
	var time = req.body.time;
	
	if(id == '' || id == undefined) {
		console.log('add');
		post.addPost(title, subject, user_id, date, time, function(result) {
			res.send(result);
		});
	}
	else {
		console.log('update', title, subject);
		post.updatePost(id, title, subject, date, time, function(result) {
			res.send(result);
		});
	}

});

app.post('/getpost', function(req, res) {
	post.getPost(user_id, function(result) {
		res.send(result);
	});
});

app.post('/getPostWithId', function(req, res) {
	var title = req.body.title;
	var subject = req.body.subject;
	var id = req.body.id;
	post.getPostWithId(id, function(result) {
		res.send(result);
	});	
	
});

app.post('/deletePost', function(req, res) {
	var id = req.body.id;
	post.deletePost(id, function(result) {
		res.send(result);
	});
});