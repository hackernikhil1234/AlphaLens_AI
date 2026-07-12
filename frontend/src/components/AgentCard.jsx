import { CheckCircle2, CircleDashed, Loader2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AgentCard({ agent }) {
  const getStatusIcon = () => {
    switch (agent.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'running':
        return <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <CircleDashed className="w-5 h-5 text-slate-600" />;
    }
  };

  const isActive = agent.status === 'running' || agent.status === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
        isActive 
          ? 'bg-slate-800/80 border-slate-700 shadow-lg' 
          : 'bg-slate-900/50 border-slate-800 opacity-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <h3 className={`font-medium ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
            {agent.name}
          </h3>
        </div>
        <div className="text-sm font-mono text-slate-500">
          {agent.status.toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
}
