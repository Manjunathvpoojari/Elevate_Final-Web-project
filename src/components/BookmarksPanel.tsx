import { BookmarkedRepo } from "@/types/github";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BookmarksPanelProps {
  bookmarks: BookmarkedRepo[];
  onRemove: (id: number) => void;
  onView: (repo: BookmarkedRepo) => void;
}

export const BookmarksPanel = ({ bookmarks, onRemove, onView }: BookmarksPanelProps) => {
  if (bookmarks.length === 0) {
    return (
      <Card className="p-8 bg-card border-border text-center">
        <p className="text-muted-foreground">No bookmarks yet. Start exploring and save your favorite repositories!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((repo) => (
        <Card key={repo.id} className="p-4 bg-card border-border">
          <div className="flex items-start gap-3">
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-foreground truncate">{repo.name}</h4>
                  <p className="text-xs text-muted-foreground">{repo.owner.login}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(repo.id)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {repo.notes && (
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{repo.notes}</p>
              )}
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                {repo.language && (
                  <Badge variant="outline" className="text-xs">
                    {repo.language}
                  </Badge>
                )}
                <span>Saved {formatDistanceToNow(new Date(repo.bookmarkedAt))} ago</span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onView(repo)}>
                  View Details
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
