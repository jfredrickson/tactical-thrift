class Position < ActiveRecord::Base
  def self.update_positions
    prices = get_month_end_prices(10)
    first_day_of_month = Date.today.beginning_of_month
    funds = ["C", "S", "I"]
    funds.each do |fund|
      last = prices.last[:funds]["#{fund} Fund"]
      avg = prices.inject(0) { |sum, data| sum + data[:funds]["#{fund} Fund"] } / 10
      date = prices.last[:date]
      invested = last >= avg
      position = Position.create(date: first_day_of_month, fund: fund, invested: invested, ten_month_average: avg, tenth_month_price: last, tenth_month_price_date: date)
    end
  end

  def self.get_month_end_prices(num_months)
    now = Date.today
    start_date = now.beginning_of_month.months_ago(num_months)
    end_date = now.last_month.end_of_month
    data = TSPScraper::Client.scrape(start_date, end_date)
    data_by_month = data.group_by { |p| p[:date].to_s.slice(0, 7) }
    month_end_prices = data_by_month.collect do |month|
      month[1].sort_by { |item| item[:date] }.last
    end
    month_end_prices.sort_by! { |item| item[:date] }
  end
end
