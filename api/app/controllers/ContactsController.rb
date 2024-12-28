class ContactsController < ApplicationController
  def create
    # Get the parameters from the form
    user_message = params.require(:message).permit(:name, :email, :subject, :message)

    # Send confirmation to the user
    UserMailer.confirmation_email(user_message[:name], user_message[:email]).deliver_now

    # Send notification to your personal inbox
    UserMailer.notification_email(user_message).deliver_now

    # Respond with a success message
    render json: { message: "Your message has been sent successfully!" }, status: :ok
  rescue StandardError => e
    render json: { error: e }, status: :unprocessable_entity
  end
end
