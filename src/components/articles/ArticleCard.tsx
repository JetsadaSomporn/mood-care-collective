
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { LazyImage } from '@/utils/animations';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  readTime: number;
}

const ArticleCard = ({ id, title, excerpt, category, imageUrl, readTime }: ArticleCardProps) => {
  return (
    <Link to={`/articles/${id}`}>
      <Card className="overflow-hidden h-full transition-all card-hover border-border/30">
        <div className="aspect-video relative">
          <LazyImage
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge variant="secondary" className="absolute top-3 left-3 glass-morphism">
            {category}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-display font-medium text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{readTime} min read</span>
            <span className="text-primary font-medium">Read more</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
