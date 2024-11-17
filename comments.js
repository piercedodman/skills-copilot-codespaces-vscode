//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var comments = [];

var server = http.createServer(function (req, res) {
    //Parse the request URL
    var parseUrl = url.parse(req.url, true);
    var pathName = parseUrl.pathname;
    //If the request URL is '/', read the file and return it
    if (pathName === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    //If the request URL is '/comment', read the file and return it
    else if (pathName === '/comment') {
        fs.readFile('./comment.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    //If the request URL is '/submit', process the form data and return it
    else if (pathName === '/submit') {
        var comment = parseUrl.query;
        comments.push(comment);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(comments));
    }
    //If the request URL is '/getComments', return all the comments
    else if (pathName === '/getComments') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(comments));
    }
    //If the request URL is not found, return 404
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, function () {
    console.log('Server is running at http://localhost:3000');
});