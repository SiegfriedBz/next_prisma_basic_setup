import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AddPost = ({ posts, setPosts }) => {
  const [content, setContent] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.status === 401) {
        toast.warn(data?.message)
        setContent("")
        return
      }

      setPosts([data, ...posts])
      setContent("")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {/* <div className='absolute top-0 right-0 bg-white h-12'> */}
      <ToastContainer />
      {/* </div> */}

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Type your post here...'
          id='post'
          name='post'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='px-4 py-2 outline-0'
        />
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
        >
          Send Post
        </button>
      </form>
    </>
  )
}

export default AddPost
