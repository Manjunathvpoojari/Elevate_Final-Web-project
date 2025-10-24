import { GitHubRepo } from "@/types/github";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, AlertCircle, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface RepoCardProps {
  repo: GitHubRepo;
  isBookmarked: boolean;
  onBookmark: () => void;
  onViewDetails: () => void;
}

export const RepoCard = ({ repo, isBookmarked, onBookmark, onViewDetails }: RepoCardProps) => {
  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {repo.name}
            </h3>
            <p className="text-sm text-muted-foreground">{repo.owner.login}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onBookmark}
          className="shrink-0"
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-5 w-5 text-primary" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {repo.description || "No description available"}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 5).map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-primary" />
          <span>{repo.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="h-4 w-4" />
          <span>{repo.forks_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          <span>{repo.open_issues_count.toLocaleString()}</span>
        </div>
        {repo.language && (
          <Badge variant="outline" className="ml-auto">
            {repo.language}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Updated {formatDistanceToNow(new Date(repo.updated_at))} ago
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
          >
            Details
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};
