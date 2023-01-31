import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'

const UserBlogs = () => {
  const id = localStorage.getItem("userId");
  const [user, setUser] = useState();
  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:8000/api/blog/user/${id}`).catch(err => console.log(err))

    const data = await res.data;

    return data;

  }
  useEffect(() => {
    sendRequest().then(data => setUser(data.user));

  }, [])
  console.log(user);
  return (
    <div>

      {user && user.blogs  && user.blogs.map((blog, index) => (
        <Blog
          id={blog._id}
          key={index}
          isUser={true}
          title={blog.title}
          discription={blog.discription}
          image={blog.image}
          userName={user.name} />
      ))}

    </div>
  )
}

export default UserBlogs