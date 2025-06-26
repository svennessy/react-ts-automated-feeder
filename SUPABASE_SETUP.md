# Supabase Setup Guide

This guide will help you set up Supabase for your automated feeder project.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `automated-feeder` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to you
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## Step 3: Update Environment Variables

1. Open the `.env.local` file in your project
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql` from this project
4. Click "Run" to execute the SQL

This will create:
- `cats` table for storing cat information
- `meals` table for storing meal schedules
- `feeding_logs` table for tracking feeding history
- Proper indexes and security policies

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Go to the Settings page
3. Try adding a cat - it should now be saved to Supabase
4. Check your Supabase dashboard → **Table Editor** → **cats** to see the data

## Step 6: Enable Real-time Features (Optional)

To enable real-time updates across multiple devices:

1. In Supabase dashboard, go to **Database** → **Replication**
2. Enable real-time for the tables you want to sync:
   - `cats`
   - `meals`
   - `feeding_logs`

## Step 7: Set Up Authentication (Optional)

If you want to add user authentication later:

1. Go to **Authentication** → **Settings**
2. Configure your authentication providers
3. Update the RLS policies in the SQL schema to use user IDs

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Make sure your `.env.local` file has the correct values
   - Restart your development server after updating environment variables

2. **"Network error"**
   - Check your internet connection
   - Verify your Supabase URL is correct
   - Make sure your project is not paused (free tier projects pause after inactivity)

3. **"Permission denied"**
   - Check that RLS policies are set up correctly
   - Verify your API key has the right permissions

### Getting Help:

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## Next Steps

Once Supabase is set up, you can:

1. **Add meal management** using the `useMeals` hook
2. **Track feeding history** using the `useFeedingLogs` hook
3. **Add real-time notifications** when feeding times are due
4. **Implement user authentication** for multi-user support
5. **Add file upload** for cat photos using Supabase Storage

Happy coding! 🐱 