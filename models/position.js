const mongoose = require('mongoose')

const PositionSchema = new mongoose.Schema({
  date: Date,
  fund: String,
  invested: Boolean,
  tenMonthAverage: Number,
  tenthMonthPrice: Number,
  tenthMonthPriceDate: Date
})

module.exports = mongoose.model('Position', PositionSchema)
