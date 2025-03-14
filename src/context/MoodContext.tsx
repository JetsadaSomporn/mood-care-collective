
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Mood = 'great' | 'good' | 'okay' | 'bad' | 'awful';

interface MoodEntry {
  id: string;
  date: Date;
  mood: Mood;
  note?: string;
}

interface MoodContextType {
  entries: MoodEntry[];
  addEntry: (mood: Mood, note?: string) => void;
  editEntry: (id: string, mood: Mood, note?: string) => void;
  deleteEntry: (id: string) => void;
  getEntryById: (id: string) => MoodEntry | undefined;
  getRecentEntries: (days: number) => MoodEntry[];
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    // Initialize with saved entries from localStorage or empty array
    const savedEntries = localStorage.getItem('moodEntries');
    return savedEntries ? JSON.parse(savedEntries).map((entry: any) => ({
      ...entry,
      date: new Date(entry.date)
    })) : [];
  });

  useEffect(() => {
    // Save entries to localStorage whenever they change
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (mood: Mood, note?: string) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood,
      note
    };
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const editEntry = (id: string, mood: Mood, note?: string) => {
    setEntries(prevEntries => 
      prevEntries.map(entry => 
        entry.id === id ? { ...entry, mood, note } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  const getEntryById = (id: string) => {
    return entries.find(entry => entry.id === id);
  };

  const getRecentEntries = (days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return entries.filter(entry => entry.date >= cutoffDate)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  return (
    <MoodContext.Provider value={{ 
      entries, 
      addEntry, 
      editEntry, 
      deleteEntry, 
      getEntryById,
      getRecentEntries
    }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};
