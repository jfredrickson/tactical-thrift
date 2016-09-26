class CreateFunds < ActiveRecord::Migration[5.0]
  def change
    create_table :funds do |t|
      t.string :name
      t.string :description
      t.date :inception_date
      t.boolean :active
    end
  end
end
