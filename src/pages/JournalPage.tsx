
import Journal from '@/components/journal/Journal';

const JournalPage = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Your Journal</h1>
        <p className="text-muted-foreground">
          Reflect on your thoughts and feelings in a private space.
        </p>
      </div>
      
      <Journal />
    </div>
  );
};

export default JournalPage;
