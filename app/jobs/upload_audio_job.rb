# app/jobs/upload_audio_job.rb
class UploadAudioJob < ApplicationJob
  queue_as :default

  def perform(post_id, audio)
    post = Post.find(post_id)
    post.audio.attach(audio)
    post.save!
  end
end
