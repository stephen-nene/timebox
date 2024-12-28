# Rails.application.config.middleware.use ActionDispatch::Session::CookieStore
# Rails.application.config.session_store :cookie_store, 
#   key: 'testing', 
#   expire_after: 1.day.from_now,   
#   secure: Rails.env.production?, 
#   httponly: true,   
#   same_site: :lax    # (can be `:strict` or `:none` in some cases)

#   # Rails.application.config.session_store :cookie_store,
#   # key: '_your_app_session',
#   # expire_after: 30.days

# #  puts 5.minutes.from_now    
# #  puts 30.seconds.from_now   
# #  puts 2.days.from_now       
# #  puts 3.months.from_now     
# #  puts 1.year.from_now       
# #  puts 1.decade.from_now    