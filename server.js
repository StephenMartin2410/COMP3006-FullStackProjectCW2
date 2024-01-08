//stephenmartincockerham
//WjHedC3BGqTCbQsO
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
let mongoose = require("mongoose");
let mongourl = "mongodb+srv://stephenmartincockerham:WjHedC3BGqTCbQsO@cluster0.kgj3hbh.mongodb.net/Library?retryWrites=true&w=majority";
// Define a Schema
let bookSchema = new mongoose.Schema({_id: mongoose.Schema.ObjectId, BookName: String, Loaned: Boolean},{ versionKey: false });
let userSchema = new mongoose.Schema({_id: mongoose.Schema.ObjectId, UserName: String},{ versionKey: false });
let loginSchema = new mongoose.Schema({_id: mongoose.Schema.ObjectId, UserName: String, Password: String},{ versionKey: false });
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
    userModel = mongoose.model("users", userSchema);
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


//Creates
async function createBook(bookname, loanedInp){

    var book = {
        _id: new ObjectId(),
        BookName : bookname,
        Loaned : loanedInp
    }
    let response = await bookModel.create(book);
    console.log("create Book Response: " + response);
}
async function createUser(username){

    var user = {
        _id: new ObjectId(),
        UserName : username
    }
    let response = await userModel.create(user);
    console.log("create User Response: " + response);
}
async function createLogin(username, password){

    var login = {
        _id: new ObjectId(),
        UserName : username,
        Password : password
    }
    let response = await loginModel.create(login);
    console.log("create Login Response: " + response);
}

async function deleteBook(id){
    let response = await bookModel.findByIdAndDelete(id);
    console.log(response);
    getBooks();
}
async function deleteUser(id){
    let response = await userModel.findByIdAndDelete(id);
    console.log(response);
    getUsers();
}
async function deleteLogin(id){
    let response = await loginModel.findByIdAndDelete(id);
    console.log(response);
    getLogins();
}

async function editUser(id, name){
    let updateObj={
        UserName : name
    }
    let response = await userModel.findByIdAndUpdate(id, updateObj)
    console.log(response);
}
async function editLogin(id, name, password){
    let updateObj={
        UserName : name,
        Password : password
    }
    let response = await loginModel.findByIdAndUpdate(id, updateObj);
    console.log(response);
}
async function editBook(id, name, loan){
    console.log("loan -=----" + loan);
    let loanTemp;
    if(loan == "on"){
        loanTemp = true;
    }
    else{
        loanTemp = false;
    }
    let updateObj={
        BookName : name,
        Loaned : loanTemp
    }
    let response = await bookModel.findByIdAndUpdate(id, updateObj);
    console.log(response);
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
  
  app.get('/books', function(req, res) {
    res.json(bookCollection);
  });
  app.get('/users', function(req, res) {
    res.json(userCollection);
  });
  app.get('/logins', function(req, res) {
    res.json(loginCollection);
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
    ws.on('close', () => {

        console.log("Client Disconnected");
        connectedUsers = [];
        websocket.clients.forEach(client =>{
            let response = "marco";
            client.send((response));
        })
    
    
    })
    ws.onmessage = function(event){
        parseData = JSON.parse(event.data);
        console.log("parsed Data @" + event.data)
        refresh();
        if(parseData.type == "login"){
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
                if(parseData.username == connectedUsers[i]){
                    loginFound = 0;
                }
            } 


            let response={
                    loginFound: loginFound,
                    usernameInput : parseData.username,
                    id: id
            }


            websocket.clients.forEach(client =>{
                client.send(JSON.stringify(response));
            });

            if(loginFound == 1){
                connectedUsers.push(parseData.username);

                console.log("Array = " + connectedUsers);
            }

        }
        else if(parseData.type == "polo"){
            console.log("logging " + parseData.username);
            connectedUsers.push(parseData.username);
        }
        else if(parseData.type == "createBook"){
            createBook(parseData.Name, false);
        }
        else if(parseData.type == "createUser"){
            createUser(parseData.Name);
        }
        else if(parseData.type == "createLogin"){
            createLogin(parseData.Name, parseData.Password);
        }
        else if(parseData.type == "deleteBooks"){
            deleteBook(parseData.id);
        }
        else if(parseData.type == "deleteLogin"){
            deleteLogin(parseData.id);
        }
        else if(parseData.type == "deleteUser"){
            deleteUser(parseData.id);
        }
        else if(parseData.type == "editUser"){
            editUser(parseData.id, parseData.name);
        }
        else if(parseData.type == "editLogin"){
            editLogin(parseData.id, parseData.name, parseData.password);
        }
        else if(parseData.type == "editBook"){
            editBook(parseData.id, parseData.name, parseData.loan);
        }
    }
})
async function refresh(){
    getBooks();
    getUsers();
    getLogins();
}
function closeServer(){
    websocket.close();
    server.close(()=>{
        process.exit(0);
    })
}
module.exports.app = app;
module.exports.closeServer = closeServer;
