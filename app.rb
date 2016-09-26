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
end
