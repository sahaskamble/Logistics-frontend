import { Outfit } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/utils/Chatbot";
import { Toaster } from "sonner";
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
        {children}
        <ChatBot />
        <Toaster richColors={true} closeButton={true} expand={true} position="top-right" />
      </body>
    </html>
  );
}
