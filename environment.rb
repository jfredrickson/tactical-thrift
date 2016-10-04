require "active_support"
require "active_support/core_ext"
require "active_record"
require "sinatra/base"
require "sinatra/activerecord"
require "tsp_scraper"

class App < Sinatra::Base
  configure :development do
  end

  configure :production do
    require "newrelic_rpm"
  end

  configure do
    set :database_file, "config/database.yml"
    $LOAD_PATH.unshift("#{File.dirname(__FILE__)}/lib")
    Dir.glob("#{File.dirname(__FILE__)}/lib/*.rb") { |lib| require File.basename(lib, '.*') }
  end
end
