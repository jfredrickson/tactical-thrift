class AddTenthMonthPriceDateToPositions < ActiveRecord::Migration[5.0]
  def change
    change_table :positions do |t|
      t.date :tenth_month_price_date
    end
  end
end
