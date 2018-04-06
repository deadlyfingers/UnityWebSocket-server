const SCRIPT = process.env.SCRIPT || "echo";
var serverScript = "./server-" + SCRIPT + ".js";
console.log("Starting server script:", serverScript);
require(serverScript);
