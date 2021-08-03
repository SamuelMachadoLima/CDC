var app = require("./config/server");

// app.listen(process.env.PORT, function(){
//     console.log("Servidor ON");
// });

app.createServer(function (req, res){
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.end("Hello Wolrd\n")
}).listen(process.env.PORT);