class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.date :birthday
      t.string :profile_picture
      t.string :education
      t.string :work

      t.timestamps
    end
  end
end
