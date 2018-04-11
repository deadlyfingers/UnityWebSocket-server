var fs = require("fs"),
  WebSocket = require("ws"),
  WebSocketServer = require("ws").Server;

const PORT = process.env.PORT || 8080;

var interval = 100; // send message rate (ms)
var i = 0; // message to be sent
var total = 9; // total no. of messages to be sent
var id;

// web socket server that sends JSON string
var wss = new WebSocketServer({
  port: PORT
});

wss.on("connection", function (ws) {
  i = 0;
  console.log("Client connected");
  id = setInterval(function () {
    if (ws.readyState === WebSocket.OPEN) {
      var data = getSampleMessageData();
      console.log("Send:\n", data);
      ws.send(data, {
        binary: false,
        mask: false
      });
      i++;
      if (i >= total) clearInterval(id);
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

// return sample data
function getSampleMessageData() {
  var filename = "./data/bingspeech/" + i + ".txt";
  var txt = fs.readFileSync(filename).toString();
  console.log(i + ".txt", "msg data:\n", txt);
  return txt;
}
