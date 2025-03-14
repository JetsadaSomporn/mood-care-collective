
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart, CalendarClock, PenLine, Book, ArrowRight, Brain } from 'lucide-react';
import { StaggeredFade } from '@/utils/animations';

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.scrollY;
      heroRef.current.style.transform = `translateY(${scrolled * 0.2}px)`;
      heroRef.current.style.opacity = `${1 - scrolled * 0.002}`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const features = [
    {
      title: 'Track Mood',
      description: 'Log your emotions daily and view trends over time',
      icon: BarChart,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      path: '/mood',
    },
    {
      title: 'Relax & Meditate',
      description: 'Follow guided stress relief exercises',
      icon: CalendarClock,
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      path: '/exercises',
    },
    {
      title: 'Journal',
      description: 'Write down your thoughts and feelings',
      icon: PenLine,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      path: '/journal',
    },
    {
      title: 'Learn',
      description: 'Read articles about mental health topics',
      icon: Book,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
      path: '/articles',
    },
  ];
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          ref={heroRef} 
          className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent transform-gpu"
        ></div>
        
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="mb-6 inline-block glass-morphism p-3 rounded-full">
            <Brain className="h-10 w-10 text-primary animate-pulse-gentle" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Take care of your mind
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
            Track your moods, practice mindfulness, and improve your mental wellbeing with personalized tools and insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button asChild size="lg" className="font-medium">
              <Link to="/mood">Start Tracking</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/articles">Explore Resources</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-12">
            Tools for your mental wellness
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggeredFade staggerMs={150}>
              {features.map((feature) => (
                <Card key={feature.title} className="overflow-hidden transition-all card-hover h-full">
                  <Link to={feature.path} className="flex h-full">
                    <div className="p-6 flex flex-col h-full">
                      <div className={`rounded-full p-3 w-fit mb-4 ${feature.color}`}>
                        <feature.icon className="h-6 w-6" />
                      </div>
                      
                      <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-1">{feature.description}</p>
                      
                      <div className="flex items-center text-primary font-medium mt-auto">
                        <span>Explore</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </StaggeredFade>
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="py-16 px-6 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-display italic mb-4">
            "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
          </blockquote>
          <cite className="text-muted-foreground">— Noam Shpancer</cite>
        </div>
      </section>
    </div>
  );
};

export default Home;
