var fs = require("fs"),
  WebSocket = require("ws"),
  WebSocketServer = require("ws").Server;

// simple ehco web socket server
var wss = new WebSocketServer({ port: 8080, host: "127.0.0.1" });
wss.on("connection", function(ws) {
  console.log("Client connected");
  if (ws.readyState === WebSocket.OPEN) {
    var message = "Hello!";
    console.log("Send:", message);
    ws.send(message, { binary: false, mask: false });
  }
  ws.on("message", function(message) {
    console.log("Received: %s", message);
    ws.send("You said " + message, { binary: false, mask: false });
  });
  ws.on("close", function() {
    console.log("Client disconnected");
  });
  ws.on("error", function(error) {
    console.log("Error: %s", error);
  });
});
