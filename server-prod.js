/**
 * Created by Nathan on 9/11/2016.
 */
/**
 * Created by Nathan on 9/10/2016.
 */
var express = require('express');
var app     = express();

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.sendfile('.dist/index.html');
});

app.listen(8080);
console.log('Magic happens on 8080');