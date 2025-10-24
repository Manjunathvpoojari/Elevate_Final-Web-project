import { useState } from "react";
import { GitHubRepo, FilterOptions } from "@/types/github";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { useBookmarks } from "@/hooks/useBookmarks";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel } from "@/components/FilterPanel";
import { RepoCard } from "@/components/RepoCard";
import { RepoDetailsDialog } from "@/components/RepoDetailsDialog";
import { BookmarksPanel } from "@/components/BookmarksPanel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Github } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "stars",
    language: "",
    minStars: 1000,
  });
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [dialogNotes, setDialogNotes] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: repos, isLoading, error } = useGitHubRepos(searchQuery, filters);
  const {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateNotes,
    isBookmarked,
  } = useBookmarks();

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const handleBookmark = (repo: GitHubRepo) => {
    if (isBookmarked(repo.id)) {
      removeBookmark(repo.id);
      toast.success("Removed from bookmarks");
    } else {
      addBookmark(repo);
      toast.success("Added to bookmarks");
    }
  };

  const handleViewDetails = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    const bookmark = bookmarks.find((b) => b.id === repo.id);
    setDialogNotes(bookmark?.notes || "");
    setDialogOpen(true);
  };

  const handleSaveNotes = () => {
    if (selectedRepo) {
      if (isBookmarked(selectedRepo.id)) {
        updateNotes(selectedRepo.id, dialogNotes);
        toast.success("Notes saved");
      } else {
        addBookmark(selectedRepo, dialogNotes);
        toast.success("Bookmarked with notes");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Github className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">GitHub Explorer</h1>
                <p className="text-sm text-muted-foreground">Discover trending open source projects</p>
              </div>
            </div>
          </div>
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="bookmarks">
              Bookmarks ({bookmarks.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-1">
                <FilterPanel filters={filters} onFiltersChange={setFilters} />
              </aside>

              {/* Repositories Grid */}
              <div className="lg:col-span-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-destructive">Failed to load repositories</p>
                    <Button onClick={handleSearch} className="mt-4">
                      Try Again
                    </Button>
                  </div>
                ) : repos && repos.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {repos.map((repo) => (
                      <RepoCard
                        key={repo.id}
                        repo={repo}
                        isBookmarked={isBookmarked(repo.id)}
                        onBookmark={() => handleBookmark(repo)}
                        onViewDetails={() => handleViewDetails(repo)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No repositories found. Try adjusting your filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookmarks">
            <BookmarksPanel
              bookmarks={bookmarks}
              onRemove={removeBookmark}
              onView={handleViewDetails}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Details Dialog */}
      <RepoDetailsDialog
        repo={selectedRepo}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        notes={dialogNotes}
        onNotesChange={setDialogNotes}
        onSaveNotes={handleSaveNotes}
      />
    </div>
  );
};

export default Index;
