class TimeFrame < ApplicationRecord
  belongs_to :user

  validates :task, presence: true
  validates :date, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
end