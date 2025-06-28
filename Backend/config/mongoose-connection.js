const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
})
.catch((err) => {
    console.error('MongoDB Atlas connection error:', err.message);
});

module.exports = mongoose.connection;