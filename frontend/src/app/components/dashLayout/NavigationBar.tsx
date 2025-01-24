// NavigationBar.tsx
//import UserAvatarWrapper from "@/app/components/UserAvatarWrapper"


import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react";

interface NavigationBarProps {
  className?: string;
}

export function NavigationBar({ className }: NavigationBarProps) {
  return (
    <Navbar className={className} maxWidth="full" isBordered>
      {/* Logo区域 */}
      <NavbarBrand>
        <p className="font-bold text-foreground">LOGO</p>
      </NavbarBrand>

      {/* 主导航菜单 */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* 产品菜单 */}
        <NavbarItem>
          <div className="group relative">
            <Button
              variant="light"
              className="p-0 bg-transparent text-foreground group-hover:text-primary"
              disableRipple
            >
              产品
            </Button>
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 min-w-[200px] bg-white shadow-lg rounded-lg mt-2 py-2">
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">产品类别1</div>
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">产品类别2</div>
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">产品类别3</div>
            </div>
          </div>
        </NavbarItem>

        {/* 解决方案菜单 */}
        <NavbarItem>
          <div className="group relative">
            <Button
              variant="light"
              className="p-0 bg-transparent text-foreground group-hover:text-primary"
              disableRipple
            >
              解决方案
            </Button>
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 min-w-[200px] bg-white shadow-lg rounded-lg mt-2 py-2">
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">企业方案</div>
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">个人方案</div>
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">定制服务</div>
            </div>
          </div>
        </NavbarItem>

        {/* 资源菜单 */}
        <NavbarItem>
          <div className="group relative">
            <Button
              variant="light"
              className="p-0 bg-transparent text-foreground group-hover:text-primary"
              disableRipple
            >
              资源
            </Button>
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 min-w-[200px] bg-white shadow-lg rounded-lg mt-2 py-2">
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">文档中心</div>
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">开发者社区</div>
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">API文档</div>
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">帮助中心</div>
            </div>
          </div>
        </NavbarItem>

        {/* 关于我们菜单 */}
        <NavbarItem>
          <div className="group relative">
            <Button
              variant="light"
              className="p-0 bg-transparent text-foreground group-hover:text-primary"
              disableRipple
            >
              关于我们
            </Button>
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 min-w-[200px] bg-white shadow-lg rounded-lg mt-2 py-2">
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">公司介绍</div>
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">团队成员</div>
              <div className="hover:bg-default-100 hover:text-primary px-4 py-2 cursor-pointer">联系我们</div>
            </div>
          </div>
        </NavbarItem>
      </NavbarContent>

      {/* 右侧操作区 */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button as={Link} color="primary" href="#" variant="flat">
            登录
          </Button>
        </NavbarItem>
        <NavbarItem>
          {/* 右侧用户按钮 */}
         {/*<UserAvatarWrapper />*/}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
