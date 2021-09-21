const jwt = require("jsonwebtoken");	// npm install jsonwebtoken
// User defined string data that will be used to create our JSON web tokens
// Used in the algorithm for encrypting our data which makes it difficult to decode the information without the defined secret keyword
const secret = 'CourseBookingAPI';

// JSON Web Token or JWT is a way of securely passing information from the server to the frontend or to other part of serve
// Information is kept secure through the use of the secret code
// only the system knows the secret code that can decode the encrypted information
// secret is equal to a lock code.

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