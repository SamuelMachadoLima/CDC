module.exports = function (application) {
    application.get('/', function (req, res) {
        res.render("index");
    });


    // Criar de usuário
    application.get('/criaUsuario', function (req, res) {
        res.render("cria");
    });
    application.post('/criaUsuario', function (req, res) {
        application.app.controllers.criaUsuario.criaUsuario(application, req, res);
    });


    // Deletar de usuário
    application.get('/deletaUsuario', function (req, res) {
        res.render("deleta");
    });
    application.get('/deletaUsuario', function (req, res) {
        console.log(`1`)
        application.controllers.deletaUsuario.deletaUsuario(application, req, res);
    });
};