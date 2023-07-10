require 'faker'

puts '🔐 Seeding Users...'

5.times do
  username = Faker::Internet.username(specifier: 8..12)
  email = Faker::Internet.email(name: username)
  # password = Faker::Internet.password(min_length: 8, max_length: 16, mix_case: true, special_characters: true)
  password = "password"
  User.create!(username: username, email: email, password: password)

  puts "👤 Created user #{username} (#{email})"
end

puts '✅ Seed complete!'
