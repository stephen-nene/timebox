class TokenMailer < ApplicationMailer
  def reset_password_email(user, url)
    @user = user
    @url = url
    mail(to: @user.email, subject: "Password Reset")
  end
end
