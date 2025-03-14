
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [title, setTitle] = useState('MindCare');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set the title based on current route
    switch (location.pathname) {
      case '/':
        setTitle('MindCare');
        break;
      case '/mood':
        setTitle('Mood Tracker');
        break;
      case '/exercises':
        setTitle('Exercises');
        break;
      case '/journal':
        setTitle('Journal');
        break;
      case '/articles':
        setTitle('Articles');
        break;
      default:
        setTitle('MindCare');
    }
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        scrolled 
          ? 'glass-morphism backdrop-blur-lg bg-white/70 dark:bg-black/50 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 transition-all duration-300">
          <Brain className="h-6 w-6 text-primary animate-fade-in" />
          <h1 className={`font-display font-bold text-xl transition-all duration-300 ${
            scrolled ? 'text-primary' : 'text-foreground'
          }`}>
            {title}
          </h1>
        </div>
        <Button variant="ghost" size="icon" className="focus-ring">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
