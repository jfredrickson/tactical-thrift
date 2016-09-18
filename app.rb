require_relative "environment"

class App < Sinatra::Base
  register Sinatra::ActiveRecordExtension

  get "/" do
    @c_fund = Position.where(fund: "C").order(date: :desc).first
    @s_fund = Position.where(fund: "S").order(date: :desc).first
    @i_fund = Position.where(fund: "I").order(date: :desc).first
    @funds = [@c_fund, @s_fund, @i_fund].compact
    erb :index
  end

  get "/update" do
    Position.update_positions
  end
end
