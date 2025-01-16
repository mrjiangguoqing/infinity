import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 获取 Authorization header
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { message: '未授权' },
        { status: 401 }
      );
    }

    // 这里应该验证 token 并从数据库获取用户信息
    // 示例返回模拟数据
    const userData = {
      username: '测试用户',
      email: 'test@example.com',
      // 添加其他用户信息
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('API错误:', error);
    return NextResponse.json(
      { message: '服务器错误' },
      { status: 500 }
    );
  }
}

