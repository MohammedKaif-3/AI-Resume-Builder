import "./Scorebox.css";

const ScoreBox = ({ score, feedback = [], onClose, isVisible }) => {
  return (
    <div className={`score-box-live ${isVisible ? 'visible' : ''}`}>
      <h3 className="subheading" style={{ borderBottom: '1px solid #ddd' }}>Your Score   <button className="score-close" onClick={onClose}>×</button></h3>
      <div className="score-circle">{score}</div>
      <ul className="score-feedback">
        {(feedback || []).slice(0, 4).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreBox;
