import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | Fashion Stylized",
  description: "Sign in or create your account",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}