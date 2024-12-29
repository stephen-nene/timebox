class BrainDumpSerializer < ActiveModel::Serializer
  attributes :id, :date, :user_id, :contents

  # belongs_to :user
  # has_many :tasks

  def contents
    object.tasks.pluck(:content)
  end
end
