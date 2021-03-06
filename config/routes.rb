Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'articles#index'

  resources :articles do
    resource :like, only: [:show, :create, :destroy]
    resources :comments, only: [:index, :new, :create]
  end

  resources :accounts, only: [:show] do
    resources :follows, only: [:create]
    resources :unfollows, only: [:create]
  end

  resource :profile, only: [:show, :edit, :update]
  resources :favorites, only: [:index]
end
