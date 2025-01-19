// components/UserAvatar.tsx
import { auth } from "@/auth/auth"
import { Avatar } from "@nextui-org/react"

export default async function UserAvatar() {
  const session = await auth()

  if (!session?.user) {
    return (
      <Avatar
        isBordered
        color="default"
        size="md"
        src="https://i.pravatar.cc/150?u=guest"
        fallback={
          <span className="text-default-500">访客</span>
        }
      />
    )
  }

  return (
    <Avatar
      isBordered
      color="primary"
      size="md"
      src={session.user.image || undefined}
      name={session.user.name || "用户"}
      fallback={
        <span className="text-default-500">
          {session.user.name?.[0]?.toUpperCase() || "U"}
        </span>
      }
    />
  )
}


