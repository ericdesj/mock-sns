class FriendshipsController < ApplicationController
  def show
    @friendship = Friendship.where(user_id: params[:id])

    render json: @friendship
  end

  def create
    @friendship = current_user.friendships.build(:friend_id => params[:friend_id])
    if @friendship.save
      flash[:notice] = "Added friend."
      redirect_to root_path
    else
      flash[:notice] = "Unable to add friend."
      redirect_to root_path
    end
  end
end
