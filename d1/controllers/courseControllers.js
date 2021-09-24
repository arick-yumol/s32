const Course = require('../models/Course');



// Creation of Course
/*
Steps:
1. Create a conditional statement that will check if the user is an admin.
2. Create a new Course object using the mongoose model and the information from the request body and the id from the header
3. Save the new User to the database

*/


module.exports.addCourse = (data) => {
	// User is an admin
	if (data.isAdmin) {
		let newCourse = new Course({
			name: data.course.name,
			description: data.course.description,
			price: data.course.price
		})

		return newCourse.save().then((course, error) => {
			// Course creation failed
			if (error) {
				return false;
			}
			else {
				return true;
			}
		})
	}
	else {
		// User is not an admin
		return false;
	}
}


// Retrieve all courses
module.exports.getAllCourses = () => {
	return Course.find( {} ).then(result => {
		return result;
	})
}


// Retrieve all isActive: true courses
module.exports.getAllActive = () => {
	return Course.find( {isActive: true} ).then(result => {
		return result;
	})
}


/*// Retrieve specific course
module.exports.getSpecificCourse = (reqBody) => {
	return Course.findOne( {name: reqBody.name} ).then(result => {
		return result;
	})
}*/

module.exports.getSpecificCourse = (courseId) => {
	return Course.findById(courseId).then(result => {
		return result;
	})
}


// Ma'am Judy Lyn Medalla's update course code
module.exports.updateCourse = (reqParams, reqBody) => {
	let updatedCourse = {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	};

	// findByIAndUpdate(ID, updatesToBeApplied)
	return Course.findByIdAndUpdate(reqParams.courseId, updatedCourse).then((course, error) => {
		// Course is not updated
		if (error) {
			return false;
		}
		else {
			return true;
		}
	})
}

// ternary operator(ES6 updates)
/*if (error) {
	return false
}
else {
	return true
}

(error) ? false : true*/


/* Business Logic for Archive
Steps:
1. Check if admin (routes)
2. Create a variable where the isActive will change into false
3. So we can use findByIdAndUpdate(id, updatedVariable). Then error handling, if course is not archive, return false. If the course is archived successfully, return true
*/

// Archive a Course
module.exports.archiveCourse = (reqParams, reqBody) => {	// turns current 'isActive: true' courses into 'isActive: false' courses
	let updateCourseStatus = {
		isActive: false
	};

	return Course.findByIdAndUpdate(reqParams.courseId, updateCourseStatus).then((course, error) => {
		if (error) {
			return false;
		}
		else {
			return true;
		}
	})
}