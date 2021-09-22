const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')
const auth = require('../auth');

// Route for checking if the user's e-mail already exists in the database
router.post('/checkEmail', (req, res) => {
	userController.checkEmailExists(req.body).then(result => res.send(result));
})


// Route for user registration
router.post('/register', (req, res) => {
	userController.registerUser(req.body).then(result => res.send(result));
})


// Route for user authentication
router.post('/login', (req, res) => {
	userController.loginUser(req.body).then(result => res.send(result));
})


/*s33 Activity*/
// #1. Create a /details route that will accept the user’s Id to retrieve the details of a user.
// Route for user detail retrieval
router.post('/details', (req, res) => {
	userController.getProfile(req.body).then(result => res.send(result));
})

/*router.get('/details', (req, res) => {
	userController.getProfileGET(req.body).then(result => res.send(result));
})*/

/*// s33 activity solution by Ma'am Judy Lyn Medalla
router.post('/details', (req, res) => {
	userController.getProfile( {userId: req.body.id} ).then(result => res.send(result));	// when using req.body.id, no need to specifiy in controllers
})*/

router.get('/details', auth.verify, (req, res) => {
	// Uses the .decode() method defined in the 'auth.js' file to retrieve the user information from the token passing the "token" from the request header as an argument.
	const userData = auth.decode(req.headers.authorization)
	userController.getProfile( {userId: userData.id} ).then(result => res.send(result));
})

module.exports = router;