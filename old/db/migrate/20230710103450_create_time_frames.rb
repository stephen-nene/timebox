class CreateTimeFrames < ActiveRecord::Migration[7.0]
  def change
    create_table :time_frames do |t|
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.text :task, null: false
      t.text :description
      t.date :date, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
