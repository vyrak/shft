class App < Sinatra::Base
  get '/' do
    slim :index
  end

  get '/css/*.css' do |file|
    content_type :css
    begin
      scss file.to_sym,
        syntax: :scss,
        line_numbers: true,
        style: :expanded,
        load_paths: ['views/styles']
    rescue Errno::ENOENT
      status 404
    end
  end
end
