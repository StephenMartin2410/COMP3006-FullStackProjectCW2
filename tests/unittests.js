let chai = require("chai");
var chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');
var server = require("../server");
var should = chai.should();
var done = chai.done;
chai.use(chaiHttp);
chai.use(chaiAsPromised);
suite("A suite", function() {
    test("A test", function() {
       
    });
    test("B test", function() {
        
     });
     test("C test", function() {
        
     });
     suiteTeardown(function(){
        server.closeServer();
     })
  });