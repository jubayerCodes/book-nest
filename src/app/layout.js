import { Inter, Lora } from "next/font/google";
import "./globals.css";
import '@smastrom/react-rating/style.css'
import Header from "@/Components/Shared/Header/Header";
import ReduxProvider from "@/Providers/ReduxProvider";
import { Toaster } from "@/Components/ui/sonner";
import AuthProvider from "@/Providers/AuthProvider";

const lora = Lora({
  variable: "--font-primary",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-secondary",
  subsets: ["latin"],
})

export const metadata = {
  title: "BookNest - Books for Eyes and Ears.",
  description: "Where Books Speak and Stories Live.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${inter.variable} antialiased`}
      >
        <ReduxProvider>
          <AuthProvider>
            <Header />
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
