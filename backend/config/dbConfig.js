//Connecting to database
const mongoose = require('mongoose')
const connectDb = (MONGODB_URI) => {
    mongoose.connect(MONGODB_URI, {})
    .then(()=>console.log('Mongo DB connected'))
    .catch(err=>console.log('Connection Error:',err))
}

module.exports = connectDb;