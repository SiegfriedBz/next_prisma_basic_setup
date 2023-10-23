import { useState } from "react"

const AddPost = () => {
  const [content, setContent] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      setContent("")
    } catch (error) {
      console.error(error)
    }
  }

  return (
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
  )
}

export default AddPost
