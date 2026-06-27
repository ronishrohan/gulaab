import type { Metadata } from "next";
import localFont from "next/font/local";
import { Khand } from "next/font/google";
import "./globals.css";

const khand = Khand({
  weight: ["600", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-khand",
  display: "swap",
});

const openRunde = localFont({
  src: [
    { path: "../public/fonts/OpenRunde-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/OpenRunde-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/OpenRunde-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/OpenRunde-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-open-runde",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sky UI",
  description: "A light-first React component library with tactile motion and subtle sound.",
};

const themeScript = `
+(function() {
+  try {
+    var stored = localStorage.getItem('sky-theme');
+    if (stored === 'dark') document.documentElement.classList.add('dark');
+  } catch(e) {}
+})();
+`.replace(/^\+/gm, "");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${openRunde.variable} ${khand.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
