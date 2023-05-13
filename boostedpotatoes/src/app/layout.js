import "./globals.css";
import { Inter } from "next/font/google";
import Layout from "./components/layout";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BoostedPotatoes",
  description: "BOOST YOUR LITTLE POTATOE BRAIN",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
