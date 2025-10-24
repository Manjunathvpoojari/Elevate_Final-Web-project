export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface BookmarkedRepo extends GitHubRepo {
  notes: string;
  bookmarkedAt: string;
}

export interface FilterOptions {
  sortBy: 'stars' | 'updated' | 'forks';
  language: string;
  minStars: number;
}
