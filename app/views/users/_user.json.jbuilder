json.extract! user, :id, :first_name, :last_name, :birthday, :profile_picture, :education, :work, :created_at, :updated_at
json.url user_url(user, format: :json)