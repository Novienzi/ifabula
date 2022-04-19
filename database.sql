CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar unique ,
  "password" varchar,
  "created_at" timestamptz default CURRENT_TIMESTAMP,
  "updated_at" timestamptz default CURRENT_TIMESTAMP
);

CREATE TABLE "companies" (
  "id" SERIAL PRIMARY KEY,
  "company_name" varchar unique,
  "company_code" varchar,
  "created_at" timestamptz default CURRENT_TIMESTAMP,
  "updated_at" timestamptz default CURRENT_TIMESTAMP
);

CREATE TABLE "goods" (
  "id" SERIAL PRIMARY KEY,
  "company_id" int,
  "name" varchar,
  "stock" int,
  "price" real,
  "created_at" timestamptz default CURRENT_TIMESTAMP,
  "updated_at" timestamptz default CURRENT_TIMESTAMP
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "good_id" int,
  "qty" int,
  "grand_total" real,
  "created_at" timestamptz default CURRENT_TIMESTAMP,
  "updated_at" timestamptz default CURRENT_TIMESTAMP
);

ALTER TABLE "goods" ADD FOREIGN KEY ("company_id") REFERENCES "companies" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("good_id") REFERENCES "goods" ("id");

-- ALTER TABLE "companies" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");