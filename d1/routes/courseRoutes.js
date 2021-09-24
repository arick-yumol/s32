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


// Ma'am Judy Lyn Medalla's update course code
router.put('/:courseId', auth.verify, (req, res) => {
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (data.isAdmin) {
		courseController.updateCourse(req.params, req.body).then(result => res.send(result))
	}
	else {
		res.send(false)
	}
})


// 'archive/soft delete' a course

router.put('/:courseId/archive', auth.verify, (req, res) => {	// turns current 'isActive: true' courses into 'isActive: false' courses
	const data = {
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	if (data.isAdmin) {
		courseController.archiveCourse(req.params, req.body).then(result => res.send(result))
	}
	else {
		res.send(false)
	}
})

module.exports = router;