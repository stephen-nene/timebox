class FinanceSerializer < ActiveModel::Serializer
  attributes :id, :title, :transaction_cost,:date_created, :description, :transaction_type, :amount, :recurring, :created_at, :updated_at
  # has_one :user,  if: :include_associations?
  has_many :categories, if: :include_associations?

  def include_associations?
    instance_options[:include_associations]
  end
  def user

    return unless object.user
    {
      id: object.user.id,
      username: object.user.username,
      email: object.user.email,
    }
  end

  def categories
    object.categories.map do |category|
      {
        id: category.id,
        name: category.name,
      }
    end
  end

end
