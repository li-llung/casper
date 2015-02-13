var links = [];
var casper = require('casper').create();
function getLinks() {
    var links = document.querySelectorAll('.dvdcell > a');
    return Array.prototype.map.call(links, function(e) {
        if(e.textContent.trim() !== ""){
          return 'Title: ' + e.textContent.trim();
        }else{
          return 'Image: ' + e.firstChild.src;
        }
    });
}
casper.start('http://www.dvdsreleasedates.com/', function() {
    this.echo(this.getTitle());
});
casper.then(function() {
    links = this.evaluate(getLinks);
});
casper.then(function() {
    links = links.concat(this.evaluate(getLinks));
});
casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(this.fetchText('h1.htitle').trim());
    this.echo(links.join('\n')).exit();
});