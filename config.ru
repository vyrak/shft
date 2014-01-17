require 'bundler/setup'
require 'json'
Bundler.require
Dir[File.expand_path("../modules/*.rb", __FILE__)].each{ |f| require f }

APP_ROOT = File.dirname(__FILE__)

Sinatra::Base.tap do |b|
  b.set :root, APP_ROOT
  b.set :server, 'puma'
  b.set :sockets, []
  b.set :views, File.join(APP_ROOT, '/views')
  b.set :static_cache_control, [:public, max_age: 3600]
end

map '/' do
  run App
end
