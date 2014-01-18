namespace :assets do
  task :precompile do
    cmd = File.join Dir.pwd, "node_modules/.bin/grunt dev"
    sh "PATH=/usr/bin:$PATH #{cmd}"
  end
end

