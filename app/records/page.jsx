"use client";

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'shikaku-navi-records';

export default function RecordsPage() {
  const [records, setRecords] = useState({});

  // 成績データを localStorage から取得
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  // 成績リセット関数
  const resetRecords = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecords({});
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>成績一覧</h2>

      {Object.keys(records).length === 0 ? (
        <p>記録はまだありません。</p>
      ) : (
        <ul>
          {Object.keys(records).map(key => (
            <li key={key}>
              {key} : {records[key] === 0 ? '不正解' : '正解'}
            </li>
          ))}
        </ul>
      )}

      {/* 成績リセットボタン */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={resetRecords}
          style={{
            padding: "10px 20px",
            backgroundColor: "#b721ff",
            color: "#fff",
            border: "none",
            borderRadius: "0.7rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "0.2s"
          }}
        >
          成績をリセット
        </button>
      </div>
    </div>
  );
}
