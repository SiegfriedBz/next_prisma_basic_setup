import { useState } from "react"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons"

const Navbar = () => {
  const [btnSignoutIsopen, setBtnSignoutIsopen] = useState(false)
  const { data: session, status } = useSession()
  const userImage = session?.user?.image

  return (
    <div className='flex justify-between items-center bg-slate-900 text-white p-8'>
      <h1>Navbar</h1>

      <div className='flex space-x-8 items-center'>
        {status === "authenticated" ? (
          <div className='relative'>
            <Image
              className='rounded-full cursor-pointer'
              width={60}
              height={60}
              alt='user Image'
              src={userImage}
              onClick={() => setBtnSignoutIsopen(true)}
            />

            <AnimatePresence>
              {btnSignoutIsopen && (
                <motion.div
                  onClick={() => {
                    setBtnSignoutIsopen(false)
                    setTimeout(() => {
                      signOut()
                    }, 100)
                  }}
                  className='absolute top-1/2 right-1/2 rounded-full w-[60px] h-[60px] bg-gray-200'
                  initial={{ scale: 0, x: 30, y: -30 }}
                  animate={{ scale: 1.5, x: 0, y: 0 }}
                  exit={{ scale: 0, x: 30, y: -30 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 360,
                    damping: 20,
                  }}
                >
                  <div className='relative cursor-pointer'>
                    <Image
                      className='rounded-full'
                      width={60}
                      height={60}
                      alt='user Image'
                      src={userImage}
                    />
                    <span className='text-white text-center font-semibold text-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                      Sign out
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            <div
              onClick={() => signIn("github")}
              className='flex cursor-pointer items-center justify-center rounded-full w-[60px] h-[60px] bg-gray-200'
            >
              <FontAwesomeIcon
                icon={faUserAstronaut}
                className='text-slate-900 font-bold text-4xl'
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
