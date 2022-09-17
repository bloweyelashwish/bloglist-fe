import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAll, setToken } from './services/blogs'
import { login } from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
        alert('Wrong credentials')
        console.log(exception)
    }
  }

  const handleLogout = (event) => {
      event.preventDefault()
      window.localStorage.clear()
      setUser('')
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
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
        )
    }

  return (
    <LoginForm
        onSubmit={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
    />
  )
}

export default App
