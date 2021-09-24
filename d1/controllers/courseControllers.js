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


/*// Sir Noel's code + modification by Ma'am Judy Lyn Medalla
module.exports.specificCourse = (reqParams) => {
	return Course.findById(reqParams.courseId).then(result => {	// reqParams.courseId is set because it was not specified in the routes
		return result;
	})
}*/

// Update a course
/*module.exports.updateCourse = (reqParams) => {
	if (reqParams.isAdmin) {
		return Course.findById( {name: reqParams.name} ).then((result, error) => {
			if (error) {
				console.log(error);
				return false;
			}

			result.name = reqParams.name;
			result.description = reqParams.description;
			result.price = reqParams.price;

			return result.save().then((updatedCourseName, err) => {
				if (err) {
					return false;
				}
				else {
					return updatedCourseName;
				}
			})
		})
	}
	else {
		return false;
	}
}*/


module.exports.updateCourse = (reqId) => {
	if (reqId.isAdmin) {
		return Course.findByIdandUpdate( {id: reqId.id} , reqId.body).then((result, error) => {
			if (error) {
				console.log(error);
				return false;
			}

			result.name = reqId.name,
			result.description = reqId.description,
			result.price = reqId.price;

			return result.save().then((updatedCourseName, err) => {
				if (err) {
					return false;
				}
				else {
					return updatedCourseName;
				}
			})
		})
	}
	else {
		return false;
	}
}


/*// Sir Kevin Zerda's update course code
module.exports.updateCourse = (courseId,newUpdate,data) => {

	if (data.isAdmin) {
		return Course.findById(courseId).then((result,error)=>{
			if (error) {
				return false;
			} 
			else {
				result.price = newUpdate.price;
				return result.save().then((updatedCourse, err)=>{
					if (err) {
						return false;
					} else {
						return updatedCourse;
					}
				})
			}
		})

	}
}
*/