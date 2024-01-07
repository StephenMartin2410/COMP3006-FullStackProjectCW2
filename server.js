//stephenmartincockerham
//WjHedC3BGqTCbQsO
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
let mongoose = require("mongoose");
let mongourl = "mongodb+srv://stephenmartincockerham:WjHedC3BGqTCbQsO@cluster0.kgj3hbh.mongodb.net/Library?retryWrites=true&w=majority";
// Define a Schema
let bookSchema = new mongoose.Schema({_id: mongoose.Schema.ObjectId, BookName: String});
let userSchema = new mongoose.Schema({_id: mongoose.Schema.ObjectId, UserName: String});
let loginSchema = new mongoose.Schema({_id: mongoose.Schema.ObjectId, UserName: String, Password: String});
// Define a Model
let bookModel = mongoose.model("books", bookSchema);
let userModel = mongoose.model("users", userSchema);
let loginModel = mongoose.model("logins", loginSchema);
startup();

let userCollection;
let bookCollection;
let loginCollection;

async function startup(){
    mongoose.connect(mongourl, {useUnifiedTopology: true, useNewUrlParser: true}).then(
        function(value){
            getBooks();
            getUsers();
            getLogins();
        }
    );
}
async function getBooks(){
    bookModel = mongoose.model("books", bookSchema);
    bookCollection = await bookModel.find();
    console.log(bookCollection);
    return bookCollection;
}
async function getUsers(){
    bookModel = mongoose.model("users", userSchema);
    userCollection = await userModel.find();
    console.log(userCollection);
    return userCollection;
}
async function getLogins(){
    loginModel = mongoose.model("logins", loginSchema);
    loginCollection = await loginModel.find();
    console.log(loginCollection);
    return loginCollection;
}

//websockets
let express = require("express");
let path = require("path");
let http = require("http");
let socketIo = require("socket.io");
// Set up the app and server.
let app = express();
let server = http.createServer(app);
let socket = 3000;
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/login.html'));
  });
  app.get('/userloggedin', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
  app.get('/adminloggedin', function(req, res) {
    res.sendFile(path.join(__dirname, '/adminindex.html'));
  });
  app.listen(9000);


// Initialise the socket server.
const { WebSocketServer } = require('ws')
const websocket = new WebSocketServer({ port:3000 })

let connectedUsers = [];

websocket.on('connection', ws => {
    console.log("Client Connected")
    ws.binaryType = "arraybuffer";
    ws.binaryType = "blob";
    ws.on('close', () => console.log("Client Disconnected"))
    ws.onmessage = function(event){
        parseData = JSON.parse(event.data);
        console.log(parseData);
        console.log("username = " + parseData.username);
        console.log("password = " + parseData.password);
        let id = parseData.id;
        
        let loginFound = 0;

        loginCollection.forEach(user=> {
            //console.log("server:" + user.UserName + user.Password);
            if(parseData.username == user.UserName && parseData.password == user.Password){
                loginFound = 1;
            }
        })

        for(let i = 0; i <= connectedUsers.length; i++){
            console.log("Array = " + connectedUsers);
            //console.log("connectedUser          " + connectedUsers[i]);
            if(parseData.username == connectedUsers[i]){
                loginFound = 0;
            }
        }

        websocket.clients.forEach(client =>{
            let response={
                loginFound: loginFound,
                usernameInput : parseData.username,
                id: id
            }

            if(loginFound){
                connectedUsers.push(parseData.username);
                console.log(connectedUsers);
            }

            client.send(JSON.stringify(response));
        })
    }
})