# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_10_103450) do
  create_table "brain_dumps", force: :cascade do |t|
    t.integer "user_id", null: false
    t.date "date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_brain_dumps_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "brain_dump_id", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["brain_dump_id"], name: "index_tasks_on_brain_dump_id"
  end

  create_table "time_frames", force: :cascade do |t|
    t.time "start_time", null: false
    t.time "end_time", null: false
    t.text "task", null: false
    t.text "description"
    t.date "date", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_time_frames_on_user_id"
  end

  create_table "top_priorities", force: :cascade do |t|
    t.text "one", null: false
    t.text "two", null: false
    t.text "three", null: false
    t.integer "user_id", null: false
    t.date "date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_top_priorities_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "brain_dumps", "users"
  add_foreign_key "tasks", "brain_dumps"
  add_foreign_key "time_frames", "users"
  add_foreign_key "top_priorities", "users"
end
