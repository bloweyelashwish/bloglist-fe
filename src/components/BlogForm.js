import {useState} from "react";

const BlogForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    console.log(title, author, url)

    const handleBlogSubmit = (e) => {
        e.preventDefault()

        const blog = {
            title,
            author,
            url
        }

        onSubmit(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={handleBlogSubmit}>
            <div>
                title: <input id="input-title" type="text" value={title} onChange={({ target }) => setTitle(target.value)}/>
            </div>
            <div>
                author: <input id="input-author" type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/>
            </div>
           <div>
               url: <input id="input-url" type="text" value={url} onChange={({ target }) => setUrl(target.value)}/>
           </div>
            <button id="create-blog-button" type="submit">create</button>
        </form>
    )
}

export default BlogForm