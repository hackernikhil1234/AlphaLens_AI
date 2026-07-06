import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Activity, BrainCircuit, TrendingUp } from 'lucide-react';
import { resolveCompany, createRun } from '../services/api';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');

    try {
      const company = await resolveCompany(query);
      const run = await createRun(company.ticker);
      navigate(`/analysis/${run.runId}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to start analysis. Ensure backend is running.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-2xl px-6 text-center space-y-8"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <BrainCircuit className="w-12 h-12 text-indigo-400" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white to-emerald-300">
          AlphaLens AI
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto">
          Multi-agent investment research. Enter a company name or ticker to generate an evidence-based recommendation.
        </p>

        <form onSubmit={handleAnalyze} className="relative mt-8 max-w-xl mx-auto group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
          <div className="relative flex items-center bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors">
            <div className="pl-4">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Apple or AAPL"
              className="w-full bg-transparent border-none text-white px-4 py-4 focus:outline-none placeholder-slate-500"
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <Activity className="w-5 h-5 animate-spin" />
              ) : (
                <>Analyze <TrendingUp className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </form>
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-4">
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
