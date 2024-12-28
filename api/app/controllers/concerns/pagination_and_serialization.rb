# app/controllers/concerns/pagination_and_serialization.rb
module PaginationAndSerialization
  extend ActiveSupport::Concern

  included do
    # Default meta data helper for pagination
    def pagination_meta(collection)
      {
        current_page: collection.current_page,
        next_page: collection.next_page,
        prev_page: collection.prev_page,
        total_count: collection.total_count,
        total_pages: collection.total_pages,
        per_page: collection.limit_value,
        offset_value: collection.offset_value,
        limit_value: collection.limit_value,
      }
    end

    # Generic method to serialize resources
    def serialize_collection(collection, serializer)
      collection.map { |resource| serializer.new(resource) }
    end
  end
end
