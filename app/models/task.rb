class Task < ApplicationRecord
  belongs_to :brain_dump

  validates :content, presence: true
end