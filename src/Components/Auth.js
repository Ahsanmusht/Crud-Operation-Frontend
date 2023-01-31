import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../Storage/All-Data-Storage';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

  const DisPath = useDispatch();

  const Navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    age: ""
  });
  const [isSignUp, setisSignUp] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const SendRequest = async (type = "login") => {
    const res = await axios.post(`http://localhost:8000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      age: inputs.age
    }).catch(err => console.log(err))

    const data = await res.data;

    return data;
  }

  const ManageSubmit = (e) => {
    e.preventDefault()
    // console.log(inputs);
    if (isSignUp) {
      SendRequest("signup").then(data => localStorage.setItem("userId", data.user._id))
      .then(()=>DisPath(AuthActions.login()))
      .then(()=>Navigate('/blogs'))
      .then(data => console.log(data))
    } else {
      SendRequest().then(data => localStorage.setItem("userId", data.user._id))
      .then(()=>DisPath(AuthActions.login()))
      .then(()=>Navigate('/blogs'))
      .then(data => console.log(data))

    }
  }


  return (
    <div>

      <from >

        <Box sx={{ fontFamily: 'poppins' }} width={400} display='flex' flexDirection={'column'} alignItems='center'
          justifyContent={'center'} boxShadow='1rem 1rem 2rem #ccc' margin='auto'
          padding={3} marginTop={5} borderRadius={5}>

          <Typography sx={{
            fontFamily: 'poppins', color: '#666',
            fontWeight: '500'
          }} textAlign='center' padding={1} variant='h3'>
            {isSignUp ? "Register" : "Login"}</Typography>

          {isSignUp && (<TextField name='name' onChange={handleChange} type={'text'} value={inputs.name} placeholder='Name' margin='normal' />)}{" "}
          <TextField name='email' onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email' margin='normal' />
          <TextField name='password' onChange={handleChange} value={inputs.password} type={'password'} placeholder='Password' margin='normal' />
          {isSignUp && (<TextField name='age' onChange={handleChange} value={inputs.age} type={'number'} placeholder='Age' margin='normal' />)}{" "}

          <Button onClick={ManageSubmit} type='submit' variant='contained'
            sx={{ borderRadius: 5, marginTop: 3, fontFamily: 'poppins' }}
            color='warning'>{isSignUp ? "Register" : "Login"}</Button>


          <Button onClick={() => setisSignUp(!isSignUp)} sx={{ marginTop: 2, fontFamily: 'poppins' }}>{isSignUp ? "Login Now" : "Register Now"}</Button>

        </Box>

      </from>

    </div>
  )
}

export default Auth