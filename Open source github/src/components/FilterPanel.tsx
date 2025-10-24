import { FilterOptions } from "@/types/github";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const POPULAR_LANGUAGES = [
  "All",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Go",
  "Rust",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
];

export const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="sortBy" className="text-sm mb-2 block">Sort By</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, sortBy: value as FilterOptions["sortBy"] })
            }
          >
            <SelectTrigger id="sortBy" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="forks">Forks</SelectItem>
              <SelectItem value="updated">Recently Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="language" className="text-sm mb-2 block">Language</Label>
          <Select
            value={filters.language || "All"}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, language: value === "All" ? "" : value })
            }
          >
            <SelectTrigger id="language" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POPULAR_LANGUAGES.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="minStars" className="text-sm mb-2 block">Minimum Stars</Label>
          <Input
            id="minStars"
            type="number"
            min="0"
            value={filters.minStars}
            onChange={(e) =>
              onFiltersChange({ ...filters, minStars: parseInt(e.target.value) || 0 })
            }
            className="bg-background"
          />
        </div>
      </div>
    </Card>
  );
};
