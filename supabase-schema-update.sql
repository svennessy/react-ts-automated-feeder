-- Safe schema update - only adds missing components
-- This script won't recreate existing tables

-- Enable UUID extension (safe to run multiple times)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create indexes if they don't exist (safe to run multiple times)
CREATE INDEX IF NOT EXISTS idx_meals_cat_id ON meals(cat_id);
CREATE INDEX IF NOT EXISTS idx_feeding_logs_cat_id ON feeding_logs(cat_id);
CREATE INDEX IF NOT EXISTS idx_feeding_logs_fed_at ON feeding_logs(fed_at);

-- Enable Row Level Security (safe to run multiple times)
ALTER TABLE cats ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access to cats" ON cats;
DROP POLICY IF EXISTS "Allow public insert access to cats" ON cats;
DROP POLICY IF EXISTS "Allow public update access to cats" ON cats;
DROP POLICY IF EXISTS "Allow public delete access to cats" ON cats;

DROP POLICY IF EXISTS "Allow public read access to meals" ON meals;
DROP POLICY IF EXISTS "Allow public insert access to meals" ON meals;
DROP POLICY IF EXISTS "Allow public update access to meals" ON meals;
DROP POLICY IF EXISTS "Allow public delete access to meals" ON meals;

DROP POLICY IF EXISTS "Allow public read access to feeding_logs" ON feeding_logs;
DROP POLICY IF EXISTS "Allow public insert access to feeding_logs" ON feeding_logs;
DROP POLICY IF EXISTS "Allow public update access to feeding_logs" ON feeding_logs;
DROP POLICY IF EXISTS "Allow public delete access to feeding_logs" ON feeding_logs;

-- Create policies for public access
CREATE POLICY "Allow public read access to cats" ON cats FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to cats" ON cats FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to cats" ON cats FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to cats" ON cats FOR DELETE USING (true);

CREATE POLICY "Allow public read access to meals" ON meals FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to meals" ON meals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to meals" ON meals FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to meals" ON meals FOR DELETE USING (true);

CREATE POLICY "Allow public read access to feeding_logs" ON feeding_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to feeding_logs" ON feeding_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to feeding_logs" ON feeding_logs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access to feeding_logs" ON feeding_logs FOR DELETE USING (true);

-- Create function to update updated_at timestamp (safe to run multiple times)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist (to avoid conflicts)
DROP TRIGGER IF EXISTS update_cats_updated_at ON cats;
DROP TRIGGER IF EXISTS update_meals_updated_at ON meals;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_cats_updated_at BEFORE UPDATE ON cats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meals_updated_at BEFORE UPDATE ON meals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 