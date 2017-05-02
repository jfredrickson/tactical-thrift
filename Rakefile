require_relative "environment"
require "sinatra/activerecord/rake"

namespace :db do
  task :load_config do
    require "./app"
  end
end

desc "Update the investment model for this month"
task :update_positions do
  Position.update_positions
end

desc "Populate the database with positions for all previous months"
task :populate_positions do
  Position.populate_positions
end

task :default do
end
