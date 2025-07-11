import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      position: "fixed",
      top: "0.7rem", // ← さらに上に
      left: "2.0rem",
      zIndex: 1200 // サイドバーより上でもOK
    }}>
      <Link
        href="/"
        className="future-btn"
        aria-label="トップページへ"
      >
        資格ナビ
      </Link>
    </header>
  );
}
