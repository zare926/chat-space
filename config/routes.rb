Rails.application.routes.draw do
  resources :products
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :edit, :update, :create] do
    resources :messages, only: [:create, :index]

    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
