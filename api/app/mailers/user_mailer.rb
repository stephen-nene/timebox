class UserMailer < ApplicationMailer
  def welcome_email(user, frontend_url)
    @user = user
    @activation_token = user.token
    @activation_url = "#{frontend_url}/activate/#{@activation_token}"
    selected_template = %w[welcome_template1 welcome_template2 welcome_template3].sample

    mail(to: @user.email, subject: "Welcome to Spendique!") do |format|
      format.html { render "user_mailer/#{selected_template}" }
    end
  end

  def change_password(user, frontend_url)
    @user = user
    @url = "#{frontend_url}/forgot/#{@user.token}"
    mail(to: @user.email, subject: "Security risk for your account")
  end

  def reset_password_email(user, frontend_url)
    @user = user
    @url = "#{frontend_url}/reset/#{@user.token}"
    @expiry_time = (@user.token_expiry - Time.current).to_i / 60 # Calculate expiry in minutes
    mail(to: @user.email, subject: "Password Reset")
  end

  def confirmation_email(user_name, user_email)
    @user_name = user_name
    @user_email = user_email

    mail(to: @user_email, subject: "We received your message!")
  end

  def notification_email(user_message)
    @user_name = user_message[:name]
    @user_email = user_message[:email]
    @subject = user_message[:subject]
    @message = user_message[:message]

    mail(to: "stevekid705@gmail.com", subject: "New Contact Form Submission")
  end
end
