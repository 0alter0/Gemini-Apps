import React, { useState } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import { condenseText } from './services/gemini';
import { SimplifiedResult, AppStatus } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [currentResult, setCurrentResult] = useState<SimplifiedResult | null>(null);
  const [history, setHistory] = useState<SimplifiedResult[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCondense = async (text: string) => {
    setStatus(AppStatus.LOADING);
    setErrorMessage(null);
    setCurrentResult(null); // Clear current result while loading new one

    try {
      const result = await condenseText(text);
      setCurrentResult(result);
      setHistory(prev => [result, ...prev].slice(0, 5)); // Keep last 5
      setStatus(AppStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred");
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <Header />

        <TextInput 
          onCondense={handleCondense} 
          isLoading={status === AppStatus.LOADING} 
        />

        {status === AppStatus.ERROR && errorMessage && (
          <div className="w-full max-w-2xl mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={20} />
            <p>{errorMessage}</p>
          </div>
        )}

        {status === AppStatus.SUCCESS && currentResult && (
          <ResultCard result={currentResult} />
        )}

        <HistoryList history={history} />
        
        {/* Footer */}
        <footer className="mt-auto pt-12 text-center text-slate-400 text-sm">
          <p>Powered by Google Gemini 2.5 Flash</p>
        </footer>
      </div>
    </div>
  );
};

export default App;