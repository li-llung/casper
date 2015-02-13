casper.test.begin('Lynda search retrieves 10 or more results', 3, function suite(test) {
    casper.start("http://www.lynda.com", function() {
        //test.assertTitle("Online video tutorials & training | lynda.com", "Lynda homepage title is the one expected");
        test.assertExists('form[action="http://www.lynda.com/search"]', "search form is found");
        this.fill('form[action="http://www.lynda.com/search"]', {
            q: "wordpress"
        }, true);
    });

    casper.then(function() {
        //test.assertTitle("casperjs - Recherche Lynda", "lynda title is ok");
        test.assertUrlMatch(/search/, "search term has been submitted");
        test.assertEval(function() {
            __utils__.echo(__utils__.findAll("a.title").length + ' found');
            return __utils__.findAll("a.title").length >= 10;
        }, "lynda search for \"wordpress\" retrieves 10 or more results");
    });

    casper.run(function() {
        test.done();
    });
});


// googletesting.js
/*
casper.test.begin('Google search retrieves 10 or more results', 5, function suite(test) {
    casper.start("http://www.google.fr/", function() {
        test.assertTitle("Google", "google homepage title is the one expected");
        test.assertExists('form[action="/search"]', "main form is found");
        this.fill('form[action="/search"]', {
            q: "casperjs"
        }, true);
    });

    casper.then(function() {
        test.assertTitle("casperjs - Recherche Google", "google title is ok");
        test.assertUrlMatch(/q=casperjs/, "search term has been submitted");
        test.assertEval(function() {
            return __utils__.findAll("h3.r").length >= 10;
        }, "google search for \"casperjs\" retrieves 10 or more results");
    });

    casper.run(function() {
        test.done();
    });
});
*/