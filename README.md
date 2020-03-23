![wirvsVirus](https://user-images.githubusercontent.com/37160523/77251754-8010f580-6c50-11ea-9b78-f5ce3a203313.png)

This repository is part of the wirVsVirus Hackathon and related to [Livelane](https://github.com/wvvSupermarkt/wvvSupermarkt)
# WifiDeviceCounter
Counting Wifi clients with a raspberry


# install mocker 

## configure config/default.json 

```
{
  "deviceId": "8901:2135:1235:1111",
  "endpoint": "http://localhost:8081",
  "placeId": "AIzaSyAT8W6_CJ835UHlpuCjfxcxHrYf7Tecqtk",
  "user":"admin",
  "password":"admin"
}
```
## run 

```
npm i 
node mocker.js
```



# install real WifiDeviceCounter on Raspberry 

## Hardware

* [Networkadapter](https://www.amazon.de/Alfa-Network-AWUS036NHA-u-Mount-cs-WLAN-Netzwerkadapter/dp/B01D064VMS/ref=sr_1_6?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&keywords=wifi+monitor+mode+alfa&qid=1584812406&sr=8-6)  

* [Raspberry pi](https://www.amazon.de/ABOX-Raspberry-Ultimatives-Starterkit-aus-Schaltnetzteil/dp/B07DDCRFP6/ref=sr_1_1_sspa?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1YSYT6ABOCV&keywords=raspberry+pi+3&qid=1584812507&sprefix=ras%2Caps%2C169&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzQVJGQlJQOEFCTjZRJmVuY3J5cHRlZElkPUEwMTk4MzAxM1MxRTZROFlKUE1YOCZlbmNyeXB0ZWRBZElkPUExMDE3OTUwM0tLTkRXRFhIRUVaSSZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=) 

## setup environment

[tshark](https://www.elektronik-kompendium.de/sites/net/1912141.htm) 

## configure config/default.json 

```
{
  "deviceId": "8901:2135:1235:1111",
  "endpoint": "http://localhost:8081",
  "placeId": "AIzaSyAT8W6_CJ835UHlpuCjfxcxHrYf7Tecqtk",
  "user":"admin",
  "password":"admin"
}
```
## Run

```
sudo node index.js
```
