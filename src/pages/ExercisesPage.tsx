
import StressExercises from '@/components/exercises/StressExercises';
import { Card } from '@/components/ui/card';
import { CalendarClock, Brain, HeartPulse } from 'lucide-react';
import { StaggeredFade } from '@/utils/animations';

const ExercisesPage = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Stress Relief</h1>
        <p className="text-muted-foreground">
          Simple exercises to help you relax and manage stress throughout your day.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StaggeredFade staggerMs={100}>
            <Card className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <HeartPulse className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm font-medium">Reduces Anxiety</h3>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm font-medium">Improves Focus</h3>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <CalendarClock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm font-medium">Better Sleep</h3>
            </Card>
          </StaggeredFade>
        </div>
        
        <StressExercises />
      </div>
      
      <div className="mt-12 mb-8">
        <h2 className="text-xl font-display font-bold mb-4">Tips for Daily Practice</h2>
        <Card className="p-6 glass-morphism">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">1</span>
              <span>Set aside dedicated time each day for your practice</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">2</span>
              <span>Find a quiet space where you won't be disturbed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">3</span>
              <span>Stay consistent - even a few minutes daily is beneficial</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">4</span>
              <span>Be patient with yourself - relaxation is a skill that improves with time</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ExercisesPage;
