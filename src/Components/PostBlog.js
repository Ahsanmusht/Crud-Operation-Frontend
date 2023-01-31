import React, {useState}  from 'react'
import axios from 'axios'
import {Box, Typography, TextField, InputLabel, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';

const PostBlog = () => {
  const Navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    discription: "",
    image: ""
  });

  const SendRequest = async () => {
    const res = await axios.post("http://localhost:8000/api/blog/post", {
      title:inputs.title,
      discription:inputs.discription,
      image:inputs.image,
      user:localStorage.getItem("userId")
    }).catch(err=> console.log(err))

    const data = await res.data;

    return data;
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(inputs);
      SendRequest().then(data=> console.log(data)).then(()=> Navigate("/blogs"))
  }
  return (
    <div>

      <form onSubmit={handleSubmit}>


          <Box  boxShadow='1rem 1rem 1.5rem 1rem #ccc'
            borderRadius={10} margin={'auto'}
           padding={3} diaplay='flex' flexDirection={'column'}
            width='60%' marginTop={3}>

            <Typography variant='h4' color='#666' textAlign='center' padding={2} sx={{fontFamily:'Itim', fontWeight:"500", fontSize:'2.8rem'}}>Post Blogs</Typography>

              <InputLabel sx={{ mb:1,mt:2, fontSize:'1.8rem',fontWeight:"bold" ,fontFamily:'Dancing Script'}}>Title</InputLabel>
              <TextField onChange={handleChange} name="title" value={inputs.title} fullWidth />
              <InputLabel sx={{mb:1,mt:2, fontSize:'1.8rem',fontWeight:"bold",fontFamily:'Dancing Script'}}>Description</InputLabel>
              <TextField onChange={handleChange} name="discription" value={inputs.dsicription} fullWidth/>
              <InputLabel sx={{mb:1,mt:2, fontSize:'1.8rem',fontWeight:"bold",fontFamily:'Dancing Script'}}>Image</InputLabel>
              <TextField onChange={handleChange} name="image" value={inputs.image} fullWidth />

              <Button  type='submit' variant='contained' width={5} 
            sx={{ borderRadius: 5, marginTop: 3, display:'block', fontFamily: 'poppins' }}
            color='warning'>Post</Button>


          </Box>

      </form>

    </div>
  )
}

export default PostBlog