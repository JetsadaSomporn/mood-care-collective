
import { useState } from 'react';
import ArticleCard from './ArticleCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { StaggeredFade } from '@/utils/animations';

// Sample articles data
const articlesData = [
  {
    id: '1',
    title: 'Understanding Anxiety and How to Cope',
    excerpt: 'Learn about the symptoms of anxiety and discover effective coping mechanisms that you can practice daily.',
    category: 'Anxiety',
    imageUrl: 'https://images.unsplash.com/photo-1474418397713-003ec9f449a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: 5,
  },
  {
    id: '2',
    title: 'The Science of Meditation',
    excerpt: 'Discover the neurological benefits of meditation and how it can improve your mental well-being over time.',
    category: 'Mindfulness',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: 7,
  },
  {
    id: '3',
    title: 'Improving Sleep Quality',
    excerpt: 'Poor sleep can affect your mental health. Learn techniques to improve your sleep hygiene and quality.',
    category: 'Sleep',
    imageUrl: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: 4,
  },
  {
    id: '4',
    title: 'Building Healthy Relationships',
    excerpt: 'Explore how healthy relationships contribute to mental wellness and techniques to improve communication.',
    category: 'Relationships',
    imageUrl: 'https://images.unsplash.com/photo-1521143584588-1e23f9cecd38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: 6,
  },
  {
    id: '5',
    title: 'Coping with Work Stress',
    excerpt: 'Work-related stress affects many people. Learn strategies to manage workplace stressors effectively.',
    category: 'Stress',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: 5,
  },
  {
    id: '6',
    title: 'The Power of Gratitude',
    excerpt: 'Practicing gratitude can significantly impact your mental health. Learn how to incorporate it into your daily routine.',
    category: 'Positivity',
    imageUrl: 'https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: 3,
  },
];

// Unique categories from articles
const categories = ['All', ...new Set(articlesData.map(article => article.category))];

const ArticleList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter articles based on search term and selected category
  const filteredArticles = articlesData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search articles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 focus-ring"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StaggeredFade staggerMs={100}>
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </StaggeredFade>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No articles found matching your criteria.</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
