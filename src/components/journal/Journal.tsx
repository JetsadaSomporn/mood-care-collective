
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PenLine, Save, Clock, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { StaggeredFade } from '@/utils/animations';

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries).map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      })));
    }
  }, []);
  
  useEffect(() => {
    // Save entries to localStorage
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);
  
  const handleSubmit = () => {
    if (!newEntry.trim()) return;
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      content: newEntry.trim()
    };
    
    setEntries([entry, ...entries]);
    setNewEntry('');
    setShowForm(false);
  };
  
  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-display font-medium">Your Journal</h2>
        <Button 
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1"
        >
          <PenLine className="h-4 w-4" />
          {showForm ? 'Cancel' : 'New Entry'}
        </Button>
      </div>
      
      {showForm && (
        <Card className="p-4 mb-6 animate-fade-in glass-morphism">
          <Textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="min-h-[150px] mb-4 focus-ring"
          />
          <div className="flex justify-end gap-2">
            <Button 
              onClick={handleSubmit}
              disabled={!newEntry.trim()}
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              Save Entry
            </Button>
          </div>
        </Card>
      )}
      
      {entries.length > 0 ? (
        <div className="space-y-4">
          <StaggeredFade staggerMs={150}>
            {entries.map(entry => (
              <Card key={entry.id} className="p-4 animate-fade-in glass-morphism">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3 w-3" />
                  <span>{format(entry.date, 'MMMM d, yyyy - h:mm a')}</span>
                </div>
                <p className="whitespace-pre-wrap mb-3">{entry.content}</p>
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </StaggeredFade>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <PenLine className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p>No journal entries yet.</p>
          <p className="text-sm">Start writing to track your thoughts and emotions.</p>
        </div>
      )}
    </div>
  );
};

export default Journal;
