class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  def index
    render json: { message_from_dev: "Time box server / route" }
    # render file: Rails.root.join('public', './index.html')

  end


end
