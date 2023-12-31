import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import Navbar from "./components/navbar/Navbar";
import ToasterProvider from "./providers/ToasterProvider";
import Provider from "@/app/providers/ClientProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBnb",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  // console.log("session",session)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar />
          <div className="pb-20 pt-28">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
