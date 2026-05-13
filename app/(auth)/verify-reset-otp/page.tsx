// app/(auth)/reset-password/page.tsx
import { Suspense } from "react"
import VerifyResetOtp from "./VerifyResetOtp" // ✅ move your component to separate file

export default function VerifyResetOtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    }>
      <VerifyResetOtp />
    </Suspense>
  )
}