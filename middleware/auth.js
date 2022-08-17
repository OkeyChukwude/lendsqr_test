const jwt = require('jsonwebtoken');
const config = require('../config');

const { ACCESS_TOKEN_SECRET } = config

module.exports = function(req, res, next){
	const token = req.header('x-auth-token');
	
	if (!token){
		return res.status(401).json({ msg: 'No token, authorisation denied'});
	}

	try {
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

		req.user = decoded.id;
		
		next();
			
	} catch (err) {
			res.status(401).json({msg: "Token is not valid"});
	}
};