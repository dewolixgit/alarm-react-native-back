const echoRouter = require('./echo.router');
const authRouter = require('./auth.router');

const initRoutes = (app) => {
    app.use('/api', echoRouter);
    app.use('/api/auth', authRouter)
}

module.exports = initRoutes;
