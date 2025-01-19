// components/UserAvatarDropdown.tsx
"use client"

import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User
} from "@nextui-org/react"
import { signOut } from "next-auth/react"

interface UserAvatarDropdownProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function UserAvatarDropdown({ user }: UserAvatarDropdownProps) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: user.image || undefined,
            color: "primary",
            size: "sm",
          }}
          className="transition-transform"
          description={user.email}
          name={user.name || "用户"}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="用户操作">
        <DropdownItem key="profile" href="/profile">
          个人资料
        </DropdownItem>
        <DropdownItem key="settings" href="/settings">
          设置
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
