var express = require('express');
var bodyParser = require('body-parser');
var app = express();
cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser("secret"))

var port = 4100;
var MongoClient = require('mongodb').MongoClient;  

app.post('/login', (req, res) =>{
    connectMongoDBForLogin(req.body, res);
});


function connectMongoDBForLogin(req, res) {
    var url = "mongodb://localhost:27017/data";  
    MongoClient.connect(url, function(err, db) {  
        if (err) throw err;  
        fetchDatabaseResults(req, res, db)
      });  
}

function fetchDatabaseResults(req, res, db){
    var dbo = db.db("droitechknow");
    dbo.collection("login").find({}).toArray(function(err, dbResult) {  
        if (err) throw err;  
        authenticateUser(req, dbResult, res)
        db.close();  
      });  
}

function authenticateUser(req, dbResult, res) {
    for(var i=0;i<dbResult.length;i++) {
        if(dbResult[i].email == req.email && dbResult[i].password == req.password) {
            var userInfo = userInformation(dbResult[i])
            setCookie(req ,res, userInfo['token']);
            console.log('successfully login')
            res.end(JSON.stringify(userInfo));  
            break;
        } else {
            res.end(null);
            console.log('please check your email and password')
        }
    }
}

function userInformation(userData) {
    var userInfo = {
        'name': userData.name,
        'email': userData.email,
        'id': userData._id,
        'token': generateToken(userData.email),
        'usertype': userData['usertype'],
        'loginData': Date()
    }
    return userInfo;
}

function generateToken() {
    return 'yt2498gsdyf873ey923ue9gyweuduiwe89di';
}

function setCookie(req, res, token) {
    var token = token
    // read cookies
    console.log(req)
    res.cookie('public-token', token, {expire: 360000 + Date.now()});
}

// sign up

app.post('/signup', (req, res) =>{
    connectMongoDBforsignUp(req.body, res);
});

function connectMongoDBforsignUp(req, res) {
    var url = "mongodb://localhost:27017/data";  
    MongoClient.connect(url, function(err, db) {  
        if (err) throw err;  
        writeIntoDabase(req, res, db)
      });  
}

function writeIntoDabase(req, res, db){
    var dbo = db.db("droitechknow");
    var user = {
        name: req.username,
        email: req.email,
        password: req.password,
        usertype: req.usertype
    }
    dbo.collection("login").insertOne(user, (err, response)=> {  
    if (err) throw err;  
    res.end(JSON.stringify(user));  
    console.log("1 record inserted");
    db.close();  
    });  
}

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

