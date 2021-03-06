var keystone = require('../../'),
	session = require('../../lib/session');

exports = module.exports = function(req, res) {
	
	var renderView = function() {
		keystone.render(req, res, 'signin', {
			submitted: req.body,
			logo: keystone.get('signin logo')
		});
	}

	// If a form was submitted, process the login attempt
	if (req.method == "POST") {
		
		if (!req.body.email || !req.body.password) {
			req.flash('error', 'Email and password required.');
			return renderView();
		}
		
		var onSuccess = function(user) {
			
			if ('string' == typeof keystone.get('signin success')) {
				res.redirect(keystone.get('signin success'));
			} else if ('function' == typeof keystone.get('signin success')) {
				keystone.get('signin success')(user, req, res);
			} else {
				res.redirect('/keystone');
			}
			
		}
		
		var onFail = function() {
			req.flash('error', 'Email and password don\'t match.');
			renderView();
		}
		
		session.signin(req.body, req, res, onSuccess, onFail);
		
	}
	else {
		renderView();
	}
	
}
