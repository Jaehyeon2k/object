
process.env.WDS_ALLOWED_HOSTS = "all";
process.env.HOST = "localhost";

console.log(">> WDS_ALLOWED_HOSTS =", process.env.WDS_ALLOWED_HOSTS);
console.log(">> HOST =", process.env.HOST);
require("react-scripts/scripts/start");
