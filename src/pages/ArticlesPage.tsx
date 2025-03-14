
import ArticleList from '@/components/articles/ArticleList';

const ArticlesPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Mental Health Resources</h1>
        <p className="text-muted-foreground">
          Discover articles and insights to support your mental wellbeing.
        </p>
      </div>
      
      <ArticleList />
    </div>
  );
};

export default ArticlesPage;
