# app/jobs/post_creation_job.rb
class PostCreationJob < ApplicationJob
  queue_as :default

  # 投稿を非同期で作成するジョブ
  # @param post_id [Integer] 投稿のID
  # @param recipient_ids [Array<Integer>] 受信者のIDリスト
  def perform(post_id, recipient_ids)
    post = Post.find(post_id)
    
    # 受信者がいる場合、PostUserを作成
    recipient_ids.each do |recipient_id|
      post.post_users.create(user_id: recipient_id, role: 'direct_recipient', approved: true)
    end if recipient_ids.present?

    # 投稿のプライバシー設定が 'selected_users' の場合、通知を非同期で作成
    if post.privacy == 'selected_users'
      NotificationJob.perform_later('direct', post.id)
    end
  rescue ActiveRecord::RecordNotFound => e
    Rails.logger.error "Failed to find post: #{e.message}"
  end
end
