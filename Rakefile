require_relative "environment"
require "sinatra/activerecord/rake"

namespace :db do
  task :load_config do
    require "./app"
  end
end

desc "Download TSP price data and update the investment model"
task :update_positions do
  Position.update_positions
end
