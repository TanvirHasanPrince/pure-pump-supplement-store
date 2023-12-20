import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import AppProvider from './components/appContext'
import { Toaster } from "react-hot-toast";
import FooterSection from '../app/components/layout/Footer'

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
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <main className="max-w-7xl mx-auto border p-4 ">
          <AppProvider>
            <Toaster />
            <Header></Header>
            {children}
            <FooterSection></FooterSection>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
