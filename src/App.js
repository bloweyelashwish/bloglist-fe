import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAll, create, update, setToken } from './services/blogs'
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
    console.log(blog)
      try {
          const newBlog = await create(blog)
          setBlogs(blogs.concat(newBlog))
          setNotification({ message: `${newBlog.title} is added to the list`, type: 'success'})
          const clearNotification = () => {
              setTimeout(() => setNotification({ message: '', type: '' }), 5000)
          }
      } catch {
          setNotification({ message: `Error`, type: 'error'})
          clearNotification()
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
                <Togglable buttonLabel='new note'>
                    <BlogForm
                        onSubmit={handleBlogCreation}
                    />
                </Togglable>
                <hr/>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
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
