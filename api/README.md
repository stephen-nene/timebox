### **Schedule of Work for "Sendique" Project**

Here’s a detailed **plan** for the remaining tasks, broken down into weeks. Since you already have authentication completed and the database scaffolded, the focus will be on building core features, refining the UI, testing, and deploying.

---

#### **Week 1: Core Feature Development**
**Objective**: Implement CRUD functionality for finances and categories.

- **Day 1-2**: 
  - Implement CRUD operations for finances.
  - Create basic views (index, show, new, edit) for finances.
  - Add logic for associating finances with categories.

- **Day 3-4**: 
  - Implement CRUD operations for categories.
  - Create basic views for categories.
  - Ensure users can filter finances by category.

- **Day 5-6**: 
  - Develop logic for recurring transactions.
  - Add database validations and model tests for finances and categories.
  - Seed the database with sample data for testing.

- **Day 7**: 
  - Test all functionality (manual testing and RSpec or similar for automated tests).

---

#### **Week 2: User Experience and Design**
**Objective**: Improve the UI/UX and ensure responsiveness.

- **Day 1-2**: 
  - Design and integrate a dashboard page showing:
    - Financial summaries (e.g., total expenses, income, and remaining budget).
    - Graphical representations (use a gem like Chartkick or integration with a frontend library for charts).
  - Enhance forms for adding/editing finances and categories.

- **Day 3-4**: 
  - Style the application using CSS frameworks (e.g., Bootstrap or TailwindCSS).
  - Make the application mobile-friendly.

- **Day 5-6**: 
  - Create mock-ups for remaining pages (e.g., reports, account settings).
  - Add user profile page (if needed).

- **Day 7**: 
  - Conduct usability testing and gather feedback.

---

#### **Week 3: Advanced Features and Deployment**
**Objective**: Add advanced functionality and prepare for deployment.

- **Day 1-2**: 
  - Implement search and filtering for finances (e.g., by date, amount, category).
  - Add sorting functionality (e.g., by highest/lowest amount, most recent).

- **Day 3-4**: 
  - Add pagination for large datasets (use gems like Kaminari or WillPaginate).
  - Implement export functionality (e.g., download financial data as CSV/Excel).

- **Day 5-6**: 
  - Prepare for deployment:
    - Set up production environment (Heroku or other hosting service).
    - Test deployment pipeline.
    - Ensure database migrations work in production.

- **Day 7**: 
  - Deploy the application.
  - Test in a live environment.

---

#### **Week 4: Polish and Final Submission**
**Objective**: Refine, test, and prepare the pitch presentation.

- **Day 1-2**: 
  - Fix any remaining bugs or issues from live testing.
  - Write clear documentation for the application (README, setup instructions).

- **Day 3-4**: 
  - Record a demo video showing the application in use.
  - Finalize the pitch presentation slides.

- **Day 5-6**: 
  - Peer review with classmates (using Slack or designated platform).
  - Address feedback from reviews.

- **Day 7**: 
  - Submit the project.

---

This schedule is aggressive but manageable since you've already completed significant portions (auth and scaffolding). Let me know if you’d like more detailed guidance on any specific feature!






Yes, you can absolutely add a new table to save daily records for analysis and dashboards. This approach is common in applications that track user activity and provide insights over time. Here’s a plan for how to implement it:

---

### **Steps to Add the New Table**

1. **Define the Table**  
   The new table could be called something like `daily_records`. It will store aggregated data for each user on a per-day basis.

   Example attributes:
   - `user_id` (references the `users` table)
   - `date` (the date the record corresponds to)
   - `total_expenses` (sum of expenses for the day)
   - `total_income` (sum of income for the day)
   - `net_balance` (income - expenses for the day)
   - Any other metrics you want to track (e.g., savings, recurring transactions).

2. **Create the Migration**
   Run a Rails migration to create the new table:

   ```bash
   rails generate migration CreateDailyRecords
   ```

   Edit the migration file:

   ```ruby
   class CreateDailyRecords < ActiveRecord::Migration[8.0]
     def change
       create_table :daily_records do |t|
         t.references :user, null: false, foreign_key: true
         t.date :date, null: false
         t.float :total_expenses, default: 0.0
         t.float :total_income, default: 0.0
         t.float :net_balance, default: 0.0

         t.timestamps
       end

       add_index :daily_records, [:user_id, :date], unique: true
     end
   end
   ```

   Run the migration:

   ```bash
   rails db:migrate
   ```

3. **Add a Model**
   Create a model to handle the new table:

   ```bash
   rails generate model DailyRecord
   ```

   Edit the model:

   ```ruby
   class DailyRecord < ApplicationRecord
     belongs_to :user

     validates :date, presence: true
     validates :total_expenses, :total_income, :net_balance, numericality: true
   end
   ```

4. **Add a Background Job or Task**
   Use a scheduled task to calculate and save the daily records:

   - Add a job to compute daily aggregates:

     ```ruby
     class ComputeDailyRecordJob < ApplicationJob
       queue_as :default

       def perform
         User.find_each do |user|
           today = Date.today
           expenses = user.finances.where(transaction_type: 'expense', created_at: today.all_day).sum(:transaction_cost)
           income = user.finances.where(transaction_type: 'income', created_at: today.all_day).sum(:amount)

           DailyRecord.find_or_create_by(user: user, date: today) do |record|
             record.total_expenses = expenses
             record.total_income = income
             record.net_balance = income - expenses
           end
         end
       end
     end
     ```

   - Schedule this job using a gem like [sidekiq-cron](https://github.com/ondrejbartas/sidekiq-cron) or the Rails built-in scheduler.

5. **Display Data on the Dashboard**
   Fetch the aggregated data in the controller and pass it to the dashboard view:

   ```ruby
   class DashboardsController < ApplicationController
     def show
       @daily_records = current_user.daily_records.order(date: :desc)
     end
   end
   ```

   Use this data to build graphs or tables for analysis.

---

### **Benefits of This Table**
- **Performance**: By precomputing the daily aggregates, you reduce the load on your app when generating dashboards.
- **Historical Data**: You can provide users with insights into their spending and income trends over time.
- **Flexibility**: Add metrics later as needed (e.g., average daily spending).

---

If you’d like help implementing specific parts, let me know!