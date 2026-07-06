import ProfileContent from "./ProfileContent"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "My Profile | Fashion Stylized",
  description:
    "Manage your Fashion Stylized account, update your profile, view your wishlist and orders.",
  openGraph: {
    title: "My Profile | Fashion Stylized",
    description:
      "Manage your Fashion Stylized account settings.",
    type: "website",
  },
}

export default function Page() {
  return <ProfileContent />
}