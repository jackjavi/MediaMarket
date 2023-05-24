import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Media Market",
  description: "Your One Stop shop for all digital downloads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black {inter.className} text-[whitesmoke]">
        {children}
      </body>
    </html>
  );
}
