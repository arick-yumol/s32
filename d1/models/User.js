const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First name is required"]
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"]
	},
	e-mail: {
		type: String,
		required: [true, "Email address is required"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin: {
		type: Boolean,
		default: true
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile number is required"]
	},
	enrollments: [
		{
			courseId: {
				type: String,
				required: [true, "CourseId rqeuired"]
			},
			enrolledOn: {
				type: Date,
				default: new Date();
			},
			status: {
				type: String,
				default: "Enrolled"
			}
		}
	]
});

module.exports = mongoose.model("User", userSchema);