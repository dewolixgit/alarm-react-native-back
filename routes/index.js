const echoRouter = require('./echo.router');

const initRoutes = (app) => {
    app.use('/api', echoRouter);
}

module.exports = initRoutes;
