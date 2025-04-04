import type { Metadata } from "next";
import { DataProvider } from "@/context/DataContext";
import { AuthProvider } from "@/context/AuthContext";
import Providers from "@/providers";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import  '@ant-design/v5-patch-for-react-19';
import Header from "@/app/components/header/header";
import {SearchProvider} from "@/context/SearchContext";
import Footer from "@/app/components/footer/footer";
import CartDetails from "./components/cartDetails/cartDetails";
import { useEffect, useState } from "react";
import RootComponent from "./client-component";

export const metadata: Metadata = {
  title: "Vegan Natu",
  description: "Loja virtual da Vegan Natu", 
  icons: {
      shortcut: "/favicon.ico",
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
          <link
              href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto:wght@400;700&display=swap"
              rel="stylesheet"
          />
      </head>
      <body>

        <Providers>  
          <AuthProvider>
            <DataProvider>
                <SearchProvider>
                    <RootComponent>
                        <CartDetails/>
                        <Header/>
                        {children}
                        <Footer/>
                    </RootComponent>
                </SearchProvider>
            </DataProvider>
          </AuthProvider>
        </Providers> 
      </body>
    </html>
  );
}
