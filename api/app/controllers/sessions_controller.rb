class SessionsController < ApplicationController

    def find
        @user = User.find_by(id: session[:user_id])
    
        if @user.present?
          render json: { user: @user }, status: :ok
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
      end

    # def find
    #     render json: {info: 'find me'}
    # end

    def create
      user = User.find_by(email: params[:email])
  
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { message: 'Logged in successfully' }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    def destroy
      session[:user_id] = nil
      render json: { message: 'Logged out successfully' }
    end
  end
  