require "faker"
require "progressbar"

class DatabaseSeeder
  def initialize
    @logger = Logger.new(STDOUT)
    @logger.formatter = proc do |severity, datetime, progname, msg|
      emoji = case severity
              when 'INFO' then '🌱'
              when 'WARN' then '⚠️'
              when 'ERROR' then '❌'
              else '📝'
              end
      "#{emoji} #{msg}\n"
    end
  end

  def seed!
    clear_existing_records
    seed_categories
    seed_users
    seed_finances
    log_summary
  end

  private

  def clear_existing_records
    log_section('Clearing existing records')
    [Category, Finance, User].each do |model|
      model.destroy_all
    end
  end

  def seed_categories
    log_section('Seeding Categories')
    progress_bar(30) do
      # 30.times do 
        Category.create!(
          name: Faker::Cannabis.unique.strain,
          status: Category.statuses.keys.sample
        )
        # end
      end
      Faker::Cannabis.unique.clear
  end

  def seed_users
    log_section('Seeding Users')
    @admin_users = create_users(:admin, 5)
    @regular_users = create_users(:user, 20)
    
    log_info "Seeded #{User.count} users: #{@admin_users.count} admins and #{@regular_users.count} regular users"
  end

  def seed_finances
    log_section('Seeding Finances')
    months_to_seed = [12] # Current month
    year = Date.today.year

    months_to_seed.each do |month|
      log_info "Seeding finances for #{Date::MONTHNAMES[month]}"
      
      progress_bar(all_users.count) do|user|
        # all_users.each do 
          generate_finances_for_user_in_month(user, month, year)
        # end
      end
    end
  end

  def create_users(role, count, start_index = 1)
    progress_bar(count) do |i|
      # (1..count).map do |i|
        User.create!(
          first_name: Faker::Name.first_name,
          middle_name: Faker::Name.middle_name,
          last_name: Faker::Name.last_name,
          username: Faker::Internet.unique.username,
          phonenumber: Faker::PhoneNumber.cell_phone,
          email: "#{role}#{start_index + i - 1}@test.com",
          password: "assword",  
          password_confirmation: "assword",  
          addresses: [generate_address],
          role: role,
          status: User.statuses.keys.sample,
          salary: rand(30000.0..100000.0).round(2)
        )
      end
    # end
  end

  def generate_address
    {
      street: Faker::Address.street_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      country: Faker::Address.country
    }
  end

  def generate_finances_for_user_in_month(user, month, year)
    start_date = Date.new(year, month, 1)
    end_date = [start_date.end_of_month, Date.today].min

    (start_date..end_date).each do |date|
      rand(2..3).times do
        create_finance_entry(user, date)
      end
    end
  end

  def create_finance_entry(user, date)
    transaction_type = [:income, :expense].sample
    amount = calculate_amount(transaction_type)
    
    finance = Finance.create!(
      user: user,
      title: generate_title(transaction_type),
      description: Faker::Hacker.say_something_smart,
      transaction_type: transaction_type,
      amount: amount,
      transaction_cost: transaction_type == :expense ? rand(0.0..50.0).round(2) : 0.0,
      recurring: generate_recurring_data(date),
      created_at: date,
      updated_at: date
    )
    
    # Associate random categories
    finance.categories << Category.all.sample(rand(2..3))
  end

  def calculate_amount(transaction_type)
    case transaction_type
    when :income
      rand(100.0..5000.0).round(2)
    when :expense
      rand(10.0..1000.0).round(2)
    end
  end

  def generate_title(transaction_type)
    case transaction_type
    when :income
      ["Tips", "Freelance Work", "Investment Income", "Bonus", "Side Hustle"].sample
    when :expense
      ["Grocery Shopping", "Restaurant Bill", "Online Purchase", "Utility Payment", "Transportation"].sample
    end
  end

  def generate_recurring_data(date)
    return nil if rand >= 0.4

    frequency = ['daily', 'weekly', 'monthly'].sample
    next_payment_date = calculate_next_payment_date(date, frequency)
    end_date_recurring = [next_payment_date + rand(30..180).days, Date.today].min

    {
      frequency: frequency,
      start_date: date,
      next_payment_date: next_payment_date,
      end_date: end_date_recurring,
      amount_variation: rand(0..5) == 0 ? rand(5.0..50.0).round(2) : 0.0,
      notes: ["fixed cost", "estimated amount", "variable cost"].sample
    }
  end

  def calculate_next_payment_date(start_date, frequency)
    case frequency
    when 'daily'
      start_date + rand(1..3).days
    when 'weekly'
      start_date + rand(1..7).days
    when 'monthly'
      start_date.next_month(rand(1..3))
    else
      start_date
    end
  end

  def all_users
    @admin_users + @regular_users
  end

  def log_summary
    log_section('Seeding Summary')
    log_info "Total Users: #{User.count}"
    log_info "Total Categories: #{Category.count}"
    log_info "Total Finances: #{Finance.count}"
  end

  # Logging helpers
  def log_section(message)
    @logger.info("=" * 50)
    @logger.info(message)
    @logger.info("=" * 50)
  end

  def log_info(message)
    @logger.info(message)
  end

  # Progress bar helper
  def progress_bar(total)
    progress = ProgressBar.create(
      total: total, 
      format: "%a %b\u{15E7}%i %p%% %t",
      progress_mark: '█',
      remainder_mark: '░'
    )
    
    result = total.times.map do |i|
      yield
      progress.increment
    end
    
    result
  end
end

# Execute the seeding process
begin
  seeder = DatabaseSeeder.new
  seeder.seed!
rescue StandardError => e
  puts "❌ Seeding failed: #{e.message}"
  puts e.backtrace
end

# db/seeds.rb
# require "faker"

# puts "🌱 Clearing existing records..."
# Category.destroy_all
# Finance.destroy_all
# User.destroy_all

# puts "\n"

# # Helper to create users
# def create_users(role, count, start_index = 1)
#   users = []
#   count.times do |i|
#     user = User.create!(
#       first_name: Faker::Name.first_name,
#       middle_name: Faker::Name.middle_name,
#       last_name: Faker::Name.last_name,
#       username: Faker::Internet.unique.username,
#       phonenumber: Faker::PhoneNumber.cell_phone,
#       email: "#{role}#{start_index + i}@test.com",
#       password: "assword",  
#       password_confirmation: "assword",  
#       addresses: [
#         {
#           street: Faker::Address.street_address,
#           city: Faker::Address.city,
#           state: Faker::Address.state,
#           country: Faker::Address.country
#         }
#       ],
#       role: role,
#       status: User.statuses.keys.sample,
#       salary: rand(30000.0..100000.0).round(2)
#     )
#     users << user
#   end
#   users
# end


# # Helper to generate random categories
# def seed_categories
  
#   30.times do 
#     Category.create!(
#       # Faker::Company.name
#       # Faker::Commerce.department
#       # Faker::Cannabis.strain
#       name: Faker::Cannabis.unique.strain,
#       status: Category.statuses.keys.sample
#     )
#   end
# end


# # Helper to generate finances for a user in a specific month
# def generate_finances_for_user_in_month(user, categories, month, year)
#   # Define the start and end date of the month
#   start_date = Date.new(year, month, 1)
#   end_date = start_date.end_of_month
#   end_date = [end_date, Date.today].min  # Use the earlier of the two dates
  
#   # puts "✨ Seeding finances for #{start_date.strftime("%B %Y")} for User: #{user.username}..."

#   # Loop through the dates of the given month
#   (start_date..end_date).each do |date|
#     # Random number of finances per day (between 5 and 10)
#     rand(2..3).times do
#       # Alternate between income and expense
#       transaction_type = [:income, :expense].sample
      
#       # Determine amount based on transaction type
#       amount = case transaction_type
#                when :income
#                  rand(100.0..5000.0).round(2)
#                when :expense
#                  rand(10.0..1000.0).round(2)
#                end
      
#       # Select random categories
#       finance_categories = Category.all.sample(rand(2..3))
#       recurring_data = nil
#       if rand < 0.4  # 40% chance for any finance to be recurring
#         # For recurring entries, set frequency and dates properly
#         frequency = ['daily', 'weekly', 'monthly'].sample
#         start_date_recurring = date
#         next_payment_date = case frequency
#                             when 'daily'
#                               start_date_recurring + rand(1..3).days  # Random daily next payment
#                             when 'weekly'
#                               start_date_recurring + rand(1..7).days  # Random weekly next payment
#                             when 'monthly'
#                               # Add a month to the current date, but ensure it's within the next few months
#                               start_date_recurring.next_month(rand(1..3))  # Random month within 1-3 months
#                             else
#                               start_date_recurring
#                             end
        
#         # Make sure the next payment date does not go beyond today

#         end_date_recurring = next_payment_date + rand(30..180).days  # End within 1 to 6 months
#         amount_variation = rand(0..5) == 0 ? rand(5.0..50.0).round(2) : 0.0  # 20% chance of amount variation each time
        
#         recurring_data = {
#           frequency: frequency,
#           start_date: start_date_recurring,
#           end_date: end_date_recurring,
#           amount_variation: amount_variation,
#           notes: ["fixed cost", "estimated amount", "variable cost"].sample # Random notes
#         }
#       end
#       finance = Finance.create!(
#         user: user,
#         title: case transaction_type
#                when :income
#                  ["Tips", "Freelance Work", "Investment Income", "Bonus", "Side Hustle"].sample
#                when :expense
#                  ["Grocery Shopping", "Restaurant Bill", "Online Purchase", "Utility Payment", "Transportation"].sample
#                end,
#         # description: [
#         #   Faker::Quote.famous_last_words,
#         #   Faker::Quote.jack_handey,
#         #   Faker::Quote.matz,
#         #   Faker::Quote.most_interesting_man_in_the_world
#         # ].sample,
#         description: Faker::Hacker.say_something_smart,
#         transaction_type: transaction_type,
#         amount: amount,
#         transaction_cost: transaction_type == :expense ? rand(0.0..50.0).round(2) : 0.0,
#         recurring: recurring_data,  # Adding the recurring data here
#         created_at: date,
#         updated_at: date
#       )
      
#       # Associate categories with finance
#       finance.categories << finance_categories
#     end
#   end

#   # puts "🎉 Finished seeding finances for #{start_date.strftime("%B %Y")} for User: #{user.username}."
# end

# # Seed process
# puts "✨ Seeding categories... 🏷️"
# categories = seed_categories
# puts "🎉 Seeded #{Category.count} categories!"

# puts "\n✨ Seeding admins... 👤"
# admin_users = create_users(:admin, 5)
# puts "✨ Seeding normal users... 👤"
# regular_users = create_users(:user, 20)

# puts "🎉 Seeding complete! #{User.count} users have been added: #{admin_users.count} admins and #{20} users."


# puts "\n✨ Seeding finances for months 9, 10, 11... 💰"


# [12].each do |month|
#   puts "\n✨ Seeding finances for #{Date::MONTHNAMES[month]}..."
  
#   # For each month, generate finances for all users
#   (admin_users+regular_users).each do |user|
#     generate_finances_for_user_in_month(user, categories, month, Date.today.year)
#   end

#   puts "🎉 Finished seeding finances for #{Date::MONTHNAMES[month]}."
# end

# puts "\n🎉 Seeding complete!"
# puts "Total Users: #{User.count}"
# puts "Total Categories: #{Category.count}"
# puts "Total Finances: #{Finance.count}"

# 30.times do
#   Scholarship.create!(
#     title: Faker::Educator.course_name,
#     description: {
#       summary: Faker::GreekPhilosophers.quote,
#       details: Array.new(rand(3..4)) {
#         [Faker::Quote.matz,
#          Faker::Quote.unique.most_interesting_man_in_the_world,
#          Faker::Quote.jack_handey].sample
#       },
#       requirements: Faker::Hacker.say_something_smart,
#       degree_name: Faker::Educator.degree,
#     },
#     eligibility_criteria: {
#       age_range: "#{rand(18..30)}-#{rand(31..40)} years old",
#       country_specific: Faker::Address.country,
#       academic_requirements: Faker::ChuckNorris.fact,
#       other_requirements: Array.new(rand(3..4)) { Faker::Quote.famous_last_words },
#       additional_info: Faker::Books::Dune.quote,
#       application_requirements: Faker::Books::Dune.saying,
#     },
#     funding_amount: Faker::Number.decimal(l_digits: 6, r_digits: 2),
#     deadline: Faker::Date.forward(days: 30),
#     status: Scholarship.statuses.keys.sample,
#     contact_email: Faker::Internet.email,
#     application_link: Faker::Internet.url,
#     country: Faker::Address.country,
#     level: Scholarship.levels.keys.sample,
#     major: Scholarship.majors.keys.sample,
#   )

#   Faker::Quote.unique.clear
# end
# 30.times do
#   admin = User.where(role: :admin).sample
#   scholarship = Scholarship.all.sample

#   meeting = Meeting.create!(
#     admin: admin, 
#     scholarship: scholarship,
#     title: Faker::Quote.robin,
#     description: Faker::Quote.jack_handey,
#     status: Meeting.statuses.keys.sample, 
#     date: Faker::Time.forward(days: 30), 
#     meet_type: Meeting.meet_types.keys.sample,  
#     meeting_link: Faker::Internet.url, 
#   )

#   if meeting.meet_type == "group_meeting"
#     participants = User.where.not(role: :admin).sample(6)
#     participants.each do |user|
#       MeetingParticipant.create!(meeting: meeting, user: user)
#     end
#   end
# end

# Faker::Quote.famous_last_words #=> "My vocabulary did this to me. Your love will let you go on…"

# Faker::Quote.jack_handey #=> "I hope life isn't a big joke, because I don't get it."

# Faker::Quote.matz #=> "You want to enjoy life, don't you? If you get your job done quickly and your job is fun, that's good isn't it? That's the purpose of life, partly. Your life is better."

# Faker::Quote.most_interesting_man_in_the_world #=> "He can speak Russian… in French"

# Faker::Quote.robin #=> "Holy Razors Edge"

# Faker::Quote.singular_siegler #=> "Texas!"

# Faker::Quote.yoda #=> "Use your feelings, Obi-Wan, and find him you will."

# Faker::Quote.mitch_hedberg # => "I like Kit-Kats, unless I'm with four or more people."
  # def generate_unique_category_names
  #   # Combine multiple sources of unique names
  #   category_sources = [
  #     -> { Faker::Commerce.department },
  #     -> { Faker::Company.buzzword },
  #     -> { Faker::Hobby.activity },
  #     -> { Faker::Ancient.god },
  #     -> { Faker::Color.color_name },
  #     -> { Faker::Food.ingredient },
  #     -> { Faker::Science.element },
  #     -> { Faker::Game.genre }
  #   ]

  #   unique_names = Set.new
  #   while unique_names.size < 30
  #     source = category_sources.sample
  #     name = source.call
  #     unique_names.add(name)
  #   end

  #   unique_names.to_a
  # end