const express = require("express");
const app = new express();

const bodyparser = require("body-parser");
app.use(bodyparser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Require Employee routes
require('./app/routes/emp.routes.js')(app);
		

app.listen(3000, () => {
    console.log('Express server is running at port no 3000');
});
