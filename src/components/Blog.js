import { useState } from "react"

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [infoVisible, setInfoVisible] = useState(false)
    const showInfoStyle = { display: infoVisible ? '' : 'none' }
    const handleClick = () => {
        console.log('click')
    }
    const toggleInfoVisibility = () => {
      setInfoVisible(!infoVisible)
    }

    const handleLike = (e) => {
        console.log(blog.id)
        const toUpd = {...blog, likes: blog.likes + 1, user: blog.user.id}
        updateBlog(toUpd)
    }

    return (
        <div className='blog'>
            <div>
                <h4>{blog.title} {blog.author}
                <button className='blogViewToggle' onClick={toggleInfoVisibility}>{ infoVisible? 'hide' : 'view' }</button>
                </h4>
            </div>
            <div style={showInfoStyle}>
                <p>{blog.url}</p>
                <p>
                    {blog.likes}
                    <button onClick={handleLike}>like</button>
                </p>
                <p>{blog.user?.name}</p>
                <button onClick={() => removeBlog(blog)}>remove</button>
            </div>
        </div>
  )
}

export default Blog