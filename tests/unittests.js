let chai = require("chai");
var chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');
var server = require("../server");
var should = chai.should();
var done = chai.done;
chai.use(chaiHttp);
chai.use(chaiAsPromised);
suite("A suite", function() {
    test("Test books GET /books", function() {
       let app = server.app;
       chai.request(app).get("/books")
       .end(function(error, response){
        chai.assert.equal(response.status, 200)
       })
    });
    test("Test users GET /users", function() {
        let app = server.app;
        chai.request(app).get("/users")
        .end(function(error, response){
         chai.assert.equal(response.status, 200)
        })
     });
     test("Test logins GET /logins", function() {
        let app = server.app;
        chai.request(app).get("/logins")
        .end(function(error, response){
         chai.assert.equal(response.status, 200)
        })
     });
     suiteTeardown(function(){
        server.closeServer();
     })
  });