class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :middle_name, :username, :phonenumber, :email, :addresses, :role, :profile_pic, :status, :salary
  has_many :meetings, through: :meeting_participants, if: :include_associations?

  def include_associations?
    instance_options[:include_associations]
  end
end
