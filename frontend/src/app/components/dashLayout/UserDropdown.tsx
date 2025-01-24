'use client';

import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    User
  } from "@nextui-org/react";
  import { 
    FaRegFaceSmile, 
    FaUser, 
    FaGear, 
    FaRightFromBracket,
    FaMoon,
    FaSun 
  } from "react-icons/fa6";
  import { useRouter } from "next/navigation";
  
  const UserDropdown = () => {
    const router = useRouter();
  
    const handleAction = (key: string) => {
      switch (key) {
        case "profile":
          router.push("/profile");
          break;
        case "settings":
          router.push("/settings");
          break;
        case "status":
          // 处理状态设置
          break;
        case "logout":
          // 处理登出逻辑
          break;
      }
    };
  
    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://your-avatar-url.jpg"
            }}
            className="transition-transform"
            description="@username"
            name="User Name"
          />
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="User menu actions" 
          onAction={(key) => handleAction(key as string)}
          className="w-60"
          variant="flat"
        >
          <DropdownItem
            key="status"
            startContent={<FaRegFaceSmile className="text-xl text-default-500" />}
            className="text-default-500 data-[hover=true]:text-foreground"
          >
            Set status
          </DropdownItem>
          
          <DropdownItem
            key="profile"
            startContent={<FaUser className="text-xl text-default-500" />}
            className="text-default-500 data-[hover=true]:text-foreground"
          >
            Your profile
          </DropdownItem>
          
          <DropdownItem
            key="settings"
            startContent={<FaGear className="text-xl text-default-500" />}
            className="text-default-500 data-[hover=true]:text-foreground"
          >
            Settings
          </DropdownItem>
  
          <DropdownItem
            key="theme"
            startContent={<FaMoon className="text-xl text-default-500" />}
            className="text-default-500 data-[hover=true]:text-foreground"
          >
            Theme
          </DropdownItem>
  
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            startContent={<FaRightFromBracket className="text-xl" />}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };
  
  export default UserDropdown;
  