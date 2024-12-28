CREATE TABLE "users"(
    "id" BIGINT NOT NULL,
    "first_name" BIGINT NOT NULL,
    "middle_name" BIGINT NOT NULL,
    "last_name" BIGINT NOT NULL,
    "email" BIGINT NOT NULL,
    "username" CHAR(255) NOT NULL,
    "password" BIGINT NOT NULL,
    "salary" FLOAT(53) NOT NULL,
    "role" VARCHAR(255) CHECK
        ("role" IN('')) NOT NULL,
        "status" VARCHAR(255)
    CHECK
        ("status" IN('')) NOT NULL,
        "token" BIGINT NOT NULL,
        "token_expiry" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "Finances"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "title" TEXT NOT NULL,
    "transaction_cost" FLOAT(53) NOT NULL,
    "description" TEXT NOT NULL,
    "type" VARCHAR(255) CHECK
        ("type" IN('')) NOT NULL,
        "amount" FLOAT(53) NOT NULL,
        "recurring" JSON NOT NULL
);
ALTER TABLE
    "Finances" ADD PRIMARY KEY("id");
CREATE TABLE "categories"(
    "id" BIGINT NOT NULL,
    "name" BIGINT NOT NULL,
    "status" VARCHAR(255) CHECK
        ("status" IN('')) NOT NULL
);
ALTER TABLE
    "categories" ADD PRIMARY KEY("id");
CREATE TABLE "finances_categoires"(
    "category_id" BIGINT NOT NULL,
    "finance_id" BIGINT NOT NULL
);
ALTER TABLE
    "finances_categoires" ADD PRIMARY KEY("category_id");
CREATE TABLE "Daily_reports"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "date" DATE NOT NULL,
    "notify_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "Daily_reports" ADD PRIMARY KEY("id");
CREATE TABLE "finance_report"(
    "finance_id" BIGINT NOT NULL,
    "report_id" BIGINT NOT NULL
);
ALTER TABLE
    "finance_report" ADD PRIMARY KEY("finance_id");
ALTER TABLE
    "Finances" ADD CONSTRAINT "finances_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "finances_categoires" ADD CONSTRAINT "finances_categoires_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "categories"("id");
ALTER TABLE
    "Daily_reports" ADD CONSTRAINT "daily_reports_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "finance_report" ADD CONSTRAINT "finance_report_report_id_foreign" FOREIGN KEY("report_id") REFERENCES "Daily_reports"("id");
ALTER TABLE
    "finance_report" ADD CONSTRAINT "finance_report_finance_id_foreign" FOREIGN KEY("finance_id") REFERENCES "Finances"("id");
ALTER TABLE
    "finances_categoires" ADD CONSTRAINT "finances_categoires_finance_id_foreign" FOREIGN KEY("finance_id") REFERENCES "Finances"("id");