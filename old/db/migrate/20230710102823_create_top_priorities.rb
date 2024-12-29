class CreateTopPriorities < ActiveRecord::Migration[7.0]
  def change
    create_table :top_priorities do |t|
      t.text :one, null: false
      t.text :two, null: false
      t.text :three, null: false
      t.references :user, null: false, foreign_key: true
      t.date :date, null: false

      t.timestamps
    end
  end
end
