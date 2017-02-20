# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

500.times do |n|
  first_name  = Faker::Name.first_name
  last_name  = Faker::Name.last_name
  birthday = Faker::Date.between(70.years.ago, 13.years.ago)
  university = Faker::University.name
  work = Faker::Company.name

  email = "example-#{n+1}@mocksns.com"
  User.create!(first_name:  first_name,
               last_name: last_name,
               birthday: birthday,
               profile_picture: "https://randomuser.me/api/portraits/women/99.jpg",
               education: university,
               work: work)
end

# 1000.times do |n|
#   Friendship.create!(
#       user_id: rand(1..1000),
#       friend_id: rand(1..1000)
#   )
# end

for user in User.all

  10.times do |n|

    friend_id = rand(1..500)

    loop do
      friend_id = rand(1..500)
      break if friend_id != user.id
    end

    Friendship.create!(
        user_id: user.id,
        friend_id: friend_id
    )
  end
end