import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { getRunReport } from '../services/api';

export default function Report() {
  const { runId } = useParams();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { status, data } = await getRunReport(runId);
        if (status === 202) {
          setError('Report is still processing. Please go back.');
        } else if (data.report) {
          setReportData(data);
        }
      } catch (err) {
        setError('Failed to load report. Run ID might be invalid.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [runId]);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading report...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <AlertTriangle className="w-12 h-12 text-red-500" />
        <p>{error}</p>
        <Link to="/" className="text-indigo-400 hover:underline">Return Home</Link>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500" />
        <p>Report is not available yet or an error occurred.</p>
        <Link to="/" className="text-indigo-400 hover:underline">Return Home</Link>
      </div>
    );
  }

  const { status, report } = reportData;
  const sections = report?.sections || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Search
          </Link>
          <div className="px-3 py-1 rounded-full bg-slate-800 text-sm text-slate-400 font-mono">
            Run ID: {runId}
          </div>
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-2">AlphaLens Recommendation</h1>
              <h2 className={`text-5xl font-extrabold ${
                report.recommendation === 'BUY' ? 'text-emerald-400' :
                report.recommendation === 'SELL' ? 'text-red-400' : 'text-amber-400'
              }`}>
                {report.recommendation}
              </h2>
            </div>
            <div className="text-left md:text-right">
              <div className="text-4xl font-bold text-white">{report.confidence}%</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider">Confidence Score</div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-medium text-white mb-2">Executive Summary</h3>
            <p className="text-slate-300 leading-relaxed text-lg">{report.reasoning}</p>
          </div>
        </motion.div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {Object.entries(sections).map(([key, value], idx) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800"
            >
              <h3 className="text-xl font-semibold text-indigo-300 mb-4 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{value}</p>
            </motion.div>
          ))}
        </div>

        {/* Citations */}
        {report.citations && report.citations.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Sources & Citations</h3>
            <ul className="flex flex-wrap gap-2">
              {report.citations.map((citation, idx) => (
                <li key={idx} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400">
                  {citation}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
