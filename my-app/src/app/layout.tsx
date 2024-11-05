import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import dynamic from "next/dynamic";
import Script from "next/script";
import Link from "next/link";
const Header = dynamic(() => import("./component/headerComponent/Header"), {
  ssr: false,
});
export const metadata: Metadata = {
  applicationName: "Web Truyện",
  keywords: ["web truyện", "truyện ngôn tình", "kiếm hiệp"],
  authors: [{ name: "helloAz" }],
  creator: "HelloAz",
  publisher: "helloAz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    template: "%s | HelloAz",
    default: "web truyện của tôi", // a default is required when creating a template
  },
  description:
    "truyện của tôi - Đọc truyện online, đọc truyện chữ, truyện hay. Website luôn cập nhật những bộ truyện mới thuộc các thể loại đặc sắc như truyện tiên hiệp, truyện kiếm hiệp, hay truyện ngôn tình một cách nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính bảng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <StoreProvider>{children}</StoreProvider>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/all.min.js" />
      </body>
    </html>
  );
}
