class UsersController < ApplicationController
  skip_before_action :require_login, only: %i[new_modal create_modal new create guest_login]

  def new_modal
    @user = User.new
  end

  def create_modal
    if current_user&.guest?
      @user = current_user
      unless @user.update(user_params.merge(guest: false))
        flash.now[:error] = I18n.t('flash_messages.users.registration_failure')
      end
    else
      @user = User.new(user_params)
      if @user.save
        login(user_params[:email], user_params[:password])
      else
        flash.now[:error] = I18n.t('flash_messages.users.registration_failure')
      end
    end
    respond_to do |format|
      format.turbo_stream
    end
  end

  def new
    @user = User.new
  end

  def create
    if current_user&.guest?
      @user = current_user
      if @user.update(user_params.merge(guest: false))
        flash[:notice] = I18n.t('flash_messages.users.registration_success')
        redirect_to edit_profile_path, status: :see_other
      else
        flash.now[:error] = I18n.t('flash_messages.users.registration_failure')
        render :new, status: :unprocessable_entity
      end
    else
      @user = User.new(user_params)
      if @user.save
        login(user_params[:email], user_params[:password])
        flash[:notice] = I18n.t('flash_messages.users.registration_success')
        redirect_to edit_profile_path, status: :see_other
      else
        flash.now[:error] = I18n.t('flash_messages.users.registration_failure')
        render :new, status: :unprocessable_entity
      end
    end
  end

  def guest_login
    email = generate_unique_guest_email
    begin
      @user = User.create!(email: email, password: SecureRandom.hex(10), guest: true)
      auto_login(@user)
      redirect_to profile_show_path(username_slug: current_user.username_slug, category: 'all_likes_chance'),
                  notice: 'ありがとうございます！<br>お試しログインしました！<br>画面上部にある「引き継ぎ登録」よりデータを引き継げます。'
    rescue ActiveRecord::RecordInvalid => e
      # エラーハンドリング: 例えば、エラーメッセージをログに記録し、ユーザーに通知するなど
      Rails.logger.error "ゲストユーザーの作成に失敗しました: #{e.message}"
      redirect_to root_path, alert: 'ゲストログインに失敗しました。再度お試しください。'
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :display_name, :username_slug, :self_introduction)
  end

  def generate_unique_guest_email
    loop do
      email = "guest_#{SecureRandom.hex(10)}@example.com"
      break email unless User.exists?(email: email)
    end
  end
end
