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

function send() {
    console.log("try to send data to server...")

    var data = {
        timestamp: new Date().getTime(),
        deviceId: deviceId,
        placeId: placeId,
        quality: quality,
        value: Math.round(Math.random() * 100),
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

setInterval(send,  60*1000)