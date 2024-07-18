import { Inconsolata } from "next/font/google";
import "./globals.css";
import ClientComponent from './ClientComponent'; // クライアントコンポーネントをインポート

const fnt = Inconsolata({ subsets: ["latin"] });

export const metadata = {
  title: "Reading Recorder",
  description: "自分が読んだ書籍の記録を残すためのアプリ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={fnt.className}>
        <h1 className="text-4xl text-indigo-800 font-bold my-2">
          Reading Recorder
        </h1>
        <ClientComponent>{children}</ClientComponent> {/* クライアントコンポーネントを使用 */}
      </body>
    </html>
  );
}