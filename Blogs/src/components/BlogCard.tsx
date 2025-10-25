import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    cover_image?: string;
    published_at: string;
    slug: string;
    categories?: {
      name: string;
      slug: string;
    };
    profiles?: {
      full_name?: string;
    };
  };
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to={`/post/${post.slug}`} className="block group">
      <Card className="h-full overflow-hidden transition-all hover:shadow-[var(--shadow-hover)] border-border/50">
        {post.cover_image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            {post.categories && (
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {post.categories.name}
              </Badge>
            )}
          </div>
          <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
          {post.profiles?.full_name && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.profiles.full_name}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
