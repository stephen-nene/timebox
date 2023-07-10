class TimeFrameSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :end_time, :task, :description, :date, :user_id

  # belongs_to :user
end
