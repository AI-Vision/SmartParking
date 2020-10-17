const express = require('express')
const app     = express()

const config = require('./config.js');

/** Enabling EJS */
app.set('view engine', 'ejs');
app.set('views', require('path').join(__dirname, '/public'));

/** Handler for HTTP requests */
app.use(require('./routes'));

/** Listen for connections */
app.listen(config.app.port, async () => {
    console.log(`HTTP Web Server running on port ${config.app.port}`);
});