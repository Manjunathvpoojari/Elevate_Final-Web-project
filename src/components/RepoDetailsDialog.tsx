import { GitHubRepo } from "@/types/github";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, GitFork, AlertCircle, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface RepoDetailsDialogProps {
  repo: GitHubRepo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
  onSaveNotes: () => void;
}

export const RepoDetailsDialog = ({
  repo,
  open,
  onOpenChange,
  notes,
  onNotesChange,
  onSaveNotes,
}: RepoDetailsDialogProps) => {
  if (!repo) return null;

  // Mock data for demonstration - in a real app, you'd fetch this from GitHub API
  const chartData = [
    { date: "Week 1", stars: repo.stargazers_count * 0.7, forks: repo.forks_count * 0.6 },
    { date: "Week 2", stars: repo.stargazers_count * 0.8, forks: repo.forks_count * 0.75 },
    { date: "Week 3", stars: repo.stargazers_count * 0.9, forks: repo.forks_count * 0.85 },
    { date: "Week 4", stars: repo.stargazers_count, forks: repo.forks_count },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <img
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
              className="w-10 h-10 rounded-full"
            />
            {repo.full_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-4">{repo.description}</p>
            
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="font-semibold">{repo.stargazers_count.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">stars</span>
              </div>
              <div className="flex items-center gap-2">
                <GitFork className="h-5 w-5" />
                <span className="font-semibold">{repo.forks_count.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">forks</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">{repo.open_issues_count.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">issues</span>
              </div>
            </div>

            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Repository Trends</h3>
            <ChartContainer
              config={{
                stars: {
                  label: "Stars",
                  color: "hsl(var(--chart-1))",
                },
                forks: {
                  label: "Forks",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line type="monotone" dataKey="stars" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  <Line type="monotone" dataKey="forks" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Repository Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Language:</span>
                <span className="ml-2 font-medium">{repo.language || "N/A"}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Created:</span>
                <span className="ml-2 font-medium">
                  {format(new Date(repo.created_at), "MMM d, yyyy")}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Updated:</span>
                <span className="ml-2 font-medium">
                  {format(new Date(repo.updated_at), "MMM d, yyyy")}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Owner:</span>
                <span className="ml-2 font-medium">{repo.owner.login}</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-base font-semibold mb-2 block">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add your notes about this repository..."
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              className="min-h-[100px] bg-background"
            />
            <Button onClick={onSaveNotes} className="mt-2">
              Save Notes
            </Button>
          </div>

          <Button variant="outline" className="w-full" asChild>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              View on GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
