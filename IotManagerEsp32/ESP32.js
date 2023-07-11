var server = "192.168.0.106"; // the ip of your MQTT broker/laptop
var options = {
  client_id: "ESP32-test-1",
  username: "test1", // default is undefined
  password: "test", // default is undefined
};

var mqtt = require("MQTT").create(server, options /*optional*/);
var wifi = require('Wifi');
wifi.connect("Tenda_0F5580", {password: "ethanspassword"}, function() {
    mqtt.connect();
});

mqtt.on("connected", function () {
  mqtt.subscribe("ET/u/ledUpdate1");
});

mqtt.on("publish", function (pub) {
  mqtt.publish("ET/c/ledConfirm1", pub.message);
  if(pub.message === "off"){
    analogWrite(13, 0);
  }else{
    var ledValue = Number(pub.message) / 100;
    analogWrite(13, ledValue);
  }
});