class SessionsController < ApplicationController
  
  def show
    @user = User.find_by(id: session[:user_id])

    if @user.present?
      render json: { user: UserSerializer.new(@user, include_associations: true) }, status: :ok
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    @user = User.find_by_email(params[:email])

    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: { user: UserSerializer.new(@user, include_associations: true) }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    render json: { message: "Logged out successfully" }, status: :ok
  end
end
