class CreateJoinTableFinanceCategory < ActiveRecord::Migration[8.0]
  def change
    create_join_table :finances, :categories do |t|
      t.index [:finance_id, :category_id]
      t.index [:category_id, :finance_id]
    end
  end
end
