import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { educationLevels, getLevelById } from './data/curriculumIndex';
import { LevelId, TopicCategory } from './types/curriculum';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { LevelView } from './components/LevelView';
import { TopicView } from './components/TopicView';
import { useOnlineStatus } from './utils/usePWA';

export default function App() {
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicCategory | null>(null);

  const isOnline = useOnlineStatus();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedLevelId, selectedTopic]);

  const currentView: 'home' | 'level' | 'topic' = selectedTopic
    ? 'topic'
    : selectedLevelId
    ? 'level'
    : 'home';

  const handleGoHome = () => {
    setSelectedTopic(null);
    setSelectedLevelId(null);
  };

  const handleSelectLevel = (levelId: LevelId) => {
    setSelectedLevelId(levelId);
    setSelectedTopic(null);
  };

  const handleSelectTopic = (topic: TopicCategory) => {
    setSelectedLevelId(topic.levelId);
    setSelectedTopic(topic);
  };

  const activeLevel = selectedLevelId ? getLevelById(selectedLevelId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50/70 via-slate-50 to-white text-slate-900">
      <Navbar
        currentView={currentView}
        selectedLevelId={selectedLevelId}
        onGoHome={handleGoHome}
        onSelectLevel={handleSelectLevel}
      />

      {!isOnline && (
        <div className="bg-sky-900 text-sky-50 px-4 py-2 text-xs sm:text-sm flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Mode Offline</span>
        </div>
      )}

      <div className="flex-1">
        {currentView === 'home' && (
          <HomeView
            levels={educationLevels}
            onSelectLevel={handleSelectLevel}
          />
        )}

        {currentView === 'level' && activeLevel && (
          <LevelView
            level={activeLevel}
            onBackHome={handleGoHome}
            onSelectTopic={handleSelectTopic}
          />
        )}

        {currentView === 'topic' && activeLevel && selectedTopic && (
          <TopicView
            level={activeLevel}
            topic={selectedTopic}
            onBackToLevel={() => setSelectedTopic(null)}
            onSelectTopic={handleSelectTopic}
          />
        )}
      </div>

      {currentView !== 'home' && (
        <footer className="border-t border-sky-100 bg-white/80 mt-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-2 font-display font-bold text-sky-900">
              <img
                src="/assets/aistudio/file_000000001eb48211b201594bed1ca3e5_b3a4c42c.png"
                alt="Logo LUGHAVERSE"
                className="w-6 h-6 rounded-md object-contain bg-white border border-sky-100 p-0.5"
              />
              <span>LUGHAVERSE</span>
            </span>
            <div className="flex items-center gap-4">
              {educationLevels.map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => handleSelectLevel(lvl.id)}
                  className="hover:text-sky-700 transition-colors"
                >
                  {lvl.shortTitle}
                </button>
              ))}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
