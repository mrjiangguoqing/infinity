'use client';
import { useState } from 'react';

import { Button, ButtonGroup } from "@nextui-org/button";

import { Accordion, AccordionItem, Textarea, } from '@nextui-org/react';
import { Menu, MenuItem, } from '@nextui-org/react';





import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

const Topbar = () => {
  return (
<Navbar isBordered>
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
    <NavbarItem>
      <Button as={Link} color="primary" href="#" variant="flat">
        登录
      </Button>
    </NavbarItem>
  </NavbarContent>
</Navbar>
  );
}


//边栏
import {
  ListboxItem,
  Listbox,
  ScrollShadow,
} from "@nextui-org/react";

// 类型定义
interface ModelItem {
  key: string;
  label: string;
}

interface ModelCategory {
  title: string;
  models: ModelItem[];
}

// 模型数据
const modelCategories: ModelCategory[] = [
  {
    title: "Chat Models",
    models: [
      { key: "gpt-4", label: "GPT-4" },
      { key: "gpt-3.5", label: "GPT-3.5" },
      { key: "llama-2", label: "LLaMA 2" },
      { key: "claude", label: "Claude" },
      { key: "palm", label: "PaLM" },
    ]
  },
  {
    title: "Audio Models",
    models: [
      { key: "whisper", label: "Whisper" },
      { key: "bark", label: "Bark" },
      { key: "musicgen", label: "MusicGen" },
      { key: "audiogen", label: "AudioGen" },
    ]
  },
  {
    title: "Vision Models",
    models: [
      { key: "dalle-3", label: "DALL·E 3" },
      { key: "stable-diffusion", label: "Stable Diffusion" },
      { key: "midjourney", label: "Midjourney" },
    ]
  },
  {
    title: "Versions",
    models: [
      { key: "v1", label: "Version 1.0" },
      { key: "v2", label: "Version 2.0" },
      { key: "v3", label: "Version 3.0" },
    ]
  }
];

// Sidebar 组件
const Sidebar = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["0"]));

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
  };

  return (
    <div className="w-64 h-screen bg-zinc-100 dark:bg-zinc-950">
      <ScrollShadow className="h-full">
        <Accordion
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          className="bg-transparent p-2"
        >
          {modelCategories.map((category, index) => (
            <AccordionItem
              key={index}
              aria-label={category.title}
              title={
                <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                  {category.title}
                </span>
              }
              className="group mb-2 rounded-lg bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-200"
            >
              <Listbox
                aria-label={`${category.title} list`}
                variant="flat"
                className="p-0 gap-1 bg-transparent"
              >
                {category.models.map((model) => (
                  <ListboxItem
                    key={model.key}
                    className="rounded-md data-[hover=true]:bg-zinc-100 dark:data-[hover=true]:bg-zinc-800"
                  >
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {model.label}
                    </span>
                  </ListboxItem>
                ))}
              </Listbox>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollShadow>
    </div>
  );
};


export default function App() {
  return (
    <div>
      <Topbar/>
      <Sidebar/>
    </div>
  );
}


