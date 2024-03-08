const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const isBetween = require('dayjs/plugin/isBetween');
const positions = require('./positions.json');
const funds = require('./funds.json');

dayjs.extend(utc);
dayjs.extend(isBetween);

module.exports = function () {
  const currentPositions = positions.filter(position => {
    return dayjs.utc().startOf('month').isSame(position.date);
  });

  return currentPositions.map(position => {
    position.description = funds.find(fund => fund.name === position.fund).description;
    position.firstMonthPriceDate = dayjs.utc(position.tenthMonthPriceDate).subtract(9, 'month');
    return position;
  });
};
