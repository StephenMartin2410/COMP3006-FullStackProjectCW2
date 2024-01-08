let chai = require("chai");
var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised');
var server = require("../server");
const { Socket } = require("socket.io");
const { WebSocketServer } = require("ws");
var should = chai.should();
var done = chai.done;
chai.use(chaiHttp);
chai.use(chaiAsPromised);
suite("A suite", function() {
    suiteSetup(function() {
       // Prepare something once for all
       // tests
    });
    suiteTeardown(function() {
       // Clean up once after all tests.
    });
    setup(function() {
       // Prepare something before each   
       // test.
    });
    teardown(function() {
       // Clean up after each test.
    });
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