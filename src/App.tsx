
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoodProvider } from "@/context/MoodContext";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Home from "@/pages/Home";
import MoodPage from "@/pages/MoodPage";
import ExercisesPage from "@/pages/ExercisesPage";
import JournalPage from "@/pages/JournalPage";
import ArticlesPage from "@/pages/ArticlesPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MoodProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col pt-16 pb-20">
            <Header />
            <main className="flex-1 px-4 py-6 overflow-hidden">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mood" element={<MoodPage />} />
                <Route path="/exercises" element={<ExercisesPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Navigation />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </MoodProvider>
  </QueryClientProvider>
);

export default App;
