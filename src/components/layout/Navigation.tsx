
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Book, CalendarClock, Home, PenLine } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Hide navigation when scrolling down, show when scrolling up
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/mood', icon: BarChart, label: 'Mood' },
    { path: '/exercises', icon: CalendarClock, label: 'Exercises' },
    { path: '/journal', icon: PenLine, label: 'Journal' },
    { path: '/articles', icon: Book, label: 'Articles' },
  ];

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-background glass-morphism border-t border-border/50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-md mx-auto px-4 py-2">
        <ul className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className={`relative ${isActive ? 'animate-pulse-gentle' : ''}`}>
                    <item.icon 
                      className={`h-6 w-6 transition-all ${
                        isActive ? 'scale-110' : 'scale-100'
                      }`} 
                    />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                    )}
                  </div>
                  <span className={`text-xs mt-1 font-medium transition-all ${
                    isActive ? 'opacity-100' : 'opacity-70'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
