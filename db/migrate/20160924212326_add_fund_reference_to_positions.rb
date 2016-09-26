class AddFundReferenceToPositions < ActiveRecord::Migration[5.0]
  def change
    add_reference :positions, :fund
    Position.all.each do |position|
      existing_fund_name = position["fund"]
      unless fund = Fund.find_by(name: existing_fund_name)
        puts "looking for " + existing_fund_name
        fund = Fund.create(name: existing_fund_name, active: true)
      end
      position.update_attributes(fund: fund)
    end
    remove_column :positions, :fund
  end
end
