require 'bundler/setup'
require 'json'
Bundler.require
Dir[File.expand_path("../modules/*.rb", __FILE__)].each{ |f| require f }

LIVEFYRE_KEY = ENV['LIVEFYRE_KEY']
LIVEFYRE_SITE_ID = ENV['LIVEFYRE_SITE_ID']

APP_ROOT = File.dirname(__FILE__)

Compass.configuration do |config|
  config.project_path = File.dirname(__FILE__)
  config.sass_dir = 'views/styles'
end
Sinatra::Base.tap do |b|
  b.set :root, APP_ROOT
  b.set :raise_errors, true
  b.set :server, 'puma'
  b.set :sockets, []
  b.set :views, File.join(APP_ROOT, '/views')
  b.set :static_cache_control, [:public, max_age: 3600]
  b.set :sass, Compass.sass_engine_options
end

map '/' do
  run App
end
