const express = require('express');
const path = require('path');
const compression = require('compression');
// https://github.com/expressjs/morgan
const logger = require('morgan');
const bodyParser = require('body-parser');
// https://github.com/chriso/validator.js
const validator = require('express-validator');
const paginate = require('express-paginate');
const app = express();
const port = 3000;

// Local variables.
// ----------------------------------------
// In routes: res.app.locals.VARNAME
// In templates: locals.VARNAME
let locals = require('./helpers/locals');
for (var k in locals) { 
	app.set(k, locals[k]); 
}
delete(locals);

console.log('Site name: ', app.get('sitename'));
console.log('Environment:', app.get('env'));

// Middleware
// ----------------------------------------
app.use(compression());
app.use(logger('dev'));
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator(require('./config/validator')));
app.use(paginate.middleware(10, 100));

// Routes
// ----------------------------------------
let glob = require('glob');
glob.sync('./routes/**/*.js').forEach(function(file) {
	app.use('/', require(path.resolve(file)));
});

// Error handlers
// ----------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
 	let err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});
// Send errors
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.send(res.locals.error);
});

// Run.
// ----------------------------------------
app.listen(port, function(){
    console.log(`Example app listening on port ${port}!`);
});