import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import Image from "next/image"

// Protected page
// Require authentication
// through server - side getServerSideProps() + getServerSession functions.
// If the user is not authenticated, this will redirect to the "/signin" page.

const Admin = () => {
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email
  const userName = session?.user?.name
  const userImage = session?.user?.image

  return <div>Admin {userEmail}</div>
}

export default Admin

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}
