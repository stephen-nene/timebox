Rails.application.routes.draw do
  resources :timeframes
  resources :tasks
  resources :brain_dumps
  resources :top_priorities
  resources :users

  get    '/me',   to: 'sessions#find'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
