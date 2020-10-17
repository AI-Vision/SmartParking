const express = require('express')
const router  = express.Router()

const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')

/** Cookie and URL query parsers */
router.use(cookieParser());
router.use(bodyParser.json());       // To support JSON-encoded bodies
router.use(bodyParser.urlencoded({   // To support URL-encoded bodies
    extended: true
}));

/** API request handlers */
router.use('/api',  require('./api.js'));

/** Authorization */
router.use(require('../utils/authorization/express.js'));

/** HTTP request handlers */
router.use('/login',  require('./login.js'));

/** Logout request */
router.get('/logout', function(req, res) {
    console.info(`Пользователь ${req.user.email} вышел`);

    req.logout();
    res.redirect('/login');
});

/** Request for an unknown page */
router.use(function(_, res) {
    res.send('error');
});

module.exports = router;
