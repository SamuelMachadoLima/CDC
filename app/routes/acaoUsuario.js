module.exports = function (application) {
    application.get('/', function (req, res) {
        res.render("index");
    });


    // criar de usuário
    application.get('/criaUsuario', function (req, res) {
        res.render("cria");
    });
    application.post('/criaUsuario', function (req, res) {
        application.app.controllers.criaUsuario.criaUsuario(application, req, res);
    });


    // deletar de usuário
    application.get('/deletaUsuario', function (req, res) {
        res.render("deleta");
    });
};