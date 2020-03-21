const axios = require('axios');
var endpoint = "";
var random = function(){return 0};
if(process.argv.length == 1){
    throw new Error("Missing paramter endpoint. node index.js endpoint=http://localhost:8080 random=123")
}
if(process.argv.length >1){
    endpoint = process.argv[2].split("=")[1];
}
if(process.argv.length >= 2){

random = function(){
    return Math.round(Math.random()*process.argv[3].split("=")[1])
};
console.log("use random value: "+process.argv[3].split("=")[1])
}  



var spawn =require('child_process').spawn 
var activeClients = {} 
var deviceId ="0000-0000-0000-0000";
var placeId = "AIzaSyAT8W6_CJ835UHlpuCjfxcxHrYf7Tecqtk";
var type = 0;
var quality = 80;
var ts = spawn('tshark', 
["-l","-T","fields", "-e","wlan.sa_resolved","-e","wlan.sa",'-i', 'wlan1', "subtype", "probereq"]
);
// use event hooks to provide a callback to execute when data are available: 
ts.stdout.on('data', function (data) {
    try{
        var x = parser(data,function(line){
            activeClients[line.mac] = line.timestamp;
        });
    }catch(e){
        console.log(e)
    }
});

ts.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

ts.on('exit', function (code) {
   console.log('child process exited with code ' + code);
});



function parser(input,cb){
 var input = input.toString()
 var lines = input.split("\n")
 lines.pop()
 lines.forEach(line => {
     console.log(line)
     cb(parseLine(line))
 });

 function parseLine(line){
     var lineItems = line.trim().split("\t");
     var x = {mac:lineItems[1],
    timestamp: new Date().getTime()}
    return x
 }
}

setInterval(function(){
    console.log("######################################")
    console.log("active clients:" + Object.keys(activeClients).length+random())
    console.log("######################################")
    send();
    activeClients = {};

},60*1000)

function send(){
var data = {
    timestamp: new Date().getTime(),
    deviceId: deviceId,
    placeId:placeId,
    quality:quality,
    value:Object.keys(activeClients).length+random(),
    type:type
}
console.log(JSON.stringify(data))
axios.post(endpoint, {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}