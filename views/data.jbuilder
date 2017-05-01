json.positions @positions do |position|
  json.fund position.fund.name
  json.date position.date
  json.invested position.invested
  json.sma position.ten_month_average
  json.price position.tenth_month_price
end
