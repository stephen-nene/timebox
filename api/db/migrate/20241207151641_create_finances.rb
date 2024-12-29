class CreateFinances < ActiveRecord::Migration[8.0]
  def change
    create_table :finances do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.text :title
      t.float :transaction_cost
      t.text :description
      t.date :date_created
      t.integer :transaction_type, index: true 
      t.float :amount
      t.json :recurring

      t.timestamps
    end

    # Add additional indexes for optimized queries
    add_index :finances, :amount
    add_index :finances, :created_at
  end
end
