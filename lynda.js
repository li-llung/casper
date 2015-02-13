var links = [];
var casper = require('casper').create();

function getLinks() {
    var links = document.querySelectorAll('a.title');
    return Array.prototype.map.call(links, function(e) {
        return e.textContent.trim();
        //return e.getAttribute('href');
    });
}

casper.start('http://lynda.com/', function() {
    this.echo(this.getTitle());
    this.fill('form[action="http://www.lynda.com/search"]', { q: 'wordpress' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(this.fetchText('div.course-list-count').trim());
    this.echo(links.join('\n')).exit();
});