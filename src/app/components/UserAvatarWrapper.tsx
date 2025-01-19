// components/UserAvatarWrapper.tsx
import { auth } from "@/auth/auth"
import { Spinner } from "@nextui-org/react"
import { Suspense } from "react"
import UserAvatarDropdown from "./UserAvatarDropdown"

function LoadingAvatar() {
  return <Spinner size="sm" />
}

export default async function UserAvatarWrapper() {
  const session = await auth()

  return (
    <Suspense fallback={<LoadingAvatar />}>
      {session?.user ? (
        <UserAvatarDropdown user={session.user} />
      ) : (
        <UserAvatarDropdown 
          user={{
            name: "访客",
            email: "",
            image: "https://i.pravatar.cc/150?u=guest"
          }}
        />
      )}
    </Suspense>
  )
}
