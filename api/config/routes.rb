Rails.application.routes.draw do
  resources :categories
  resources :finances
  namespace :auth do
    post "login", to: "sessions#login"
    post "register", to: "sessions#register"
    post 'resend_activation', to: 'sessions#resend_activation'
    patch "activate/:token", to: "sessions#activate"
    post "forgot_password", to: "sessions#forgot_password"
    put "reset_password", to: "sessions#reset_password"
    get "me", to: "sessions#me"
    delete "logout", to: "sessions#logout"
  end
  post 'api/contact', to: 'contacts#create'

  resources :meetings
  resources :users
  resources :scholarships
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "application#index"
end
