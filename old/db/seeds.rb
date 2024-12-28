require 'faker'

require 'faker'

puts "🔐 Seeding users..."

5.times do |n|
  User.create(
    username: "stevo nene#{n + 1}",
    email: "stevekid#{n + 1}@gmail.com",
    password: "password"
  )

  print "👤 Creating user #{n + 1}..."
  sleep(0.005)
  puts " ✅"
end

puts "🎉 Users seeding complete!"
puts " "

puts "💸 Seeding Top_priorities..."

5.times do |n|
  date = (Date.today - 4) + n.days
  wake_up_time = Time.new(2000, 1, 1, 5, 0, 0, "+00:00") # Set the wake-up time in UTC

  User.all.each do |user|
    TopPriority.create(
      date: date,
      one: Faker::ChuckNorris.fact,
      two: Faker::ChuckNorris.fact,
      three: Faker::ChuckNorris.fact,
      user_id: user.id
    )

    rand(5..8).times do |n|
      start_time = wake_up_time + (n * 1.hour) # Each task starts after 1 hour
      end_time = start_time + 1.hour
      # puts ("#{start_time.strftime('%I:%M %p')} and #{end_time.strftime('%I:%M %p')}")

      TimeFrame.create(
        start_time: start_time,
        end_time: end_time,
        task: Faker::ChuckNorris.fact,
        description: Faker::Hacker.say_something_smart,
        date: date,
        user_id: user.id
      )
    end

    brain_dump = BrainDump.create(user_id: user.id, date: date)

    rand(5..7).times do
      Task.create(
        brain_dump_id: brain_dump.id,
        content: Faker::GreekPhilosophers.quote
      )
    end

  end

  print "📝 Priorities and events for #{User.count} users on #{date} Done...";puts(" ")
  print "📋 BrainDumps and Tasks for #{User.count} users on #{date} Done..."
  sleep(0.005)
  puts " ✅"
  puts " "
end

puts "🎉 Priorities seeding Done!"
puts " "


puts '✅ Seed complete!'
