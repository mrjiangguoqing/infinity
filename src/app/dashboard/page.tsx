'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 检查认证状态
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // 获取用户数据
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://152.42.242.240:8080/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
             'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // Token 无效
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (error) {
        console.error('获取用户数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">仪表盘</h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          退出登录
        </button>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 欢迎卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">欢迎回来</h2>
          {userData && (
            <div className="space-y-2">
              <p className="text-gray-600">用户名: {userData.user}</p>
              <p className="text-gray-600">邮箱: {userData.email}</p>
            </div>
          )}
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 统计数据卡片 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">统计数据</h3>
            <div className="text-gray-600">
              {/* 添加统计信息内容 */}
              <p>待添加统计数据...</p>
            </div>
          </div>

          {/* 最近活动卡片 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">最近活动</h3>
            <div className="text-gray-600">
              {/* 添加活动列表内容 */}
              <p>待添加活动列表...</p>
            </div>
          </div>

          {/* 聊天机器人卡片 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">聊天助手</h2>
            <p className="text-gray-600 mb-4">
              与智能助手进行对话，获取帮助和支持
            </p>
            <div className="space-x-4">
              <Link
                href="/chatbot"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                开始对话
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

