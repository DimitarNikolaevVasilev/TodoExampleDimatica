CREATE OR REPLACE FUNCTION  update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE IF NOT EXISTS duty (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp
);

DROP TRIGGER IF EXISTS update_duty_updated_at ON duty;
CREATE TRIGGER update_duty_updated_at BEFORE UPDATE
    ON duty FOR EACH ROW EXECUTE PROCEDURE update_updated_at();