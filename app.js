const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const utility = require('./utility');

const app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

//mongodb connection
mongoose.connect('mongodb://localhost/nodeprep', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected with database");
});

//view and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//static files
app.use('/static', express.static(path.join(__dirname, '/public')));

//middleware
app.use(utility.logger);
app.use(utility.authenticateRequest);

//routes
routes(app);

//server
app.listen(3000, () => {
    console.info(`application started on http://localhost:3000`)
});