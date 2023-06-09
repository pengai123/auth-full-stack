if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB is connected!')
  } catch (error) {
    console.log('MongoDB connection error:', error)
  }
}

module.exports = connectDB