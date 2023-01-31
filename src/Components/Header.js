import React, {useState} from 'react';
import {AppBar, Typography, Toolbar, Box, Button, Tabs, Tab}  from '@mui/material';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '../Storage/All-Data-Storage';


const Header = () => {

      const DisPath = useDispatch();

      const isLoggedIn = useSelector(state=> state.isLoggedIn);
  const [value, setvalue] = useState();
  return ( 
    <AppBar position = 'sticky' sx={{background:"orange"}}>

       <Toolbar>

            <Typography sx={{fontFamily: 'Itim', fontWeight:'500'}} variant ="h4">Sk Blogging</Typography>

           { isLoggedIn && <Box marginLeft= 'auto' >

                <Tabs textColor="inherit" value={value} onChange={(e, val) => setvalue(val)}>

                      <Tab sx={{fontFamily: 'Itim'}} LinkComponent={Link} to='/blogs' label="All Blogs"/>
                      <Tab sx={{fontFamily: 'Itim'}} LinkComponent={Link} to='/myblogs'  label="My Blogs"/>
                      <Tab sx={{fontFamily: 'Itim'}} LinkComponent={Link} to='/blogs/post'  label="Post Blog"/>

                </Tabs>

            </Box>}

            <Box display="flex" marginLeft='auto'>
                  { !isLoggedIn && <> <Button  LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1, fontSize:'1.1rem', textTransform:'none' ,fontFamily:'Itim', borderRadius:5}} color='warning'>Login</Button>
                  <Button  LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1, fontFamily:'Itim',fontSize:'1.1rem', textTransform:'none', borderRadius:5}} color='warning'>Register</Button></> }
                  { isLoggedIn && <Button onClick={()=>Dispath(AuthActions.logout())} LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1, fontFamily:'Itim',fontSize:'1.1rem', textTransform:'none', borderRadius:5}} color='warning'>Logout</Button>}
            </Box>

       </Toolbar>

    </AppBar>
)
}

export default Header