
import { useRef, useEffect, useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { Card } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { format, subDays } from 'date-fns';

const MoodGraph = () => {
  const { getRecentEntries } = useMood();
  const [data, setData] = useState<any[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const moodValues = {
      'great': 5,
      'good': 4,
      'okay': 3,
      'bad': 2,
      'awful': 1
    };
    
    // Get entries from the last 7 days
    const recentEntries = getRecentEntries(7);
    
    // Create an array of the last 7 days
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        date,
        dateFormatted: format(date, 'EEE'),
        value: null
      };
    });
    
    // Fill in mood values for days with entries
    recentEntries.forEach(entry => {
      const dateStr = format(entry.date, 'yyyy-MM-dd');
      const dayIndex = days.findIndex(day => 
        format(day.date, 'yyyy-MM-dd') === dateStr
      );
      
      if (dayIndex !== -1) {
        days[dayIndex].value = moodValues[entry.mood];
      }
    });
    
    setData(days);
  }, [getRecentEntries]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      let mood;
      
      if (value === 5) mood = 'Great';
      else if (value === 4) mood = 'Good';
      else if (value === 3) mood = 'Okay';
      else if (value === 2) mood = 'Bad';
      else if (value === 1) mood = 'Awful';
      else mood = 'No data';
      
      return (
        <div className="glass-morphism p-2 rounded-md text-sm shadow-sm border border-border/50">
          <p className="font-medium">{label}</p>
          <p className="text-primary">{mood}</p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Card className="p-4 glass-morphism">
      <h3 className="text-lg font-medium mb-3 px-2">Your Mood Trend</h3>
      <div className="h-[200px]" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="dateFormatted" 
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              tickLine={false}
            />
            <YAxis 
              domain={[1, 5]} 
              ticks={[1, 2, 3, 4, 5]} 
              hide 
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              dot={{ strokeWidth: 2, r: 4, stroke: '#fff' }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1 px-2">
        <span>Awful</span>
        <span>Great</span>
      </div>
    </Card>
  );
};

export default MoodGraph;
