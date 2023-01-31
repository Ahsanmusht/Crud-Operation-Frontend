import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import {Box} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Blog = ({title, discription, image, userName, isUser, id}) => {
  const Navigate = useNavigate();
  const handleEdit = (e) => {
    Navigate(`/myblogs/${id}`)
  }
  console.log(title, isUser);

  const DeleteRequest = async () => {
    const res =  await axios.delete(`http://localhost:8000/api/blog/${id}`).catch(err=> console.log(err));
    const data = await res.data;
    return data;
  }
  const handleDelete = () => {
    DeleteRequest().then(()=> Navigate("/")).then(()=> Navigate("/blogs"))
  }
 
  return (
    <Card sx={{ width: '70%', margin:'auto',
       mt:3 , padding:3 , boxShadow:'.5rem .5rem 1rem #ccc',
       ":hover":{
        boxShadow:'1rem 1rem 2rem #ccc',
        cursor:'pointer'
       },
       }}>

        {isUser && (
          <Box display='flex'>

             <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><ModeEditIcon color='warning' sx={{fontSize:'1.4rem', ":hover":{
              color:"green"
             }}}/></IconButton>
             <IconButton onClick={handleDelete}><DeleteSweepOutlinedIcon sx={{fontSize:'1.8rem', ":hover":{
                  color:'red'
             }}} color='warning' /></IconButton>

          </Box>
        )}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
       
        title={title}
        // subheader={}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="server err"
      />
      <CardContent>
        <hr />
        <br/>
        <Typography variant="body2" color="text.secondary">
        <b>{userName}</b> {":"} {discription}
        </Typography>
      </CardContent>
      
    </Card>
  );
}

export default Blog