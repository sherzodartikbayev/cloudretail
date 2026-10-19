-- Up Migration
CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    token uuid DEFAULT gen_random_uuid() NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES users(id)
);

-- Down Migration
DROP TABLE tokens;