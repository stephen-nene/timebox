# db/seeds.rb

# Categories to seed
categories = {
  expenses: [
    "Rent",
    "Utilities",
    "Groceries",
    "Transportation",
    "Healthcare",
    "Entertainment",
    "Dining Out",
    "Insurance",
    "Loan Repayments",
    "Education"
  ],
  incomes: [
    "Salary",
    "Freelance Work",
    "Investment Income",
    "Business Revenue",
    "Rental Income",
    "Side Hustle",
    "Bonus",
    "Dividend Payments",
    "Pension",
    "Gift/Inheritance"
  ]
}

# Create categories
categories.each do |type, names|
  names.each do |name|
    Category.create!(name: name, status: Category.statuses.keys.sample)
  end
end

puts "Created #{Category.count} categories."

# Create 5 admin users
3.times do |i|
  User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    username: Faker::Internet.unique.username,
    email: "admin#{i + 1}@test.com",
    password: "assword",
    password_confirmation: "assword",
    role: :admin,  
    status: User.statuses.keys.sample
  )
end

puts "Created #{User.count} admin users."
