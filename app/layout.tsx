"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { useAuth } from "@/store/auth";
import LogoutButton from "@/components/ui/LogoutButton";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showLogout = mounted && pathname !== "/login" && user !== null;

  return (
    <html lang="en">
      <body>
        <Toaster 
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        {showLogout && <LogoutButton />}
        
        {children}
      </body>
    </html>
  );
}