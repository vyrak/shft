class App < Sinatra::Base
  get '/' do
    content_type 'json'

    { test: 'success' }.to_json
  end
end
