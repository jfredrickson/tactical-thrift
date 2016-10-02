class Position < ActiveRecord::Base
  belongs_to :fund

  # Update this month's positions
  def self.update_positions
    first_day_of_month = Date.today.beginning_of_month

    # First, get funds that don't yet have positions established for this month.
    active_funds = Fund.where(active: true)
    funds_to_update = active_funds.select do |fund|
      fund if fund.positions.where(date: first_day_of_month).empty?
    end

    # Get prices and compute this month's positions.
    puts "#{funds_to_update.count} #{funds_to_update.count == 1 ? 'position needs' : 'positions need'} updating for this month."
    unless funds_to_update.empty?
      prices = get_month_end_prices(10)
      funds_to_update.each do |fund|
        last = prices.last[:funds]["#{fund.name} Fund"]
        avg = prices.inject(0) { |sum, data| sum + data[:funds]["#{fund.name} Fund"] } / 10
        date = prices.last[:date]
        invested = last >= avg
        position = Position.create(date: first_day_of_month, fund: fund, invested: invested, ten_month_average: avg, tenth_month_price: last, tenth_month_price_date: date)
        puts "Updated position for #{position.date}: #{position.fund.name} Fund, Invested: #{position.invested}"
      end
    end
  end

  # Populate the database with all historical positions
  def self.populate_positions
    # Earliest data available from TSP is June 2, 2003
    begin_date = Date.new(2003, 6, 2)
    end_date = Date.today
    num_months = (end_date.year * 12 + end_date.month) - (begin_date.year * 12 + begin_date.month)
    prices = get_month_end_prices(num_months)
    Fund.all.each do |fund|
      prices.each_with_index do |price, index|
        first_day_of_month = price[:date].next_month.beginning_of_month
        if index >= 10
          unless Position.exists?(fund: fund, date: first_day_of_month)
            ten_month_prices = prices[index - 10, 10]
            last = price[:funds]["#{fund.name} Fund"]
            avg = ten_month_prices.inject(0) { |sum, data| sum + data[:funds]["#{fund.name} Fund"] } / 10
            invested = last >= avg
            position = Position.create(date: first_day_of_month, fund: fund, invested: invested, ten_month_average: avg, tenth_month_price: last, tenth_month_price_date: price[:date])
            puts "Updated position for #{position.date}: #{position.fund.name} Fund, Invested: #{position.invested}"
          end
        end
      end
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
