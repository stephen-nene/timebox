class CreateCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.integer :status

      t.timestamps
    end
    add_index :categories, :status
    add_index :categories, :name, unique: true
  end
end
