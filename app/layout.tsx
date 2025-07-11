import './globals.css'; // 必ずglobals.cssで .future-btn などを定義
import Header from './Header';
import Sidebar from './Sidebar';  // ← これを追加！
import { Montserrat } from 'next/font/google';

// Google Fonts Montserrat（ウェイト900で近未来感を強調）
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
});

export const metadata = {
  title: '資格ナビ',
  description: '近未来グラデヘッダー搭載！資格試験の勉強を快適にサポートするサイトです。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={montserrat.className}>
        {/* グラデーション共通ヘッダー */}
        <Header />
        {/* サイドバー */}
        <Sidebar />
        {/* ヘッダーがfixedなので、本文が隠れないように余白をプラス */}
        <main style={{ paddingTop: "5.5rem", marginLeft: "220px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
