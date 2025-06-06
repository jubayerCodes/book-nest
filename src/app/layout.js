import { Geist, Geist_Mono, Inter, Lora } from "next/font/google";
import "./globals.css";
import '@smastrom/react-rating/style.css'

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
        {children}
      </body>
    </html>
  );
}
