import { useState } from "react"

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)
    // const showInfoStyle = { display: infoVisible ? '' : 'none' }
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
                <h3>{blog.title}</h3>
                <h4><em>{blog.author}</em></h4>
                <button className='blogViewToggle' onClick={toggleInfoVisibility}>{ infoVisible? 'hide' : 'view' }</button>
            </div>
            { infoVisible ?
                <div className="toggableContent">
                    <p>{blog.url}</p>
                    <p className='#likes'>
                        likes:
                        {blog.likes}
                        <button onClick={handleLike}>like</button>
                    </p>
                    <p>{blog.user.name}</p>
                    {blog.user.username === user.username ?
                        <button id='removeblog' onClick={() => removeBlog(blog)}>remove</button>
                        : null
                    }
                </div>

                : null
            }
        </div>
  )
}

export default Blog