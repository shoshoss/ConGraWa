# frozen_string_literal: true

Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  root 'static_pages#top'
  get 'privacy_policy', to: 'static_pages#privacy_policy'
  get 'terms_of_use', to: 'static_pages#terms_of_use'
  # モーダル用のプライバシーと利用規約
  get 'privacy_modal', to: 'static_pages#privacy_modal'
  get 'tou_modal', to: 'static_pages#tou_modal'

  resources :users, only: %i[new create]
  # モーダル用の新規登録ルーティング
  get 'signup_modal', to: 'users#new_modal', as: 'new_signup_modal'
  post 'signup_modal', to: 'users#create_modal', as: 'create_signup_modal'

  # get と post のリクエストをまとめるために match を使用
  match 'oauth/callback', to: 'oauths#callback', via: %i[get post]
  get 'oauth/:provider', to: 'oauths#oauth', as: :auth_at_provider

  get 'login', to: 'user_sessions#new'
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'

  # モーダル用のログインルーティング
  get 'login_modal', to: 'user_sessions#new_modal', as: 'new_login_modal'
  post 'login_modal', to: 'user_sessions#create_modal', as: 'create_login_modal'

  # パスワードリセットのルーティング
  resources :password_resets, only: %i[new create edit update]

  # 投稿のルーティング
  resources :posts, only: %i[index new create edit update destroy] do
    collection do
      get :privacy_settings
    end
    resources :likes, only: %i[create destroy]
  end

  # プロフィールのルーティング
  resource :profile, only: %i[show edit update]
  get '/:username_slug', to: 'profiles#show', as: :profile_show
end
