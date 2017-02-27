var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var path = require('path');

app.use(express.static('client'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get('/:timestamp', function(request, response) {
    var timestamp = request.params.timestamp;
    response.json(getTimestampJSON(timestamp));
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});

function getTimestampJSON(timestamp) {
    var result = {
        unix: null,
        natural: null
    };
    
    var date;
    if(!isNaN(parseInt(timestamp))) {
        date = new Date(parseInt(timestamp));
    } else {
        date = new Date(timestamp);
    }
    
    if (!isNaN(date.getTime())) {
        result.unix = date.getTime();
        result.natural = getNaturalDate(date);
    }
    
    return result;
}

function getNaturalDate(date) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}