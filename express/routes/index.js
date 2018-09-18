var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('<a href="/content">View content</a>');
});

module.exports = router;
