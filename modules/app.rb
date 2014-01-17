class App < Sinatra::Base
  get '/' do
    content_type 'json'

    { test: 'success' }.to_json
  end

  get '/sock' do
    return slim :'sock' if !request.websocket?
    request.websocket do |ws|
      ws.onopen do
        #ws.send 'Hello World!'
        #settings.sockets << ws
      end

      ws.onmessage do |msg|
        #EM.next_tick { settings.sockets.each{ |s| s.send msg } }
      end

      ws.onclose do
        p 'closed socket'
        settings.sockets.delete ws
      end
    end
  end
end
