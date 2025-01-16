// Sidebar.tsx
import { useState } from "react";
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
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 p-2 rounded hover:bg-content2"
            >
              {link.label}
            </a>
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
                    <span className="text-foreground">
                      {model.label}
                    </span>
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
