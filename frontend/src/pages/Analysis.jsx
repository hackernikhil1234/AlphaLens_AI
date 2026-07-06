import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getRunStatus } from '../services/api';
import AgentCard from '../components/AgentCard';

export default function Analysis() {
  const { runId } = useParams();
  const navigate = useNavigate();
  const [run, setRun] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let intervalId;

    const pollStatus = async () => {
      try {
        const data = await getRunStatus(runId);
        setRun(data);

        if (data.status === 'completed' || data.status === 'no_recommendation' || data.status === 'failed') {
          clearInterval(intervalId);
          setTimeout(() => navigate(`/report/${runId}`), 1500);
        }
      } catch (err) {
        setError('Failed to fetch status. Retrying...');
      }
    };

    pollStatus();
    intervalId = setInterval(pollStatus, 2500);

    return () => clearInterval(intervalId);
  }, [runId, navigate]);

  const agents = run?.agents || [
    { name: 'Research Agent', status: 'pending' },
    { name: 'Financial Agent', status: 'pending' },
    { name: 'News Agent', status: 'pending' },
    { name: 'Risk Agent', status: 'pending' },
    { name: 'Chairperson Agent', status: 'pending' }
  ];

  const completedCount = agents.filter(a => a.status === 'completed').length;
  const progress = (completedCount / agents.length) * 100;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center py-20 px-4">
      <div className="w-full max-w-2xl space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Analyzing Company</h1>
          <p className="text-slate-400">Our multi-agent system is currently processing data.</p>
          {error && <p className="text-amber-400 text-sm">{error}</p>}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Agent Cards */}
        <div className="space-y-4">
          {agents.map((agent, idx) => (
            <AgentCard key={idx} agent={agent} />
          ))}
        </div>

      </div>
    </div>
  );
}
