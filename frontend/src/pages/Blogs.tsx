import { Appbar } from "../components/Appbar"
import { Blogcard } from "../components/BlogCard"
import { useBlogs } from "../hooks"


export const Blogs = ()=>{
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            loading...
        </div>
    }

    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map(blog => <Blogcard 
                    authorName={blog.author.name || "Anonymous"}
                    title= {blog.content}
                    content= {blog.content}
                    publishedDate="Dec 3,2024"
                />)}
                
                
            </div>
        </div>
    </div>
}