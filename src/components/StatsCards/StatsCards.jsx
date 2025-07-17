import { useEffect, useState } from 'react';
import './StatsCards.css';
import axios from 'axios';

const formatNumber = (num) => {
  if (num >= 1_000_000_000)
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B+';
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M+';
  if (num >= 1_000)
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K+';
  return Math.floor(num) + '+';
};

const StatsCards = () => {
  const [downloads, setDownloads] = useState(0);

  useEffect(() => {
    axios.get('https://ai-resume-builder-backend-jw1g.onrender.com/api/data/get-pdf-downloads')
      .then((res) => setDownloads(res.data.count))
      .catch((err) => {
        console.error('Error fetching download count:', err.message);
        setDownloads(0);
      });
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stat-card">
          <h3>{formatNumber(downloads)}</h3>
          <p><i className="fas fa-download stat-icon"></i> Resumes Downloaded</p>
        </div>
        <div className="stat-card">
          <h3>12+</h3>
          <p><i className="fas fa-file-alt stat-icon"></i> Resume Templates</p>
        </div>
        <div className="stat-card">
          <h3>24+</h3>
          <p><i className="fas fa-palette stat-icon"></i> Template Themes</p>
        </div>
      </div>
    </section>
  );
};

export default StatsCards;
