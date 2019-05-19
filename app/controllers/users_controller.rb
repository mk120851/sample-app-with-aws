class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user
  end

  def create
    user = User.create!(user_params)
    # bucketを設定
    bucket = Aws::S3::Resource.new(
      :region => 'ap-northeast-1',
      # keyは.envファイルに補完しています. 
      :access_key_id => ENV['AWS_ACCCES_KEY'],
      :secret_access_key => ENV['AWS_ACCCES_SECRET_KEY'],
      ).bucket('sample_bucket') 
    # sample_bucketにencodeされた画像データをupload
    bucket.object("user_id_#{user.id}_profile_image").put(:body => params[:image_data])
    render json: user
  end

  private

  def user_params
    params.permit(:name, :image_data)
  end
end