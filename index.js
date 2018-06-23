var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs')
cookieParser = require('cookie-parser');
var session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// serving angular files
app.use(express.static('angular-node'));
app.get('/', (req, response) =>{
    fs.readFile("angular-node/index.html", (err, data)=>{
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end(data);
      });
});
// *********
 
app.use(session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000 }
    }));

var port = 4100;
currectUser =''
var MongoClient = require('mongodb').MongoClient;  
var sessionId = '';
app.post('/login', (req, res) =>{
    connectMongoDBForLogin(req, res);
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
    var data = '';
    for(var i=0;i<dbResult.length;i++) {
        if(dbResult[i].email == req.body.email && dbResult[i].password == req.body.password) {
            data = dbResult[i];
        } 
    }
    if(data) {
        req.session.email = req.body.email
        sessionId  = 123;
        setTimeout(()=>{
            sessionId = null;
        }, 10000)
        var userInfo = userInformation(data)
        console.log('successfully login')
        res.end(JSON.stringify(userInfo));  
    } else {
        res.end(null);
        console.log('please check your email and password')
    }
}

function userInformation(userData) {
    var userInfo = {
        'name': userData.name,
        'email': userData.email,
        'id': userData._id,
        'token': sessionId,
        'usertype': userData['usertype'],
        'loginData': Date()
    }
    currectUser = userInfo;
    return userInfo;
}

// check login according to sessionID 
app.get('/check', (req, res) =>{
    if(sessionId) {
        res.end(JSON.stringify(currectUser));  
    } else {
        res.end(null)
    }
});

// sign up
app.post('/signup', (req, res) =>{
    connectMongoDBforsignUp(req, res);
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
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        usertype: req.body.usertype
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

