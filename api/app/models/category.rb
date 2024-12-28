class Category < ApplicationRecord
  has_and_belongs_to_many :finances

  # Enum for status
  enum :status, { pending: 0, approved: 1, denied: 2 }

  # Validations
  validates :name, presence: true, uniqueness: { case_sensitive: false }

  # Callbacks
  before_save :downcase_name

  private

  # Ensure the name is stored in lowercase
  def downcase_name
    self.name = name.downcase.strip if name.present?
  end
end
