const axios = require('axios');
const env = require('config');

var endpoint = "";
var deviceId = "";
var placeId = "";
var type = 0;
var quality = 80;
var user = "admin"
var password = "admin"

endpoint = env.get('endpoint')
deviceId = env.get('deviceId');
placeId = env.get('placeId');
user = env.get("user");
password = env.get('password')



var spawn = require('child_process').spawn
var activeClients = {}
var deviceId = "0000-0000-0000-0000";
var placeId = "AIzaSyAT8W6_CJ835UHlpuCjfxcxHrYf7Tecqtk";
var type = 0;
var quality = 80;
var ts = spawn('tshark',
    ["-l", "-T", "fields", "-e", "wlan.sa_resolved", "-e", "wlan.sa", '-i', 'wlan1', "subtype", "probereq"]
);
// use event hooks to provide a callback to execute when data are available: 
ts.stdout.on('data', function (data) {
    try {
        var x = parser(data, function (line) {
            activeClients[line.mac] = line.timestamp;
        });
    } catch (e) {
        console.log(e)
    }
});

ts.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

ts.on('exit', function (code) {
    console.log('child process exited with code ' + code);
});



function parser(input, cb) {
    var input = input.toString()
    var lines = input.split("\n")
    lines.pop()
    lines.forEach(line => {
        console.log(line)
        cb(parseLine(line))
    });

    function parseLine(line) {
        var lineItems = line.trim().split("\t");
        var x = {
            mac: lineItems[1],
            timestamp: new Date().getTime()
        }
        return x
    }
}

setInterval(function () {
    console.log("######################################")
    console.log("active clients:" + Object.keys(activeClients).length)
    console.log("######################################")
    send();
    activeClients = {};

}, 60 * 1000)

function send() {
    console.log("try to send data to server...")
    var data = {
        timestamp: new Date().getTime(),
        deviceId: deviceId,
        placeId: placeId,
        quality: quality,
        value: Object.keys(activeClients).length,
        type: type
    }
    console.log(JSON.stringify(data))
    axios.post(endpoint + "/supermarkets?placeId=" + placeId, data, {
        auth: {
            username: user,
            password: password
        }
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.code);
        });
}