'use strict';
var dotenv = require('dotenv');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var jade = require('jade');
var request = require('request');
module.exports = app; // for testing
var config = {
    appRoot: __dirname // required config
};
var bodyParser = require('body-parser');

var config = require('config');
var configuration = {
    appRoot: __dirname // required config
};
dotenv.config({silent: true});
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
/**
 * The below code call the REST API and get the User Repos and display in UI Page
 */
app.set('view engine', 'jade');
app.get('/prhawk/user/:userId', function (req, res) {
    let userId = req.params.userId;
    console.log(req.query.page)
    let endpointUrl = "http://localhost:10010/prhawk/" + userId + "/repo";
    if (req.query.page != undefined && req.query.page != null) {
        endpointUrl += "?page=" + req.query.page;
        if (req.query.per_page != undefined && req.query.per_page != null) {
            endpointUrl += "&per_page=" + req.query.per_page;
        }
    }
    request.get(endpointUrl, function (error, response) {
        if (response.statusCode === 200) {
            let json = JSON.parse(response.body);
            res.render('index', {
                user: userId,
                result: json.repos
            });
        } else {
            res.render('error', {
                user: userId
            });
        }
    });
})
/** END */
SwaggerExpress.create(configuration, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }
    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 10010;
    app.listen(port);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://localhost:' + port + '/repo');
    }
});