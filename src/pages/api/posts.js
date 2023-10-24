import { prisma } from "../../../server/db/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

// Protected API ROUTE

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }

  const { method } = req

  switch (method) {
    case "POST":
      const { content } = req.body

      const post = await prisma.post.create({
        data: {
          content,
        },
      })

      res.status(201).json(post)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
