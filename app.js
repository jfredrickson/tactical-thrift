const config = require('./config')
const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const mongoose = require('mongoose')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const Fund = require('./models/fund')
const Position = require('./models/position')

const app = express()

mongoose.connect(config.mongoUrl)

dayjs.extend(utc)

const handlebars = expressHandlebars.create({
  helpers: {
    formatDate: (date, format) => {
      const d = dayjs.utc(date)
      return d.format(format)
    },
    formatCurrency: (amount) => {
      return '$' + amount.toFixed(4)
    }
  },
  allowProtoPropertiesByDefault: true
})

app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.get('/', async (req, res) => {
  const funds = await Fund.find().lean()
  const positions = await Position.find({ date: dayjs.utc().startOf('month') }).lean()

  const positionsView = positions.map(position => {
    position.description = funds.find(fund => fund.name === position.fund).description
    position.firstMonthPriceDate = dayjs.utc(position.tenthMonthPriceDate).subtract(9, 'month')
    return position
  })

  res.render('index', {
    positions: positionsView,
    homeActive: true
  })
})

app.get('/charts', async (req, res) => {
  const funds = await Fund.find().lean()

  res.render('charts', {
    funds,
    chartsActive: true
  })
})

app.get('/history', async (req, res) => {
  const funds = await Fund.find().lean()
  const positions = await Position.find().lean()

  const fundsView = funds.map(fund => {
    fund.positions = positions.filter(position => position.fund === fund.name)
    return fund
  })

  res.render('history', {
    fundsView,
    historyActive: true
  })
})

app.get('/data/:fund.json', async (req, res) => {
  const months = req.query.months || 12
  const yearAgo = dayjs.utc().startOf('month').subtract(months, 'months')
  const positions = await Position.find({ date: { "$gte": yearAgo }, fund: req.params.fund }).sort({ date: 'asc' }).lean()
  res.json(positions)
})

// Gracefully handle signals
// https://help.heroku.com/D5GK0FHU/how-can-my-node-app-gracefully-shutdown-when-receiving-sigterm
process
  .on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('uncaughtException', shutdown('uncaughtException'));

function shutdown(signal) {
  return (err) => {
    console.log('Received signal:', signal);
    if (err) console.error(err.stack || err);
    process.exit(err ? 1 : 0);
  };
}

const server = app.listen(config.port, () => {
  console.log(`Listening on port ${server.address().port} (environment: ${process.env.NODE_ENV})`)
})
