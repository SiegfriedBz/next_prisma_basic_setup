import { useSession, signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import Image from "next/image"

// Require authentication
// through server - side getServerSideProps() + getServerSession functions.
// If the user is not authenticated, this will redirect to the "/" page.

const Profile = () => {
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email
  const userName = session?.user?.name
  const userImage = session?.user?.image

  return (
    <>
      <div className='flex flex-col'>
        {status === "loading" ? (
          <p>Hang on there...</p>
        ) : status === "authenticated" ? (
          <>
            <p className='tracking-wider'>Signed in as {userEmail}</p>
            {userName}

            <Image
              className='rounded-full'
              width={65}
              height={65}
              alt='VW logo'
              src={userImage}
            />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            <p>Not signed in.</p>
            <button onClick={() => signIn("github")}>Sign in</button>
          </>
        )}
      </div>
    </>
  )
}

export default Profile

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: "/",
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
