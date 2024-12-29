class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.string :username
      t.string :phonenumber
      t.string :password_digest
      t.string :email, null: false
      t.json :addresses
      t.integer :role, default: 0
      t.string :profile_pic, default: 'https://placehold.co/600x400'
      t.integer :status, default: 0
      t.float :salary
      t.string :token
      t.datetime :token_expiry

      t.timestamps
    end
     
    add_index :users, :role      
    add_index :users, :status         
    add_index :users, [:email, :username,:token], unique: true  
    add_index :users, :phonenumber, unique: true
    add_index :users, :username, unique: true
  end
end
