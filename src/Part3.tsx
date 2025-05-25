import { part3Sets } from "./data-p3";

function speak(text: string) {
  if ("speechSynthesis" in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  }
}

interface Part3Props {
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onRandom: () => void;
}

export default function Part3({
  currentIndex,
  onNext,
  onPrev,
  onRandom,
}: Part3Props) {
  const currentSet = part3Sets[currentIndex];

  return (
    <div className="ielts-app">
      <div className="card-area">
        <div className="card">
          <div className="card-header">
            <div className="card-title">{currentSet.title}</div>
            <button className="random-btn" onClick={onRandom}>
              🎲 랜덤
            </button>
          </div>
          <div className="part3-block">
            <ul className="details">
              {currentSet.details.map((d, i) => (
                <li key={i}>
                  <span>{d}</span>
                  <button
                    className="tts-btn"
                    onClick={() => speak(d)}
                    title="읽기"
                  >
                    🔊
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-btns">
            <button onClick={onPrev}>&lt; 이전</button>
            <button onClick={onNext}>다음 &gt;</button>
          </div>
        </div>
      </div>
      <div className="footer">© IELTS 연습앱 (모바일 최적화)</div>
    </div>
  );
}
