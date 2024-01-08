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
    test("B test", function() {
        
     });
     test("C test", function() {
        
     });
     suiteTeardown(function(){
        server.closeServer();
     })
  });