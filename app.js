var app = require("./config/server");
var http = require("http");
// app.listen(process.env.PORT, function(){
//     console.log("Servidor ON");
// });

http.createServer(function (req, res){
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.end("Hello Wolrd\n")
}).listen(process.env.PORT);