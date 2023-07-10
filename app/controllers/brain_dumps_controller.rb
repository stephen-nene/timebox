class BrainDumpsController < ApplicationController
  before_action :set_brain_dump, only: %i[ show update destroy ]

  # GET /brain_dumps
  def index
    if params[:user_id]
      @brain_dumps = BrainDump.where(user_id: params[:user_id])
    else
      @brain_dumps = BrainDump.all
    end

    render json: @brain_dumps
  end

  # GET /brain_dumps/1
  def show
    render json: @brain_dump
  end

  # POST /brain_dumps
  def create
    @brain_dump = BrainDump.new(brain_dump_params)

    if @brain_dump.save
      render json: @brain_dump, status: :created, location: @brain_dump
    else
      render json: @brain_dump.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /brain_dumps/1
  def update
    if @brain_dump.update(brain_dump_params)
      render json: @brain_dump
    else
      render json: @brain_dump.errors, status: :unprocessable_entity
    end
  end

  # DELETE /brain_dumps/1
  def destroy
    @brain_dump.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_brain_dump
      @brain_dump = BrainDump.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def brain_dump_params
      params.require(:brain_dump).permit(:user_id, :date)
    end
end
