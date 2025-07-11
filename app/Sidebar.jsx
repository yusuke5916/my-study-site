// app/Sidebar.jsx
'use client';

import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "1hosou", name: "1級舗装施工管理技士" },
  { id: "2hosou", name: "2級舗装施工管理技士" },
  { id: "1doboku", name: "1級土木施工管理技士" },
  { id: "2doboku", name: "2級土木施工管理技士" },
  { id: "1kenchiku", name: "1級建築施工管理技士" },
  { id: "2kenchiku", name: "2級建築施工管理技士" },
  { id: "shindan", name: "舗装診断士" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <aside
      style={{
        position: "fixed",
        top: "4.7rem",
        left: 0,
        height: "calc(100vh - 4.5rem)",
        width: open ? "235px" : "56px",
        background: "rgba(34,36,50,0.98)",
        boxShadow: "4px 0 18px #21d4fd12",
        borderTopRightRadius: "1.2rem",
        borderBottomRightRadius: "1.2rem",
        zIndex: 999,
        transition: "width 0.35s cubic-bezier(.77,0,.18,1.01), transform 0.35s cubic-bezier(.77,0,.18,1.01), opacity 0.3s",
        transform: open ? "translateX(0)" : "translateX(-65%)",
        opacity: open ? 1 : 0.72,
        overflow: "hidden"
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          margin: "1.1rem 0.9rem 1.5rem 0.9rem",
          padding: "9px",
          background: "linear-gradient(90deg, #21d4fd 0%, #b721ff 100%)",
          border: "none",
          borderRadius: "0.7rem",
          color: "#fff",
          fontWeight: 900,
          fontSize: "1.4rem",
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 2px 16px #21d4fd33, 0 0 0 2px #b721ff66",
          transition: "box-shadow 0.18s, transform 0.38s cubic-bezier(.64,.01,.07,1.13)"
        }}
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
      >
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.45s cubic-bezier(.64,.01,.07,1.13)",
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28">
            <rect
              x="5" y={open ? "8" : "13"} width="18" height="3" rx="1.5"
              fill="#fff"
              style={{
                transition: "y 0.33s cubic-bezier(.87,-0.41,.19,1.44), transform 0.38s",
                transform: open ? "rotate(0)" : "rotate(45deg) translate(6px, 6px)"
              }}
            />
            <rect
              x="5" y="13" width="18" height="3" rx="1.5"
              fill="#fff"
              style={{
                opacity: open ? 1 : 0,
                transition: "opacity 0.24s"
              }}
            />
            <rect
              x="5" y={open ? "18" : "13"} width="18" height="3" rx="1.5"
              fill="#fff"
              style={{
                transition: "y 0.33s cubic-bezier(.87,-0.41,.19,1.44), transform 0.38s",
                transform: open ? "rotate(0)" : "rotate(-45deg) translate(6px, -6px)"
              }}
            />
          </svg>
        </span>
      </button>
      <nav>
        <ul style={{
          listStyle: "none",
          padding: open ? "0 0.5rem" : 0,
          margin: 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.18s"
        }}>
          {categories.map(cat => (
            <li key={cat.id} style={{ margin: "1.1rem 0" }}>
              <Link href={`/category/${cat.id}`}
                style={{
                  display: "block",
                  padding: "0.9rem 1rem",
                  borderRadius: "0.7rem",
                  background: "linear-gradient(90deg, #21d4fd19, #b721ff09)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.08rem",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  boxShadow: "0 1px 5px #21d4fd19",
                  transition: "background 0.18s, color 0.18s",
                  whiteSpace: "nowrap",           // ← 1行表示（省略可）
                  overflow: "hidden",             // ← 1行表示（省略可）
                  textOverflow: "ellipsis",       // ← 1行表示（省略可）
                }}
                tabIndex={open ? 0 : -1}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
