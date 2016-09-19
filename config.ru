require 'bundler/setup'
Bundler.require(:default)
require File.dirname(__FILE__) + "/app.rb"
require 'sass/plugin/rack'

Sass::Plugin.options[:style] = :compressed
use Sass::Plugin::Rack

run App
