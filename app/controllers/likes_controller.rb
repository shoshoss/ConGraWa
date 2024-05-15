class LikesController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @like = current_user.likes.build(post: @post)

    if @like.save
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to @post }
      end
    else
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to @post }
      end
    end
  end

  def destroy
    @like = current_user.likes.find(params[:id])
    @post = @like.post
    @like.destroy

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to @post }
    end
  end
end
