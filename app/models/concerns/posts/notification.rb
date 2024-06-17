module Posts
  module Notification
    extend ActiveSupport::Concern

    included do
      # 投稿の通知を作成するメソッド
      def create_notification_post(current_user)
        recipients = post_users.where(role: 'direct_recipient').pluck(:user_id)
        recipients.each do |recipient_id|
          next if recipient_id == current_user.id # 自分自身への通知は不要

          notification = current_user.sent_notifications.new(
            recipient_id:, # 通知の受信者
            sender_id: current_user.id, # 通知の送信者
            notifiable: self, # 投稿
            action: 'direct', # アクションタイプ
            unread: true # 未読状態
          )
          notification.save if notification.valid?

          # メール通知
          recipient = User.find(recipient_id)
          UserMailer.direct_notification(recipient, self).deliver_later if recipient.email_notify_on_direct_message
        end
      end

      # いいねの通知を作成するメソッド
      def create_notification_like(current_user)
        return if current_user.id == user_id # 自分の投稿に対するいいねは通知しない

        # 過去15分以内に同じ投稿に対する同じユーザーからの通知があるかをチェック
        existing_notification = current_user.sent_notifications.where(
          recipient_id: user_id,
          notifiable: self,
          action: 'like',
          created_at: 15.minutes.ago..Time.current
        ).first

        if existing_notification
          # 存在する場合は未読状態に更新
          existing_notification.update!(unread: true, created_at: Time.current)
        else
          # 新規通知を作成
          notification = current_user.sent_notifications.new(
            recipient_id: user_id, # 通知の受信者
            sender_id: current_user.id, # 通知の送信者
            notifiable: self, # いいねされた投稿
            action: 'like', # アクションタイプ
            unread: true, # 未読状態
            created_at: Time.current,
            updated_at: Time.current
          )
          notification.save if notification.valid? # 通知が有効なら保存
        end
      end

      # 返信の通知を作成するメソッド
      def create_notification_reply(current_user)
        recipient_id = parent_post.user_id
        return if current_user.id == recipient_id # 自分宛の返信は通知しない

        # 新規通知を作成
        notification = current_user.sent_notifications.new(
          recipient_id: parent_post.user_id, # 返信の親投稿のユーザーIDを通知の受信者とする
          sender_id: current_user.id, # 通知の送信者
          notifiable: self, # 返信
          action: 'reply', # アクションタイプ
          unread: true, # 未読状態
          created_at: Time.current,
          updated_at: Time.current
        )
        notification.save if notification.valid? # 通知が有効なら保存

        # 受信者がメール通知を有効にしている場合のみ送信
        recipient = User.find(recipient_id)
        return unless recipient.email_notify_on_reply

        UserMailer.reply_notification(recipient, self).deliver_later
      end

      # リポスト通知を作成するメソッド
      def create_notification_repost(current_user)
        return if current_user.id == user_id # 自分の投稿に対するリポストは通知しない

        # 新規通知を作成
        notification = current_user.sent_notifications.new(
          recipient_id: user_id, # 通知の受信者
          sender_id: current_user.id, # 通知の送信者
          notifiable: self, # リポストされた投稿
          action: 'repost', # アクションタイプ
          unread: true, # 未読状態
          created_at: Time.current,
          updated_at: Time.current
        )
        notification.save if notification.valid? # 通知が有効なら保存
      end
    end
  end
end
