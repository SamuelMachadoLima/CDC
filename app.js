var app = require("./config/server");

app.listen(process.env.PORT, function(){
    console.log("Servidor ON");
});