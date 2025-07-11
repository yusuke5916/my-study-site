'use client';

import Link from 'next/link';

export default function CategoryPage({ params }: { params: { genre: string } }) {
  const { genre } = params;

  // 各ジャンルの選択肢
  const categories: { [key: string]: string } = {
    "1hosou": "1級舗装過去問",
    "2hosou": "2級舗装過去問",
    "1doboku": "1級土木過去問",
    "2doboku": "2級土木過去問",
    "1kenchiku": "1級建築過去問",
    "2kenchiku": "2級建築過去問",
    "shindan": "舗装診断士過去問",
  };

  const examTypes = ["general", "application"];

  const yearsByGenre: { [key: string]: string[] } = {
    "1hosou": ["2025", "2024", "2023"],
    "1doboku": ["2024", "2023", "2022"],
    "1kenchiku": ["2024", "2023", "2022"],
    "2hosou": ["2025", "2024", "2023"],
    "2doboku": ["2024", "2023", "2022"],
    "2kenchiku": ["2024", "2023", "2022"],
    "shindan": ["2024", "2023", "2022"],
  };

  const years = yearsByGenre[genre] || [];
  const genreName = categories[genre] || genre;

  if (!years.length) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: 60 }}>
        無効なジャンルです。トップに戻って再度選択してください。
        <div style={{ marginTop: 30 }}>
          <Link href="/"><button>トップに戻る</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "calc(100vh - 6rem)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(120deg, #0a0f29 0%, #283e51 100%)",
      color: "#f5f8fc",
    }}>
      {/* タイトル */}
      <div style={{ marginBottom: "2.4rem", textAlign: "center" }}>
        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: 900,
          letterSpacing: "0.08em",
          color: "transparent",
          background: "linear-gradient(90deg, #21d4fd 0%, #b721ff 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}>
          {genreName} の年度を選んでください
        </h1>
        <p style={{
          fontSize: "1.3rem",
          fontWeight: 500,
          marginTop: "0.7rem",
          marginBottom: "0.1rem",
          color: "#c9e6ff",
        }}>
          選択した年度と試験形式を選んで学習を始めましょう。
        </p>
      </div>

      {/* 年度と試験形式の選択 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: "1.4rem",
        width: "90vw",
        maxWidth: "740px",
        padding: "0 20px",
        marginBottom: "20px"
      }}>
        {years.map(year => (
          <div key={year} style={{ textAlign: "center" }}>
            <h2>{year}年度</h2>
            {examTypes.map(exam => (
              <Link
                key={exam}
                href={`/category/${genre}/${year}/${exam}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "70px",
                  borderRadius: "1rem",
                  background: "linear-gradient(100deg, #21d4fdcc 0%, #b721ffbb 100%)",
                  boxShadow: "0 4px 22px #21d4fd22",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "box-shadow 0.18s, transform 0.14s",
                  userSelect: "none",
                  border: "none",
                  marginBottom: "10px"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.boxShadow = "0 8px 34px #b721ff77";
                  e.currentTarget.style.transform = "scale(1.035)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.boxShadow = "0 4px 22px #21d4fd22";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {exam === "general" ? "一般試験" : "応用試験"}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* フッター文言 */}
      <div style={{
        marginTop: "2.5rem",
        fontSize: "1.02rem",
        color: "#a0b6ca",
        textAlign: "center",
      }}>
        <p>「資格ナビ」は、すべての資格試験の過去問学習をサポートします。</p>
      </div>
    </div>
  );
}
