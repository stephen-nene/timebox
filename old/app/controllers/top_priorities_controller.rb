class TopPrioritiesController < ApplicationController
  before_action :set_top_priority, only: %i[ show update destroy ]

  # GET /top_priorities
  def index
    if params[:user_id]
      @top_priorities = TopPriority.where(user_id: params[:user_id])
    else
      @top_priorities = TopPriority.all
    end

    render json: @top_priorities
  end

  # GET /top_priorities/1
  def show
    render json: @top_priority, serializer: TopPrioritySerializer, include_user: true
  end

  # POST /top_priorities
  def create
    @top_priority = TopPriority.new(top_priority_params)

    if @top_priority.save
      render json: @top_priority, status: :created, location: @top_priority
    else
      render json: @top_priority.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /top_priorities/1
  def update
    if @top_priority.update(top_priority_params)
      render json: @top_priority
    else
      render json: @top_priority.errors, status: :unprocessable_entity
    end
  end

  # DELETE /top_priorities/1
  def destroy
    @top_priority.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_top_priority
      @top_priority = TopPriority.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def top_priority_params
      params.require(:top_priority).permit(:one, :two, :three, :user_id, :date)
    end
end
