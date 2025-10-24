import { useQuery } from "@tanstack/react-query";
import { GitHubRepo, FilterOptions } from "@/types/github";

const GITHUB_API = "https://api.github.com";

export const useGitHubRepos = (
  searchQuery: string,
  filters: FilterOptions
) => {
  return useQuery({
    queryKey: ["github-repos", searchQuery, filters],
    queryFn: async () => {
      let query = searchQuery || "stars:>1000";
      
      if (filters.language) {
        query += ` language:${filters.language}`;
      }
      
      if (filters.minStars > 0) {
        query += ` stars:>=${filters.minStars}`;
      }

      const sortParam = filters.sortBy === "updated" ? "updated" : filters.sortBy;
      
      const response = await fetch(
        `${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&sort=${sortParam}&order=desc&per_page=30`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }

      const data = await response.json();
      return data.items as GitHubRepo[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
