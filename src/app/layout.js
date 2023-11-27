import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import AppProvider from './components/appContext'

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const metadata = {
  title: "Pure Pump",
  description: "Your Peak Performance with Premium Fitness Fuel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-7xl mx-auto border p-4 ">
          <AppProvider>
            <Header></Header>
            {children}
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
