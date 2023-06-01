const echoRouter = require('./echo.router');
const authRouter = require('./auth.router');
const disabledAlarmsRouter = require('./disabledAlarms.router');

const initRoutes = (app) => {
    app.use('/api', echoRouter);
    app.use('/api/auth', authRouter)
    app.use('/api/disabledAlarms', disabledAlarmsRouter)
}

module.exports = initRoutes;
