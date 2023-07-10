class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.references :brain_dump, null: false, foreign_key: true
      t.text :content, null: false

      t.timestamps
    end
  end
end
