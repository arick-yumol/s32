const jwt = require("jsonwebtoken");	// npm install jsonwebtoken
// User defined string data that will be used to create our JSON web tokens
// Used in the algorithm for encrypting our data which makes it difficult to decode the information without the defined secret keyword
const secret = 'CourseBookingAPI';

// JSON Web Token or JWT is a way of securely passing information from the server to the frontend or to other part of serve
// Information is kept secure through the use of the secret code
// only the system knows the secret code that can decode the encrypted information
// secret is equal to a lock code.


/*
Analogy:
-Imagine JWT as a gift wrapping service that secures the gift with a lock
-Only the person who knows the secret code can open the lock
-And if the wrapper has been tampered with, JWT also recognizes this and disregards the gift
-This ensures that the data is secure from the sender to the receiver
*/




// Token Creation
// Analogy = Pack the gift and provide a lock with the secret code as the key
module.exports.createAccessToken = (user) => {
	// The data will be received from the registration form
	// When the user logs in, a token will be created with user's information

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	// Generate a JSON web token using the jwt's sign method (signature)
	// Generates the token using the form data and the secret code with no additional options provided
	return jwt.sign(data, secret, {})
}



// Token Verification
// Analogy - Receive the gift and open the lock to verify if the sender is legitimate and the gift was not tampered with


module.exports.verify = (req, res, next) => {
	// The token is retrieved from the request header
	// This can be provided in Postman under
		// Authorization > Bearer Token
	let token = req.headers.authorization;

	// Token received and is not undefined
	if (typeof token !== "undefined") {
		console.log(token);
		// The token that we receive is just like this:
			// "Remove bearer string only"
		// The "slice" method takes only the token from the information sent via the request
		// This removes the "Bearer " prefix and obtains only the token for verification
		token = token.slice(7, token.length);

		// Validate the token using the .verify() method decrypting the token using the secret code
		return jwt.verify(token, secret, (err, data) => {
			if (err) {
				// if JWT is invalid
				return res.send( {auth: "failed"} )
			}
			else {
				// if JWT is valid
				// Allows the application to proceed with the next middleware function/callback function in the route
				// The next() middleware will be used to proceed to another function that invokes the controller function(business logic)
				next()	// a callback method
			}
		})
	}
	else {
		// Token does not exist
		return res.send( {auth: "failed"} );
	}
}


// Token decryption
// Analogy - Open the gift and get the content
module.exports.decode = (token) => {

	// Token received and is not undefined
	if (typeof token !== "undefined") {

		// Retrieves only the token and removes the "Bearer " prefix
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if (err) {
				return null;
			}
			else {
				// The .decode() method is used to obtain the infro from the JWT
				// {complete: true} option allows us to return additional info from the JWT token
				// Returns an object with the access to the "payload" property which contains user information stored when the token was generated
				// The payload contains the info provided in the "createAccessToken" method defined above (id, email and isAdmin)
				return jwt.decode(token, {complete: true}).payload
			}
		})

		// Token does not exist
	}
	else {
		return null;
	}
}