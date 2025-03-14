
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MoodTracker from '@/components/mood/MoodTracker';
import MoodGraph from '@/components/mood/MoodGraph';
import { useMood } from '@/context/MoodContext';
import { CalendarClock, Clock } from 'lucide-react';
import { format } from 'date-fns';

const MoodPage = () => {
  const { entries } = useMood();
  const [showTracker, setShowTracker] = useState(!entries.length);
  const [greeting, setGreeting] = useState('');
  
  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);
  
  const todayEntry = entries.find(entry => 
    format(entry.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );
  
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-8 text-center">
        <p className="text-lg text-muted-foreground mb-2">{greeting}</p>
        <h1 className="text-3xl font-display font-bold mb-4">How are you feeling?</h1>
        <p className="text-muted-foreground">
          {todayEntry 
            ? "You've already logged your mood today. You can view your trends below."
            : "Track your emotions and see patterns over time."}
        </p>
      </div>
      
      {showTracker ? (
        <div className="mb-8 animate-fade-in">
          <MoodTracker />
        </div>
      ) : (
        <div className="mb-6 text-center">
          <Button 
            onClick={() => setShowTracker(true)} 
            className="glass-morphism"
          >
            {todayEntry ? "Update Today's Mood" : "Track Today's Mood"}
          </Button>
        </div>
      )}
      
      {entries.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          <MoodGraph />
          
          <Card className="p-4 glass-morphism">
            <h3 className="text-lg font-medium mb-3">Recent Entries</h3>
            <div className="space-y-3">
              {entries.slice(0, 3).map(entry => (
                <div key={entry.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(entry.date, 'MMM d, h:mm a')}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-sm text-muted-foreground">{entry.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {entries.length > 3 && (
              <div className="mt-3 text-center">
                <Button variant="link" size="sm">
                  View All Entries
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default MoodPage;
