-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create cats table
CREATE TABLE cats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meals table
CREATE TABLE meals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cat_id UUID REFERENCES cats(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  time TIME NOT NULL,
  portions INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feeding_logs table
CREATE TABLE feeding_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cat_id UUID REFERENCES cats(id) ON DELETE CASCADE,
  meal_id UUID REFERENCES meals(id) ON DELETE SET NULL,
  portions INTEGER NOT NULL DEFAULT 1,
  fed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_meals_cat_id ON meals(cat_id);
CREATE INDEX idx_feeding_logs_cat_id ON feeding_logs(cat_id);
CREATE INDEX idx_feeding_logs_fed_at ON feeding_logs(fed_at);

-- Enable Row Level Security (RLS)
ALTER TABLE cats ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can modify these later for authentication)
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

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_cats_updated_at BEFORE UPDATE ON cats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_meals_updated_at BEFORE UPDATE ON meals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 