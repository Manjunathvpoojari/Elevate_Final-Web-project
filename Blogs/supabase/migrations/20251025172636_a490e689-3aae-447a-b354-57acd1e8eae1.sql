-- Add foreign key relationship between posts and profiles
ALTER TABLE public.posts
  ADD CONSTRAINT posts_author_id_fkey 
  FOREIGN KEY (author_id) 
  REFERENCES public.profiles(id) 
  ON DELETE CASCADE;