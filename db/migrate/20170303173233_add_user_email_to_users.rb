class AddUserEmailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :user_email, :string
  end
end
