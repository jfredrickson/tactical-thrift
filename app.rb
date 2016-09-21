require_relative "environment"

class App < Sinatra::Base
  register Sinatra::ActiveRecordExtension

  get "/" do
    fund_names = ["C", "S", "I"]

    # Make sure we have the latest positions. If not, update them.
    first_day_of_month = Date.today.beginning_of_month
    if Position.where(date: first_day_of_month).count != fund_names.count
      Position.update_positions
    end

    # Get the positions and render them.
    @funds = fund_names.collect { |fund_name|
      Position.find_by(fund: fund_name, date: first_day_of_month)
    }.compact
    erb :index
  end
end
