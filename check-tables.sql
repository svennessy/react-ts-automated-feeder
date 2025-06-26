-- Check what tables exist in your database
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check the structure of existing tables
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('cats', 'meals', 'feeding_logs')
ORDER BY table_name, ordinal_position; 