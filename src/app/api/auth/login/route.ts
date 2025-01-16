import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 这里应该是你的实际登录逻辑
    // 例如：与后端 API 交互或数据库验证
    if (username === 'admin' && password === 'password') {
      // 成功登录示例
      return NextResponse.json({
        success: true,
        token: 'mock_jwt_token',
        user: { id: 1, username: 'admin' }
      });
    }

    return NextResponse.json(
      { success: false, message: '用户名或密码错误' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}

