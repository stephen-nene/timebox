class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email

  def include_associations?
    instance_options[:include_associations]
  end

  has_many :brain_dumps, if: :include_associations?
  has_many :top_priorities, if: :include_associations?
  has_many :time_frames, if: :include_associations?
end
