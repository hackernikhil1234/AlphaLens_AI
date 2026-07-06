import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Report from './pages/Report';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis/:runId" element={<Analysis />} />
        <Route path="/report/:runId" element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
