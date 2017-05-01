require_relative "environment"

class App < Sinatra::Base
  register Sinatra::ActiveRecordExtension

  get "/" do
    first_day_of_month = Date.today.beginning_of_month

    # Make sure we have the latest position for each fund. If not, update them.
    if Position.where(date: first_day_of_month).count < Fund.where(active: true).count
      Position.update_positions
    end

    @positions = Position.where(date: first_day_of_month)
    erb :index
  end

  get "/history" do
    @funds = Fund.where(active: true)
    erb :history
  end

  get "/charts" do
    @funds = Fund.where(active: true)
    erb :charts
  end

  get "/data/:fund.json" do
    year_ago = Date.today.beginning_of_month - 12.months
    fund = Fund.find_by(name: params["fund"].upcase)
    @positions = Position.where("date > ?", year_ago).where(fund: fund).order(:date)
    jbuilder :data
  end
end
