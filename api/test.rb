require 'faker'
require 'set'

def debug_faker_unique_strains
  puts "Starting Faker Unique Strain Debugging\n"
  
  # Create a set to track unique values
  unique_strains = Set.new
  
  # Track attempts and failures
  total_attempts = 0
  unique_attempts = 0
  failed_attempts = 0

  begin
    70.times do |i|
      total_attempts += 1
      
      # Capture the current state of the unique generator
      begin
        strain = Faker::Cannabis.unique.strain
        
        # Check if strain is already in the set
        if unique_strains.include?(strain)
          puts "🚨 Duplicate detected: #{strain}"
          failed_attempts += 1
        else
          unique_strains.add(strain)
          unique_attempts += 1
          puts "✅ Unique Strain #{i + 1}: #{strain}"
        end
      rescue => e
        puts "❌ Error on attempt #{i + 1}: #{e.message}"
        failed_attempts += 1
        break
      end
    end

    puts "\n--- Summary ---"
    puts "Total Attempts: #{total_attempts}"
    puts "Unique Strains Generated: #{unique_attempts}"
    puts "Failed Attempts: #{failed_attempts}"
    puts "Unique Strains Set Size: #{unique_strains.size}"
    
    puts "\nAll Generated Unique Strains:"
    puts unique_strains.to_a
  rescue => e
    puts "💥 Overall Script Error: #{e.message}"
    puts e.backtrace
  end
end

debug_faker_unique_strains