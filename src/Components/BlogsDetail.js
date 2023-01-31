import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {Box, Typography, TextField, InputLabel, Button} from '@mui/material'


const BlogsDetail = () => {

  const Navigate = useNavigate();

  const [inputs, setInputs] = useState({
   
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(inputs);
      SendRequest().then(data=> console.log(data)).then(() => Navigate("/myblogs/"))
  }

  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const RenderDetails = async () => {
    const res = await axios.get(`http://localhost:8000/api/blog/${id}`).catch(err=> console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    RenderDetails().then(data=>{
      setBlog(data.blog)
      setInputs({title:data.blog.title,
                 discription:data.blog.discription,
                 image:data.blog.image,})
    });
  },[id]);
  const SendRequest = async () => {
    const res = await axios.put(`http://localhost:8000/api/blog/update/${id}`,{
      title:inputs.title,
      discription:inputs.discription

    }).catch(err=> console.log(err));

    const data = await res.data;
    return data;
  }
  console.log(blog);
  return (
    <div>
      {inputs &&
      <form onSubmit={handleSubmit}>


<Box  boxShadow='1rem 1rem 1.5rem 1rem #ccc'
  borderRadius={10} margin={'auto'}
 padding={3} diaplay='flex' flexDirection={'column'}
  width='60%' marginTop={3}>

  <Typography variant='h4' color='#666' textAlign='center' padding={2} sx={{fontFamily:'Itim', fontWeight:"500", fontSize:'2.8rem'}}>Edit Blog</Typography>

    <InputLabel sx={{ mb:1,mt:2, fontSize:'1.8rem',fontWeight:"bold" ,fontFamily:'Dancing Script'}}>Title</InputLabel>
    <TextField onChange={handleChange} name="title" value={inputs.title} fullWidth />
    <InputLabel sx={{mb:1,mt:2, fontSize:'1.8rem',fontWeight:"bold",fontFamily:'Dancing Script'}}>Description</InputLabel>
    <TextField onChange={handleChange} name="discription" value={inputs.dsicription} fullWidth/>
   
    <Button  type='submit' variant='contained' width={5} 
  sx={{ borderRadius: 5, marginTop: 3, display:'block', fontFamily: 'poppins' }}
  color='warning'>Post</Button>


</Box>

</form>
}</div>
  )
}

export default BlogsDetail