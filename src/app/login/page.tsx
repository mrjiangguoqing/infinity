// app/login/page.tsx
import SignIn from '../../app/components/sign-in'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* 左侧登录区域 */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              登录您的账户
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              或者{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                注册新账户
              </a>
            </p>
          </div>

          <div className="mt-8">
            <SignIn />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    或继续使用
                  </span>
                </div>
              </div>

              {/* 其他登录选项 */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Google
                </button>
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  微信
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 右侧背景图区域 */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gray-50">
          {/* 可以放置背景图或其他装饰性内容 */}
        </div>
      </div>
    </div>
  )
}
