const express = require('express');

const app = express();

const index = require('./routers/index');
const logicRoute = require('./routers/logicRoutes')
const authRoute = require('./routers/authRoutes')
const companyRoute = require('./routers/companyRoutes')
const goodRoute = require('./routers/goodRoute')
const trxRoute = require('./routers/TrxRoutes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(index);
app.use('/api/', logicRoute);
app.use('/api/', authRoute);
app.use('/api/', companyRoute);
app.use('/api', goodRoute)
app.use('/api', trxRoute)

module.exports = app;
