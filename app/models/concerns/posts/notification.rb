module Posts
  module Notification
    extend ActiveSupport::Concern

    included do
      # いいねの通知を作成するメソッド
      def create_notification_like(current_user)
        return if current_user.id == user_id # 自分の投稿に対するいいねは通知しない

        existing_notification = current_user.sent_notifications.where(
          recipient_id: user_id,
          notifiable: self,
          action: 'like',
          created_at: 15.minutes.ago..Time.current
        ).first

        if existing_notification
          existing_notification.update!(unread: true, created_at: Time.current)
        else
          notification = current_user.sent_notifications.new(
            recipient_id: user_id, # 通知の受信者
            sender_id: current_user.id, # 通知の送信者
            notifiable: self, # いいねされた投稿
            action: 'like', # アクションタイプ
            unread: true # 未読状態
          )
          notification.save if notification.valid?
        end
      end

      # 返信の通知を作成するメソッド
      def create_notification_post(current_user)
        # 通知の作成
        notifications = direct_recipients.where.not(id: current_user.id).map do |recipient|
          current_user.sent_notifications.new(
            recipient_id: recipient.id,
            sender_id: current_user.id,
            notifiable: self,
            action: 'direct',
            unread: true
          )
        end
    
        notifications.each(&:save)
    
        # メール通知をバッチ処理で実行
        direct_recipients.where.not(id: current_user.id).each do |recipient|
          UserMailer.direct_notification(recipient, self).deliver_later if recipient.email_notify_on_direct_message
        end
      end

      # 投稿の通知を作成するメソッド
      def create_notification_post(current_user)
        direct_recipients.where.not(id: current_user.id).each do |recipient|
          notification = current_user.sent_notifications.new(
            recipient_id: recipient.id,
            sender_id: current_user.id,
            notifiable: self,
            action: 'direct',
            unread: true
          )
          notification.save!
    
          # メール通知をバッチ処理で実行
          UserMailer.direct_notification(recipient, self).deliver_later if recipient.email_notify_on_direct_message
        end
      end

      # リポスト通知を作成するメソッド
      def create_notification_repost(current_user)
        return if current_user.id == user_id # 自分の投稿に対するリポストは通知しない

        notification = current_user.sent_notifications.new(
          recipient_id: user_id, # 通知の受信者
          sender_id: current_user.id, # 通知の送信者
          notifiable: self, # リポストされた投稿
          action: 'repost', # アクションタイプ
          unread: true # 未読状態
        )
        notification.save if notification.valid?
      end
    end
  end
end
