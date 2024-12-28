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

ActiveRecord::Schema[8.0].define(version: 2024_12_07_152920) do
  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name", unique: true
    t.index ["status"], name: "index_categories_on_status"
  end

  create_table "categories_finances", id: false, force: :cascade do |t|
    t.integer "finance_id", null: false
    t.integer "category_id", null: false
    t.index ["category_id", "finance_id"], name: "index_categories_finances_on_category_id_and_finance_id"
    t.index ["finance_id", "category_id"], name: "index_categories_finances_on_finance_id_and_category_id"
  end

  create_table "finances", force: :cascade do |t|
    t.integer "user_id", null: false
    t.text "title"
    t.float "transaction_cost"
    t.text "description"
    t.date "date_created"
    t.integer "transaction_type"
    t.float "amount"
    t.json "recurring"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["amount"], name: "index_finances_on_amount"
    t.index ["created_at"], name: "index_finances_on_created_at"
    t.index ["transaction_type"], name: "index_finances_on_transaction_type"
    t.index ["user_id"], name: "index_finances_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "middle_name"
    t.string "username"
    t.string "phonenumber"
    t.string "password_digest"
    t.string "email", null: false
    t.json "addresses"
    t.integer "role", default: 0
    t.string "profile_pic", default: "https://placehold.co/600x400"
    t.integer "status", default: 0
    t.float "salary"
    t.string "token"
    t.datetime "token_expiry"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "username", "token"], name: "index_users_on_email_and_username_and_token", unique: true
    t.index ["phonenumber"], name: "index_users_on_phonenumber", unique: true
    t.index ["role"], name: "index_users_on_role"
    t.index ["status"], name: "index_users_on_status"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "finances", "users"
end
