#!/usr/bin/env node

import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import dayjs from 'dayjs';

const PRICES_FILE_PATH = join(import.meta.dirname, '..', '_data', 'prices.json');
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0';
const FUND_PRICE_URL = 'https://www.tsp.gov/data/fund-price-history.csv';

function parseRecord(rawRecord) {
  const record = {
    prices: [],
  };

  Object.entries(rawRecord).forEach(([key, rawValue]) => {
    if (!rawValue) { return; }

    if (key === 'Date') {
      const date = dayjs(rawValue);
      record.date = date.format('YYYY-MM-DD');
    } else {
      const fund = key.replace('Fund', '').trim();
      const price = rawValue.replace('$', '').trim();
      record.prices.push({ fund, price });
    }
  });

  return record;
}

function merge(csvData) {
  const rawData = parse(csvData, { columns: true });
  const existingPrices = JSON.parse(readFileSync(PRICES_FILE_PATH, 'utf-8'));

  const updatedPrices = rawData.reduce((prices, rawRecord) => {
    if (!rawRecord.Date) { return prices; }

    if (!existingPrices.some((existingPrice) => existingPrice.date === rawRecord.Date)) {
      prices.push(parseRecord(rawRecord));
    }

    return prices;
  }, [...existingPrices]);

  writeFileSync(PRICES_FILE_PATH, JSON.stringify(updatedPrices, null, 2));
}

async function fetchPrices() {
  const response = await fetch(FUND_PRICE_URL, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`There was a problem fetching the share price file: HTTP ${response.status} ${response.statusText}`);
  }

  return response.text();
}

const csvData = await fetchPrices();
merge(csvData);
