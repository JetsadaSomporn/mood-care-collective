
import { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { StaggeredFade } from '@/utils/animations';
import { Smile, SmilePlus, Meh, Frown, FrownPlus } from 'lucide-react';

type Mood = 'great' | 'good' | 'okay' | 'bad' | 'awful';

const MoodTracker = () => {
  const { addEntry } = useMood();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const moodOptions = [
    { value: 'great', icon: SmilePlus, label: 'Great', color: 'text-green-500' },
    { value: 'good', icon: Smile, label: 'Good', color: 'text-emerald-400' },
    { value: 'okay', icon: Meh, label: 'Okay', color: 'text-amber-400' },
    { value: 'bad', icon: Frown, label: 'Bad', color: 'text-orange-500' },
    { value: 'awful', icon: FrownPlus, label: 'Awful', color: 'text-red-500' },
  ];

  const handleSubmit = () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    
    // Add the mood entry
    addEntry(selectedMood, note.trim() || undefined);
    
    // Show confirmation and reset form
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedMood(null);
      setNote('');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 glass-morphism animate-fade-in">
        {showConfirmation ? (
          <div className="text-center py-8 animate-scale-in">
            <div className="mb-3 text-primary">
              <Smile className="w-16 h-16 mx-auto animate-pulse-gentle" />
            </div>
            <h3 className="text-xl font-medium mb-2">Thank you!</h3>
            <p className="text-muted-foreground">Your mood has been recorded.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-display font-medium mb-6 text-center">How are you feeling today?</h2>
            
            <div className="grid grid-cols-5 gap-2 mb-6">
              <StaggeredFade staggerMs={100}>
                {moodOptions.map((option) => (
                  <div 
                    key={option.value} 
                    className={`flex flex-col items-center transition-all cursor-pointer p-3 rounded-lg ${
                      selectedMood === option.value 
                        ? 'bg-primary/10 scale-105' 
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setSelectedMood(option.value as Mood)}
                  >
                    <option.icon className={`h-8 w-8 ${option.color} transition-transform ${
                      selectedMood === option.value ? 'scale-110' : ''
                    }`} />
                    <span className={`text-xs mt-2 font-medium ${
                      selectedMood === option.value ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                ))}
              </StaggeredFade>
            </div>
            
            <Textarea
              placeholder="Add a note about how you're feeling (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[100px] mb-6 focus-ring"
            />
            
            <Button 
              onClick={handleSubmit}
              disabled={!selectedMood || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Saving...' : 'Save Mood'}
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default MoodTracker;
