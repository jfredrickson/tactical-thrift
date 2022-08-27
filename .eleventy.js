const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy({ '_data/*.json': 'data' });

  eleventyConfig.addFilter('formatDate', (value, format) => {
    return dayjs.utc(value).format(format);
  });

  eleventyConfig.addFilter('formatCurrency', value => {
    const usd = new Intl.NumberFormat('en-US', {
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });
    return usd.format(value);
  });
};
