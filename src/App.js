import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAll } from './services/blogs'
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
        setUser(user)
        setUsername('')
        setPassword('')
    } catch (exception) {
        alert('Wrong credentials')
        console.log(exception)
    }
  }

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

    if (user) {
        return (
            <div>
                <h2>blogs</h2>
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
