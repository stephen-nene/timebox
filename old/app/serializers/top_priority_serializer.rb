class TopPrioritySerializer < ActiveModel::Serializer
  attributes :id, :one, :two, :three, :date, :user_id

  def include_user?
  instance_options[:include_user]
  end

  belongs_to :user, if: :include_user?
end
