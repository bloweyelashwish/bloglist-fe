const BlogForm = ({ onSubmit, title, setTitle, author, setAuthor, url, setUrl }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                title: <input type="text" onChange={({ target }) => setTitle(target.value)} value={title}/>
            </div>
            <div>
                author: <input type="text" onChange={({ target }) => setAuthor(target.value)} value={author}/>
            </div>
           <div>
               url: <input type="text" onChange={({ target }) => setUrl(target.value)} value={url}/>
           </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm