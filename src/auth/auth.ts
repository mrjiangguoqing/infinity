import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";  // GitHub 提供者

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [GitHub],
  pages: {
    signIn: '/login',  // 自定义登录页面
  },
  session: {
    strategy: "jwt",  // 使用 JWT 作为会话存储方式
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;  // 保存 OAuth token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;  // 将 token 添加到 session
      return session;
    },
  },
});

export default auth;