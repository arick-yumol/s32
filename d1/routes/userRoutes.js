const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')


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

router.get('/details', (req, res) => {
	userController.getProfileGET(req.body).then(result => res.send(result));
})


module.exports = router;