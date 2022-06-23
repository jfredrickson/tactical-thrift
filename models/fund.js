const mongoose = require('mongoose')

const FundSchema = new mongoose.Schema({
  name: String,
  description: String,
  inceptionDate: Date,
  active: Boolean
})

module.exports = mongoose.model('Fund', FundSchema)
