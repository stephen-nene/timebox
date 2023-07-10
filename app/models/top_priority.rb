class TopPriority < ApplicationRecord
  belongs_to :user

  validates :one, presence: true
  validates :two, presence: true
  validates :three, presence: true
  validates :date, presence: true
end