"use client";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react"
import { useCartStore } from "../store/cartStore";
import { Toaster } from "react-hot-toast"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCartStore.persist.rehydrate() // ✅ loads localStorage on client
  }, [])

  return (
    <SessionProvider>
      {children}
       <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a1a1a",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0px",
            fontSize: "12px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#F59E0B", // your --primary gold color
              secondary: "#1a1a1a",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#1a1a1a",
            },
          },
        }}
      />
    </SessionProvider>
  );

}
