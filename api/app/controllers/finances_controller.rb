class FinancesController < ApplicationController
  before_action :set_finance, only: %i[ show update destroy ]
  include PaginationAndSerialization

  # GET /finances
  def index
    if session[:user_id]
      user = User.find_by(id: session[:user_id])

      if user.nil?
        render json: { error: "Unauthorized: User not found" }, status: :unauthorized and return
      end

      if params[:only_my_records] == "true"
        # Fetch records only associated with the logged-in user
        @finances = user.finances.order(created_at: :desc).page(params[:page])
      elsif user.admin?
        # Fetch all records for admins
        @finances = Finance.all.order(created_at: :desc).page(params[:page])
      else
        # Fetch records only associated with the user
        @finances = user.finances.order(created_at: :desc).page(params[:page])
      end

      render json: {
        finances: serialize_collection(@finances, FinanceSerializer),
        meta: pagination_meta(@finances),
      }
    else
      render json: { error: "Unauthorized: No session cookie" }, status: :unauthorized
    end
  end

  # GET /finances/1
  def show
    render json: @finance, include_associations: true
  end

  # POST /finances
  def create
    finance_params_with_user = finance_params.merge(user_id: finance_params[:user_id] || session[:user_id])
    category_ids = finance_params[:categories] || []
    date_created = params[:finance][:date_created].to_datetime
    puts "Date received (UTC): #{date_created.utc}"

    categories = Category.where(id: category_ids)

    @finance = Finance.new(finance_params_with_user.except(:categories))
    @finance.categories = categories

    if @finance.save
      render json: @finance, status: :created, location: @finance
    else
      render json: @finance.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /finances/1
  def update
    if @finance.update(finance_params)
      render json: @finance
    else
      render json: @finance.errors, status: :unprocessable_entity
    end
  end

  # DELETE /finances/1
  def destroy
    @finance.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_finance
    @finance = Finance.includes(:user, :categories).find_by(id: params[:id])
    if @finance.nil?
      render json: { error: "Finance not found with id=#{params[:id]}" }, status: :not_found
    end
  end

  # Only allow a list of trusted parameters through.
  def finance_params
    params.expect(finance: [:user_id, :title, :date_created, :transaction_cost, :description, :transaction_type, :amount, recurring: {}, categories: []])
  end

  # def pagination_meta(finances)
  #   {
  #     total_count: finances.total_count,
  #     total_pages: finances.total_pages,
  #     next_page: finances.next_page,
  #     current_page: finances.current_page,
  #     per_page: finances.limit_value,
  #   }
  # end
end
