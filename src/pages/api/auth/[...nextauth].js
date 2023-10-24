import NextAuth from "next-auth"
import { config } from "./index"

export const authOptions = {
  // your configs
  ...config,
}

export default NextAuth(authOptions)
