import Header from "./Components/Header";
import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Auth from './Components/Auth';
import Blogs from './Components/Blogs';
import UserBlogs from './Components/UserBlogs';
import BlogsDetail from './Components/BlogsDetail';
import PostBlog from './Components/PostBlog';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from "./Storage/All-Data-Storage";

function App() {
     
      const isLoggedIn = useSelector(state=> state.isLoggedIn);
     console.log(isLoggedIn);
  return <React.Fragment>

        <header>

              <Header />

        </header>

        <main>

              <Routes>
               { isLoggedIn ? <Route path="/auth" element={<Auth/>} /> :
                <>
                <Route path="/blogs" element={<Blogs/>} />
                <Route path="/myblogs" element={<UserBlogs/>} />
                <Route path="/myblogs/:id" element={<BlogsDetail/>} />
                <Route path="/blogs/post" element={<PostBlog/>} /></>}
              </Routes>

        </main>


  </React.Fragment>
  

}

export default App;
       