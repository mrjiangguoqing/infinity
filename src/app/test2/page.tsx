'use client';
import { useState } from "react";

import {
  ListboxItem,
  Listbox,
  ScrollShadow,
  Accordion,
  AccordionItem,
  Selection
} from "@nextui-org/react";
import Link from "next/link";
// 如果使用编程式导航，需要导入
import { useRouter } from "next/navigation";


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


const Sidebar = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["0"]));
  // 如果使用编程式导航，需要初始化 router
  const router = useRouter();

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
  };

  // 方式一：使用编程式导航
  const handleModelClick = (modelKey: string) => {
    if (modelKey === "gpt-4") {
      router.push("/chatbot");
    }
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
                  // 方式二：使用 Link 组件
                  <ListboxItem
                    key={model.key}
                    className="rounded-md data-[hover=true]:bg-zinc-100 dark:data-[hover=true]:bg-zinc-800"
                    onClick={() => handleModelClick(model.key)}
                    // 或者使用这种方式包裹内容
                    // startContent={
                    //   model.key === "gpt-4" ? (
                    //     <Link href="/chat" className="w-full">
                    //       <span className="text-zinc-700 dark:text-zinc-300">
                    //         {model.label}
                    //       </span>
                    //     </Link>
                    //   ) : (
                    //     <span className="text-zinc-700 dark:text-zinc-300">
                    //       {model.label}
                    //     </span>
                    //   )
                    // }
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

export default Sidebar;
