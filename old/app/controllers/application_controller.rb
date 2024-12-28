class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  def index
    render json: { message_from_dev: "Time-Box backend server" }
    # render file: Rails.root.join('public', './index.html')

  end


end
