'use client';

import { NavigationBar } from "./NavigationBar";  // 改名为 NavigationBar
import  Sidebar  from "./Sidebar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <NavigationBar className="fixed top-0 z-50" />
      
      {/* Main Container */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar className="w-64 fixed h-[calc(100vh-4rem)] hidden md:block" />
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}