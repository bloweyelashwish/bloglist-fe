import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { getAll, create, update, setToken, remove } from './services/blogs'
import { login } from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
    const blogFormRef = useRef()
    const [notification, setNotification] = useState({ message: '', type: '' })


    const clearNotification = () => {
        setTimeout(() => setNotification({ message: '', type: '' }), 5000)
    }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
        const user = await login({ username, password })
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
    } catch (exception) {
       setNotification({ message: 'Wrong username or password', type: 'error' })
        clearNotification()
    }
  }

  const handleLogout = (event) => {
      event.preventDefault()
      window.localStorage.clear()
      setToken(null)
      setUser('')
  }

  const handleBlogCreation = async (blog) => {
      try {
          blogFormRef.current.toggleVisibility()
          const newBlog = await create(blog)
          setBlogs(blogs.concat(newBlog))
          setNotification({ message: `${newBlog.title} is added to the list`, type: 'success'})
          clearNotification()

      } catch {
          setNotification({ message: `Error`, type: 'error'})
          clearNotification()
      }
  }

  const updateBlog = async (toUpd) => {
      try {
          const response = await update(toUpd.id, toUpd)
          console.log(response)
          setBlogs(blogs.map(b => b.id === response.id ? response : b)) // update blog id
          setNotification({ message: `Blog ${response.title} updated`, type: 'success' })

      } catch (exception) {
          setNotification({ message: `Could not update blog`, type: 'error' })
      }
  }

  const removeBlog = async (blog) => {
      const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (!confirmation) {
          return
      }

      try {
          const response = await remove(blog.id)
          setBlogs(blogs.filter(b => b.id !== blog.id))
          setNotification({ message: `Blog was removed`, type: 'success' })
      } catch {
          setNotification({ message: `Blog could not be removed`, type: 'error' })
      }
  }

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogAppUser')

        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            setToken(user.token)
        }
    }, [])

    if (user) {
        return (
            <div>
                <h2>blogs</h2>
                <h3>{user.name} is logged in <button onClick={handleLogout}>log out</button></h3>
                <Notification notification={notification}/>
                <hr/>
                <Togglable buttonLabel='new note' ref={blogFormRef}>
                    <BlogForm
                        onSubmit={handleBlogCreation}
                    />
                </Togglable>
                <hr/>
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map(blog => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>)
                }
            </div>
        )
    }

  return (
      <>
          <Notification notification={notification}/>
          <LoginForm
              onSubmit={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
          />
      </>
)
}

export default App
