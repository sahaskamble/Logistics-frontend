import { Outfit } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/utils/Chatbot";
import { Toaster } from "sonner";
import { AuthContextProvider } from "@/contexts/AuthContext";
import TwakDotTo from "./components/TwakDotTo";
const font = Outfit({ subsets: ["latin"], });

export const metadata = {
  title: "Logistics",
  description: "Logistics Software",
};

export default function MainRootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        <ChatBot />
        {/* <TwakDotTo /> */}
        <Toaster richColors={true} closeButton={true} expand={true} position="top-right" />
      </body>
    </html>
  );
}
