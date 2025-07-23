import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panadería Delicias - Horneado con Amor",
  description: "Los mejores panes y pasteles frescos del día. Panadería artesanal con ingredientes de primera calidad.",
  keywords: ["panadería", "pan", "pasteles", "artesanal", "horneado", "delicias"],
  authors: [{ name: "Panadería Delicias" }],
  openGraph: {
    title: "Panadería Delicias - Horneado con Amor",
    description: "Los mejores panes y pasteles frescos del día. Panadería artesanal con ingredientes de primera calidad.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panadería Delicias - Horneado con Amor",
    description: "Los mejores panes y pasteles frescos del día.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
