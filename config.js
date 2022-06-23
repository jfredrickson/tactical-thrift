require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/tacticalthrift'
}
