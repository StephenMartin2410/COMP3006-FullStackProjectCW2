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
       // Test code here…
    });
    test("B test", function() {
        // Test code here…
     });
     test("C test", function() {
        // Test code here…
     });
     suiteTeardown(function(){
        server.closeServer();
     })
  });