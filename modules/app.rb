class App < Sinatra::Base
  get '/' do
    slim :index
  end

  get '/css/*.css' do |file|
    content_type :css
    begin
      scss :"styles/#{file}",
        syntax: :scsss,
        line_numbers: true,
        style: :expanded
    rescue Errno::ENOENT
      status 404
    end
  end
end
