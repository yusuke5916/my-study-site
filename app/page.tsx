'use client';

import Link from "next/link";
// import styles from './page.module.css'; // 今回は不要

const categories = [
  { id: "1hosou", name: "1級舗装施工管理技士" },
  { id: "2hosou", name: "2級舗装施工管理技士" },
  { id: "1doboku", name: "1級土木施工管理技士" },
  { id: "2doboku", name: "2級土木施工管理技士" },
  { id: "1kenchiku", name: "1級建築施工管理技士" },
  { id: "2kenchiku", name: "2級建築施工管理技士" },
  { id: "shindan", name: "舗装診断士" },
];

export default function Home() {
  return (
    <div style={{
      minHeight: "calc(100vh - 6rem)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(120deg, #0a0f29 0%, #283e51 100%)",
      color: "#f5f8fc"
    }}>
      {/* サイトタイトル＋キャッチ */}
      <div style={{
        marginBottom: "2.4rem",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: 900,
          letterSpacing: "0.08em",
          color: "transparent",
          background: "linear-gradient(90deg, #21d4fd 0%, #b721ff 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text"
        }}>
          資格ジャンル一覧
        </h1>
        <p style={{
          fontSize: "1.3rem",
          fontWeight: 500,
          marginTop: "0.7rem",
          marginBottom: "0.1rem",
          color: "#c9e6ff"
        }}>
          技術者の資格を、ここから学べる。
        </p>
      </div>
      {/* 資格ジャンル一覧 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",   // ←ここを4項目固定に！
        gap: "1.4rem",
        width: "92vw",
        maxWidth: "1100px",  // 4項目が綺麗に並ぶように拡張
        margin: "0 auto"
      }}>
        {categories.map(cat => (
          <Link
            key={cat.id}
            href={`/category/${cat.id}`}
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
              marginBottom: "10px",
              cursor: "pointer"
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
            {cat.name}
          </Link>
        ))}
      </div>
      {/* サイトの説明やお知らせなど追加したい場合ここに！ */}
      <div style={{
        marginTop: "2.5rem",
        fontSize: "1.02rem",
        color: "#a0b6ca"
      }}>
        <p>「資格ナビ」は各種資格の過去問学習をスマホでも快適にサポートします。</p>
      </div>
    </div>
  );
}
