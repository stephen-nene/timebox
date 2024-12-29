class BrainDump < ApplicationRecord
  belongs_to :user
  has_many :tasks
  
  validates :date, presence: true
end