class CreatePositions < ActiveRecord::Migration[5.0]
  def change
    create_table :positions do |t|
      t.date :date
      t.string :fund
      t.boolean :invested
      t.decimal :ten_month_average
      t.decimal :tenth_month_price
    end
  end
end
