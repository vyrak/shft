class App < Sinatra::Base
  get '/' do
    @css_path = "css/main.css"
    @js_modernizr_path =  "scripts/lib/modernizr-2.6.2.custom.js"
    @js_zepto_path =  "scripts/lib/zepto.js"
    @js_path =  "scripts/shft.js"
    @js_env =  "development"
    @js_url =  "http://0.0.0.0:9000/"
    slim :index
  end

  get '/css/*.css' do |file|
    content_type :css
    begin
      sass :"styles/#{file}",
        syntax: :sass,
        line_numbers: true,
        style: :expanded
    end
  end
end
