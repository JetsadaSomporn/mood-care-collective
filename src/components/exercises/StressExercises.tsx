
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CalendarClock, HeartPulse, Brain } from 'lucide-react';

const exercises = [
  {
    id: 'breathing',
    title: 'Deep Breathing',
    description: 'Calm your mind with deep breathing exercises',
    duration: 60, // seconds
    icon: HeartPulse,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'meditation',
    title: 'Quick Meditation',
    description: 'A short guided meditation to center yourself',
    duration: 180, // seconds
    icon: Brain,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'relaxation',
    title: 'Progressive Relaxation',
    description: 'Release tension through progressive muscle relaxation',
    duration: 120, // seconds
    icon: CalendarClock,
    color: 'bg-green-100 text-green-600',
  },
];

const StressExercises = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
  const exercise = exercises.find(ex => ex.id === activeExercise);
  const progress = exercise ? (seconds / exercise.duration) * 100 : 0;
  
  const startExercise = (id: string) => {
    setActiveExercise(id);
    setSeconds(0);
    setTimerActive(true);
  };
  
  const stopExercise = () => {
    setTimerActive(false);
    setActiveExercise(null);
  };
  
  // Timer logic would need to be implemented here with useEffect
  // This is a simplified version
  
  return (
    <div className="w-full">
      {!activeExercise ? (
        <div className="grid gap-4">
          {exercises.map((ex) => (
            <Card key={ex.id} className="overflow-hidden transition-all card-hover">
              <div className="flex items-start p-4">
                <div className={`rounded-full p-3 mr-4 ${ex.color}`}>
                  <ex.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{ex.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{ex.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{ex.duration}s</span>
                    <Button size="sm" onClick={() => startExercise(ex.id)}>Start</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-display font-medium mb-1">{exercise?.title}</h2>
            <p className="text-muted-foreground">{exercise?.description}</p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className={`relative w-40 h-40 rounded-full flex items-center justify-center ${exercise?.color}`}>
              <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                <div className="animate-breathe">
                  <exercise.icon className="h-12 w-12" />
                </div>
              </div>
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-2" />
          <div className="flex justify-between text-sm mb-6">
            <span>{seconds}s</span>
            <span>{exercise?.duration}s</span>
          </div>
          
          <Button variant="outline" className="w-full" onClick={stopExercise}>
            End Session
          </Button>
        </Card>
      )}
    </div>
  );
};

export default StressExercises;
