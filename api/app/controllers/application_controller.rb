class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  def index
    render json: { message: 'Welcome to the API!' }
  end

  private

  def record_not_found(exception)
    render json: { error: "#{exception.model} not found" }, status: :not_found
  end
end
