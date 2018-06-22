var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var port = 4100;
var MongoClient = require('mongodb').MongoClient;  

app.post('/login', (req, res) =>{
    connectMongoDB(req.body);
});

function connectMongoDB(req) {
    var url = "mongodb://localhost:27017/data";  
    MongoClient.connect(url, function(err, db) {  
        if (err) throw err;  
        var dbo = db.db("droidtechknow");
        dbo.collection("login").find({}).toArray(function(err, dbResult) {  
          if (err) throw err;  
          authenticateUser(req, dbResult)
          db.close();  
        });  
      });  
}

function authenticateUser(req, dbResult) {
    for(var i=0;i<dbResult.length;i++) {
        if(dbResult[i].username == req.email && dbResult[i].password == req.password) {
            console.log('successfully login')
        } else {
            console.log('please check your email and password')
        }
    }
}
// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

