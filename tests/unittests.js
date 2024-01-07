let chai = require("chai");

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
  });