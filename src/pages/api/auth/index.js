import { getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
}

// Use it in server contexts
export function auth(...args) {
  return getServerSession(...args, config)
}
