var fs = require("fs"),
  WebSocket = require("ws"),
  WebSocketServer = require("ws").Server;

const PORT = process.env.PORT || 8080;

var interval = 2000; // send json data every 2 seconds
var i = 1000; // no. of messages to be sent
var id;

// web socket server that sends JSON string
var wss = new WebSocketServer({ port: PORT });
wss.on("connection", function (ws) {
  console.log("Client connected");
  id = setInterval(function () {
    if (ws.readyState === WebSocket.OPEN) {
      var data = JSON.stringify(sampleJson());
      console.log("Send:", data);
      ws.send(data, { binary: false, mask: false });
      i--;
      if (i <= 0) clearInterval(id);
    }
  }, interval);
  ws.on("message", function (message) {
    console.log("Received: %s", message);
  });
  ws.on("close", function () {
    console.log("Client disconnected");
    clearInterval(id);
  });
  ws.on("error", function (error) {
    console.log("Error: %s", error);
    clearInterval(id);
  });
});

// return sample JSON data
function sampleJson() {
  var x, y, z;
  // position
  x = randomNo(2);
  y = randomNo(2);
  z = randomNo(6, 4);
  var position = { x, y, z };
  // rotation
  x = randomNo(360);
  y = randomNo(360);
  z = randomNo(360);
  var rotation = { x, y, z };
  // scale
  x = y = z = randomFloat(1.5, 0.5);
  var scale = { x, y, z };
  return {
    position,
    rotation,
    scale
  };
}

// return random int value. (default 1-10)
function randomNo(max = 10, min = 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// return random float value. (default 0-1)
function randomFloat(max = 1, min = 0) {
  return Math.random() * (max - min) + min;
}
