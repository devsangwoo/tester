import { useState } from "react";
import "./App.css";
import { part2Sets } from "./data";
import Part3 from "./Part3";

function speak(text: string) {
  if ("speechSynthesis" in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  }
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"part2" | "part3">("part2");
  const currentSet = part2Sets[currentIndex];

  const handleNext = () => {
    setCurrentIndex((i) => (i === part2Sets.length - 1 ? 0 : i + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((i) => (i === 0 ? part2Sets.length - 1 : i - 1));
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * part2Sets.length);
    setCurrentIndex(randomIndex);
  };

  return (
    <div className="ielts-app">
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "part2" ? "active" : ""}`}
          onClick={() => setActiveTab("part2")}
        >
          Part 2
        </button>
        <button
          className={`tab-btn ${activeTab === "part3" ? "active" : ""}`}
          onClick={() => setActiveTab("part3")}
        >
          Part 3
        </button>
      </div>

      {activeTab === "part2" ? (
        <div className="card-area">
          <div className="card">
            <div className="card-header">
              <div className="card-title">{currentSet.title}</div>
              <button className="random-btn" onClick={handleRandom}>
                🎲 랜덤
              </button>
            </div>
            <div className="part2-block">
              <div className="main-question">
                <span>{currentSet.main}</span>
                <button
                  className="tts-btn"
                  onClick={() => speak(currentSet.main)}
                  title="읽기"
                >
                  🔊
                </button>
              </div>
              <ul className="details">
                {currentSet.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="nav-btns">
              <button onClick={handlePrev}>&lt; 이전</button>
              <button onClick={handleNext}>다음 &gt;</button>
            </div>
          </div>
        </div>
      ) : (
        <Part3
          currentIndex={currentIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          onRandom={handleRandom}
        />
      )}
      <div className="footer">© IELTS 연습앱 (모바일 최적화)</div>
    </div>
  );
}
