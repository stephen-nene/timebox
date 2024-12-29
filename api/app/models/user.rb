class User < ApplicationRecord
  enum :role, { user: 0, admin: 2 }
  enum :status, { pending: 0, active: 1, suspended: 2 }
  def admin?
    role == 'admin' # Adjust based on your database schema
  end
  has_secure_password
  
  has_many :finances

  before_save { self.email = email.downcase }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }

  # creates a new reset token
  def generate_token(expiry_time = 10.minutes.from_now)
    # has_secure_token
    self.token = SecureRandom.base58(24)
    self.token_expiry = expiry_time
    save!
  end

  # deletes a used reset token
  def clear_token
    self.token = nil
    self.token_expiry = nil
    save!
  end
end
