source 'https://rubygems.org'

ruby '2.3.0'

gem 'rails',          '~> 5.0.0', '>= 5.0.0.1'
gem 'puma',           '~> 3.0'
gem 'sass-rails',     '~> 5.0'
gem 'bootstrap-sass', '~> 3.3.6'
gem 'uglifier',       '>= 1.3.0'
gem 'coffee-rails',   '~> 4.2'
gem 'jquery-rails'
gem 'turbolinks',     '~> 5'
gem 'jbuilder',       '~> 2.5'
gem 'faker',          '1.6.6'
gem 'rack-cors', :require => 'rack/cors'

# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development


group :development, :test do
  gem 'byebug', platform: :mri
  gem 'sqlite3'
end

group :development do
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'rails-controller-testing', '0.1.1'
  gem 'minitest-reporters',       '1.1.9'
  gem 'guard',                    '2.13.0'
  gem 'guard-minitest',           '2.4.4'
end

group :production do
  gem 'pg', '0.18.4'
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
