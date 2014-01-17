class App < Sinatra::Base
  get '/' do
    slim :index
  end

  get '/css/*.css' do |file|
    content_type :css
    begin
      sass :"styles/#{file}",
        syntax: :sass,
        line_numbers: true,
        style: :expanded
    rescue Errno::ENOENT
      status 404
    end
  end
end
