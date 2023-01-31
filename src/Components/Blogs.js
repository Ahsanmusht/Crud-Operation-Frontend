import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setblogs] = useState();
  const sendRequest = async () => {
    const res = await axios.get("http://localhost:8000/api/blog").catch(err=>console.log(err))

    const data = await res.data;
    
    return data;

  }
  useEffect(()=> { 
      sendRequest().then(data=> setblogs(data.blogs));

   },[])
   console.log(blogs);
  return (
    <div>
        {blogs && blogs.map((blog, index) => (
          <Blog 
          id={blog._id}
          isUser = {localStorage.getItem("userId") === blog.user._id}
          title={blog.title}
          discription={blog.discription}
          image={blog.image}
          userName={blog.user.name}/>
        ))}
    </div>
  )
}

export default Blogs