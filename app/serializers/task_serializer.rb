class TaskSerializer < ActiveModel::Serializer
  attributes :id, :brain_dump_id, :content

  # belongs_to :brain_dump
end
