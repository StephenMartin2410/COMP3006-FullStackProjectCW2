//stephenmartincockerham
//WjHedC3BGqTCbQsO
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
let mongoose = require("mongoose");
let mongourl = "mongodb+srv://stephenmartincockerham:WjHedC3BGqTCbQsO@cluster0.kgj3hbh.mongodb.net/Library?retryWrites=true&w=majority";
// Define a Schema
let bookSchema = new mongoose.Schema({_id: mongoose.Schema.ObjectId, BookName: String});
// Define a Model
let bookModel = mongoose.model("books", bookSchema);
startup();



async function startup(){
    mongoose.connect(mongourl, {useUnifiedTopology: true, useNewUrlParser: true}).then(
        function(value){
            getBooks();
        }
    );
}
async function getBooks(){
    bookModel = mongoose.model("books", bookSchema);
    let books = await bookModel.find();
    console.log(books);
    return books;
}
