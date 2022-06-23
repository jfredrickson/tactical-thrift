const mongoose = require('mongoose')

const DailySchema = new mongoose.Schema({
  date: Date,
  prices: [{ fund: String, price: Number }]
})

module.exports = mongoose.model('Daily', DailySchema)
