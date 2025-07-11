'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const GENRE_LABELS = {
  "1hosou": "1級舗装",
  "2hosou": "2級舗装",
  "1doboku": "1級土木",
  "2doboku": "2級土木",
  "1kenchiku": "1級建築",
  "2kenchiku": "2級建築",
  "shindan": "舗装診断士",
};
const TYPE_LABELS = {
  generalA: "1次試験A",
  generalB: "1次試験B",
  general: "一般試験",
  application: "2次試験",
  secondary: "記述式試験",
};

export default function QuestionPage({ params }) {
  const { genre, year, type } = params || {};
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('');
  const [records, setRecords] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [allCorrect, setAllCorrect] = useState(0);

  const STORAGE_KEY = "shikaku-navi-records-v2";
  const keyPrefix = `${genre}_${year}_${type}`;

  // 日本語変換
  const genreLabel = GENRE_LABELS[genre] || genre;
  const typeLabel = TYPE_LABELS[type] || type;

  // 過去の成績ロード
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  // 問題データロード＋途中再開
  useEffect(() => {
    if (!genre || !year || !type) return;
    const fetchData = async () => {
      const url = `/questions/${genre}/${year}/${type}.json`;
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data || []);
      setSelected(null);
      setFeedback('');
      setFeedbackColor('');
      setInputValue('');
      if (data && data.length) {
        for (let i = 0; i < data.length; ++i) {
          if (!(keyPrefix + '_' + i in records)) {
            setQIdx(i);
            return;
          }
        }
        setQIdx(0);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [genre, year, type]);

  // 成績記録＆全問正解集計
  useEffect(() => {
    if (selected === null) return;
    const qKey = keyPrefix + '_' + qIdx;
    const newRecords = { ...records, [qKey]: selected };
    setRecords(newRecords);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
    // 全問正解数カウント
    if (questions.length) {
      let correct = 0;
      for (let i = 0; i < questions.length; ++i) {
        const ans =
          typeof questions[i].answer === "number"
            ? questions[i].choices?.[questions[i].answer]
            : questions[i].answer;
        const user = newRecords[keyPrefix + '_' + i];
        if (user !== undefined) {
          if (
            (questions[i].choices
              ? questions[i].choices[user] === ans
              : (user?.trim?.() ?? '') === ans?.trim?.())
          ) correct++;
        }
      }
      setAllCorrect(correct);
    }
    // eslint-disable-next-line
  }, [selected, questions]);

  // 成績リセット
  const resetRecord = () => {
    const newRecords = { ...records };
    for (let i = 0; i < questions.length; ++i) {
      delete newRecords[keyPrefix + '_' + i];
    }
    setRecords(newRecords);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
    setQIdx(0);
    setSelected(null);
    setFeedback('');
    setFeedbackColor('');
    setInputValue('');
    setAllCorrect(0);
  };

  // 途中再開
  const resume = () => {
    for (let i = 0; i < questions.length; ++i) {
      if (!(keyPrefix + '_' + i in records)) {
        setQIdx(i);
        setSelected(null);
        setFeedback('');
        setFeedbackColor('');
        setInputValue('');
        return;
      }
    }
    setQIdx(0);
  };

  // ローディング時
  if (!questions.length) {
    return (
      <div style={{ maxWidth: 600, margin: 'auto', padding: 40, textAlign: 'center' }}>
        <div style={{ color: feedbackColor || "#555" }}>{feedback || "読み込み中…"}</div>
        <div style={{ marginTop: 30 }}>
          <Link href={`/category/${genre}`} passHref>
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#b721ff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "16px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              年度選択に戻る
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // 問題取得
  const q = questions[qIdx];
  const isInput = !q.choices;

  // 残り未回答数
  const total = questions.length;
  const answeredCount = Object.keys(records).filter(key => key.startsWith(keyPrefix)).length;
  const remaining = total - answeredCount;

  // 選択式
  const handleSelect = (i) => {
    setSelected(i);
    let correct =
      typeof q.answer === "number"
        ? i === q.answer
        : q.choices[i] === q.answer;
    setFeedback(correct ? "正解！" : "不正解");
    setFeedbackColor(correct ? "green" : "red");
  };

  // 記述式
  const handleInput = () => {
    setSelected(inputValue);
    let correct = inputValue.trim() === (q.answer?.trim?.() ?? "");
    setFeedback(correct ? "正解！" : "不正解");
    setFeedbackColor(correct ? "green" : "red");
  };

  // ナビゲーション
  const prevQ = () => {
    if (qIdx > 0) {
      setQIdx(qIdx - 1);
      setSelected(null);
      setFeedback('');
      setFeedbackColor('');
      setInputValue('');
    }
  };
  const nextQ = () => {
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelected(null);
      setFeedback('');
      setFeedbackColor('');
      setInputValue('');
    }
  };

  // 最終問題かつ解答済みかどうか
  const isLastQuestion = qIdx === questions.length - 1 && selected !== null;

  // 正解率計算
  const percent = questions.length ? Math.round((allCorrect / questions.length) * 100) : 0;

  // ---- ここからJSX ----
  return (
    <div style={{ maxWidth: 650, margin: 'auto', padding: 24, textAlign: 'center' }}>
      <h3 style={{ marginBottom: 12 }}>
        {genreLabel} {year}年度 {typeLabel} 第{qIdx + 1}問
      </h3>
      <div style={{ marginBottom: 20, fontWeight: "bold" }}>{q.question}</div>

      {/* ▼ 進捗ゲージ */}
      <div style={{
        margin: "32px 0 24px",
        width: "90vw",
        maxWidth: 600,
        textAlign: "center"
      }}>
        <div style={{
          fontWeight: 700, fontSize: "1.07em", marginBottom: 8,
          letterSpacing: ".05em", color: "#4a7cff"
        }}>
          正解数
        </div>
        <div style={{
          position: "relative",
          height: "32px",
          background: "#f2f4f8",
          borderRadius: "1.5em",
          boxShadow: "0 2px 10px #88c5ff33",
          overflow: "hidden",
          marginBottom: 6,
        }}>
          <div style={{
            height: "100%",
            width: `${(allCorrect / questions.length) * 100}%`,
            background: "linear-gradient(90deg, #21d4fd 0%, #b721ff 100%)",
            borderRadius: "1.5em",
            transition: "width .5s cubic-bezier(.6,1.8,.2,1)"
          }} />
          <span style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%,-50%)",
            color: "#223", fontWeight: 900, fontSize: "1.2em", letterSpacing: ".08em"
          }}>
            {allCorrect} / {questions.length}
          </span>
        </div>
        {/* ▼ 残りの問題数を明確に表示 */}
        <span style={{ fontSize: "0.95em", color: "#48d7b7", fontWeight: 600 }}>
          {allCorrect === questions.length
            ? "全問クリア！おめでとう！🎉"
            : `あと${remaining}問！（未回答）`}
        </span>
      </div>

      {/* ▼ 正解率（ラストのみ表示） */}
      {isLastQuestion && (
        <div style={{
          margin: "32px 0 18px",
          padding: "22px 16px 14px 16px",
          borderRadius: "1.5em",
          background: percent >= 60
            ? "linear-gradient(90deg,#65ffbc 0%,#7ed9ff 100%)"
            : "linear-gradient(90deg,#fff3be 0%,#ffbbc7 100%)",
          boxShadow: "0 2px 20px #0ff6  ",
          color: percent >= 60 ? "#005344" : "#a13224",
          fontWeight: 900,
          fontSize: "1.35em",
          letterSpacing: ".09em"
        }}>
          正解率 {percent}%
          <div style={{
            marginTop: 8,
            fontSize: "1em",
            fontWeight: 700,
            color: percent >= 60 ? "#00b97e" : "#e60043",
            textShadow: percent < 60 ? "0 2px 14px #fff7" : "none"
          }}>
            {percent >= 60
              ? "おめでとう！合格水準に達しています 🎉"
              : "あと少し！ここまで来たあなたならきっと伸びます、次に期待！💪"}
          </div>
        </div>
      )}

      {/* 選択肢式 or 記述式 */}
      {!isInput ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {q.choices.map((choice, i) => {
            let bgColor = "#f2f4f7";
            if (selected !== null) {
              if (
                (typeof q.answer === "number" && i === q.answer) ||
                (typeof q.answer !== "number" && choice === q.answer)
              ) {
                bgColor = "#c4f0c5";
              } else if (i === selected) {
                bgColor = "#ffd2d2";
              }
            }
            return (
              <li key={i} style={{ margin: "10px 0" }}>
                <button
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: bgColor,
                    color: "#222",
                    border: "1px solid #ddd",
                    cursor: selected !== null ? "default" : "pointer",
                    fontSize: "16px",
                  }}
                >
                  {choice}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <input
            type="text"
            value={selected !== null ? selected : inputValue}
            onChange={e => setInputValue(e.target.value)}
            disabled={selected !== null}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #aaa",
              fontSize: "16px",
              marginBottom: "10px"
            }}
            placeholder="ここに答えを入力"
          />
          <button
            onClick={handleInput}
            disabled={selected !== null || !inputValue.trim()}
            style={{
              padding: "10px 24px",
              backgroundColor: "#21d4fd",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              marginLeft: "10px",
              cursor: selected !== null || !inputValue.trim() ? "not-allowed" : "pointer",
            }}
          >
            回答する
          </button>
        </div>
      )}

      {/* フィードバック */}
      {selected !== null && (
        <>
          <div style={{ margin: "16px 0 0", color: feedbackColor, fontWeight: "bold" }}>{feedback}</div>
          <div style={{
            margin: "12px 0",
            background: "#eaf6ff",
            padding: "10px",
            borderRadius: "8px",
            color: "#2186eb"
          }}>
            <strong>解説：</strong>{q.explanation}
          </div>
        </>
      )}

      {/* ナビゲーション */}
      <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between" }}>
        <button onClick={prevQ} disabled={qIdx === 0}
          style={{
            padding: "10px 20px", backgroundColor: "#21d4fd", color: "#fff", border: "none",
            borderRadius: "8px", fontWeight: 700, cursor: qIdx === 0 ? "not-allowed" : "pointer"
          }}>前の問題</button>
        <button onClick={nextQ} disabled={qIdx === questions.length - 1}
          style={{
            padding: "10px 20px", backgroundColor: "#21d4fd", color: "#fff", border: "none",
            borderRadius: "8px", fontWeight: 700, cursor: qIdx === questions.length - 1 ? "not-allowed" : "pointer"
          }}>次の問題</button>
      </div>

      {/* 成績リセット・途中再開 */}
      <div style={{ margin: "28px 0 0", display: "flex", gap: 16, justifyContent: "center" }}>
        <button
          onClick={resetRecord}
          style={{
            padding: "10px 20px", background: "#ff8bc2", color: "#fff", border: "none",
            borderRadius: "8px", fontWeight: 700, cursor: "pointer"
          }}
        >成績リセット</button>
        <button
          onClick={resume}
          style={{
            padding: "10px 20px", background: "#66e0c1", color: "#222", border: "none",
            borderRadius: "8px", fontWeight: 700, cursor: "pointer"
          }}
        >途中から再開</button>
      </div>

      {/* 年度に戻る */}
      <div style={{ marginTop: "30px" }}>
        <Link href={`/category/${genre}`} passHref>
          <button
            style={{
              padding: "12px 24px",
              backgroundColor: "#b721ff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            年度選択に戻る
          </button>
        </Link>
      </div>
    </div>
  );
}
