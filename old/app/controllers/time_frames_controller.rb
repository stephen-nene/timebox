class TimeFramesController < ApplicationController
  before_action :set_time_frame, only: %i[ show update destroy ]

  # GET /time_frames
  def index
    if params[:user_id]
      @time_frames = TimeFrame.where(user_id: params[:user_id])
      else
        @time_frames = TimeFrame.all
      end

    render json: @time_frames
  end

  # GET /time_frames/1
  def show
    render json: @time_frame
  end

  # POST /time_frames
  def create
    @time_frame = TimeFrame.new(time_frame_params)

    if @time_frame.save
      render json: @time_frame, status: :created, location: @time_frame
    else
      render json: @time_frame.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /time_frames/1
  def update
    if @time_frame.update(time_frame_params)
      render json: @time_frame
    else
      render json: @time_frame.errors, status: :unprocessable_entity
    end
  end

  # DELETE /time_frames/1
  def destroy
    @time_frame.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_time_frame
      @time_frame = TimeFrame.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def time_frame_params
      params.require(:time_frame).permit(:start_time, :end_time, :task, :description, :date, :user_id)
    end
end
