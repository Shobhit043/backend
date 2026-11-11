const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/db');

// Define a User schema and model
// by default strict mode is true so document must follow the schema, it can be set to false and throw
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});

// represents a collection
const User = mongoose.model('User', userSchema);

// Create a new user document
const newUser = new User({ name: 'Abc', email: 'abc@example.com' });
newUser.save().then(() => console.log('User saved'));

// Query all user documents
User.find().then(users => {
    users.forEach(user => console.log(user.name, user.email));
});
