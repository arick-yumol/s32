const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers');
const auth = require('../auth');

// Route for creating a course
// http://localhost:4000/courses/
router.post('/', auth.verify, (req, res) => {
	const data = {
		course: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin	// checks if user is an admin
	}
	// console.log(isAdmin)	// used to check the isAdmin value
	courseController.addCourse(data).then(result => res.send(result));
})

// Route to retrieve all courses
router.get('/all', (req, res) => {
	courseController.getAllCourses().then(result => res.send(result));
})


// Route to retrieve all isActive: true courses
router.get('/', (req, res) => {
	courseController.getAllActive().then(result => res.send(result));
})

/*// Route to retrieve specific course
router.get('/specific', (req, res) => {
	courseController.getSpecificCourse(req.body).then(result => res.send(result));
})*/

router.get('/:id', (req, res) => {
	courseController.getSpecificCourse(req.params.id).then(result => res.send(result));
})

/*// Sir Noel's code + modification by Ma'am Judy Lyn Medalla
router.get("/:courseId", (req,res) => {	// wildcards can be rename from /:id to whatever you want
	courseController.specificCourse(req.params).then(result => res.send(result));	//when not specific when using req.params, the parameters in the controller must be specified
})*/

// Route to update a course
router.put('/:id', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}
	courseController.updateCourse(req.params, req.body, data).then(result => res.send(result));
})

/*// Sir Kevin Zerda's update course code
router.put('/:courseId', auth.verify, (req,res) => {

	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}


	courseController.updateCourse(req.params.courseId, req.body, data).then(result => res.send(result))
})
*/

module.exports = router;