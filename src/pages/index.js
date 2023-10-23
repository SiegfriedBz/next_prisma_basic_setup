import AddPost from "@/components/AddPost"
import { prisma } from "../../server/db/client"
import { Inter } from "next/font/google"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts)

  return (
    <main
      className={`bg-slate-900 flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      <h1 className='text-5xl text-white'>Create a post</h1>
      <br />
      <AddPost posts={posts} setPosts={setPosts} />
      <br />
      {posts.map((post) => (
        <div key={post.id}>
          <p className='text-white'>{post.content}</p>
        </div>
      ))}
    </main>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}
