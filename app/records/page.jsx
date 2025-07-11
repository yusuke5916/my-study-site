"use client";

import { useEffect, useState } from 'react';

export default function RecordsPage() {
  const [records, setRecords] = useState({});

  // 成績データをlocalStorageから取得
  useEffect(() => {
    const saved = localStorage.getItem('shikaku-navi-records');
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  // 成績リセットの関数
  const resetRecords = () => {
    localStorage.removeItem('shikaku-navi-records');
    setRecords({}); // ローカルで表示されるデータもリセット
  };

  return (
    <div>
      <h2>成績一覧</h2>
      <ul>
        {Object.keys(records).map(key => (
          <li key={key}>
            {key} : {records[key] === 0 ? '不正解' : '正解'}
          </li>
        ))}
      </ul>

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
