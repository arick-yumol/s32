const express = require('express');
const mongoose = require('mongoose');
// Allows our backend application to be available to our frontend application
// Allows us to control app's Cross Origin Resource Sharing Settings
const cors = require('cors');

// Allow access to routes defined within our application
const userRoutes = require('./routes/userRoutes');



const app = express();

// Connect to our MongoDB database
mongoose.connect('mongodb+srv://admin:admin@zuitt-bootcamp.brw90.mongodb.net/Batch127_Booking?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Prompts a message in the terminal once the connection is 'open' and we are able to successfully connect to our database.
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

// Allows all resources/origins to access backend application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// "/users" to be included for all user routes defined in the "userRoutes" file
// "http://localhost:4000/users"
app.use('/users', userRoutes);


// Will use the define port number for the application whenever an environment variable is available OR will use port 4000 if none is defined
// This syntax will allow flexibility when using the application locally or as a hosted application
app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${process.env.PORT || 4000}`)
})
