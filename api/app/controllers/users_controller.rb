class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    @users = User.all.page(params[:page])

    render json: {
             users: @users.map { |user| UserSerializer.new(user) },
             meta: pagination_meta(@users),
           }
  end

  # GET /users/1
  def show
    render json: @user, include_associations: true
  end

  # GET /users/1/finances

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.includes(:meetings).find_by(id: params[:id])
    if @user.nil?
      render json: { error: "User not found with id=#{params[:id]}" }, status: :not_found
    end
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.expect(user: [:first_name, :last_name, :middle_name, :username, :phonenumber, :password_digest, :email, :role, :profile_pic, :status, addresses: {}])
  end

  def pagination_meta(users)
    {
      total_count: users.total_count,
      total_pages: users.total_pages,
      next_page: users.next_page,
      current_page: users.current_page,
      per_page: users.limit_value,
      offset_value: users.offset_value,
      limit_value: users.limit_value,
    }
  end
end
