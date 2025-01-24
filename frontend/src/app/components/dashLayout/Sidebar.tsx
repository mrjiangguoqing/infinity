import { useState } from "react";
import Link from "next/link"; // 导入 Link 组件
import {
  ListboxItem,
  Listbox,
  ScrollShadow,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";

// 类型定义
interface ModelItem {
  key: string;
  label: string;
  href: string; // 添加 href 属性，用于路由跳转
}

interface ModelCategory {
  title: string;
  models: ModelItem[];
}

interface SidebarProps {
  className?: string;
}

// 模型数据
const modelCategories: ModelCategory[] = [
  {
    title: "Chat Models",
    models: [
      { key: "gpt-4", label: "GPT-4", href: "/models/gpt-4" },
      { key: "gpt-3.5", label: "GPT-3.5", href: "/models/gpt-3.5" },
      { key: "llama-2", label: "LLaMA 2", href: "/models/llama-2" },
      { key: "claude", label: "Claude", href: "/models/claude" },
      { key: "palm", label: "PaLM", href: "/models/palm" },
    ],
  },
  {
    title: "Audio Models",
    models: [
      { key: "whisper", label: "Whisper", href: "/models/whisper" },
      { key: "bark", label: "Bark", href: "/models/bark" },
      { key: "musicgen", label: "MusicGen", href: "/models/musicgen" },
      { key: "audiogen", label: "AudioGen", href: "/models/audiogen" },
    ],
  },
  {
    title: "Vision Models",
    models: [
      { key: "dalle-3", label: "DALL·E 3", href: "/models/dalle-3" },
      { key: "stable-diffusion", label: "Stable Diffusion", href: "/models/stable-diffusion" },
      { key: "midjourney", label: "Midjourney", href: "/models/midjourney" },
    ],
  },
  {
    title: "Versions",
    models: [
      { key: "v1", label: "Version 1.0", href: "/versions/v1" },
      { key: "v2", label: "Version 2.0", href: "/versions/v2" },
      { key: "v3", label: "Version 3.0", href: "/versions/v3" },
    ],
  },
];

// 主导航链接
const mainNavLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/users", label: "Users" },
  { href: "/settings", label: "Settings" },
];

const Sidebar = ({ className }: SidebarProps) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["0"]));

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
  };

  return (
    <aside className={`bg-content1 border-r border-divider ${className}`}>
      <ScrollShadow className="h-full">
        {/* 主导航链接 */}
        <nav className="flex flex-col p-4 gap-2">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 p-2 rounded hover:bg-content2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 分隔线 */}
        <div className="h-px bg-divider mx-4 my-2" />

        {/* 模型分类列表 */}
        <Accordion
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          className="bg-transparent p-4"
        >
          {modelCategories.map((category, index) => (
            <AccordionItem
              key={index}
              aria-label={category.title}
              title={
                <span className="text-foreground font-medium">
                  {category.title}
                </span>
              }
              className="group mb-2 rounded-lg bg-content1/50 hover:bg-content2/50 transition-all duration-200"
            >
              <Listbox
                aria-label={`${category.title} list`}
                variant="flat"
                className="p-0 gap-1 bg-transparent"
              >
                {category.models.map((model) => (
                  <ListboxItem
                    key={model.key}
                    className="rounded-md data-[hover=true]:bg-content2"
                  >
                    <Link href={model.href} className="w-full">
                      <span className="text-foreground">
                        {model.label}
                      </span>
                    </Link>
                  </ListboxItem>
                ))}
              </Listbox>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollShadow>
    </aside>
  );
};

export default Sidebar;