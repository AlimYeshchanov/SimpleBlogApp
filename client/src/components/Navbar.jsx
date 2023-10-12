import React from 'react'
import {AppBar, Toolbar, Typography, useMediaQuery, useTheme, Grid, Button, Box} from "@mui/material"
import DrawerComp from './DrawerComp';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { useDispatch } from 'react-redux';


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar sx={{backgroundImage: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(238,128,146,1) 35%, rgba(217,127,219,1) 36%, rgba(144,159,238,1) 58%, rgba(0,212,255,1) 100%)"}}>
      <Toolbar>
      {isMatch ? (
            <>
                <Typography>
                    BLOGAPP
                </Typography>
                <DrawerComp/>
            </>) : (
          <Grid sx={{placeItems: "center"}} container>
            <Grid item sx={2}>
              <Typography>
                BLOGAPP
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{marginLeft: "auto"}}>
              <Box display="flex">
                 <Button sx={{color: "white", ":hover": {bgcolor: '#eb8e42'}}} onClick={()=>navigate("/")}>Home</Button>
                 <Button sx={{marginLeft: 1, color: "white", ":hover":{bgcolor: '#eb8e42'}}} onClick={()=>navigate("/createBlog")}>Create Blog</Button>
                 <Button sx={{marginLeft: 1, color: "white", ":hover":{bgcolor: '#eb8e42'}}} onClick={()=>navigate("/myBlogs")}>My Blogs</Button>
              </Box>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2}>
                <Box display="flex">
                    <Button sx={{marginLeft: "auto", background: "#eb8e42", color: "white" }} onClick={()=>dispatch(logout())}>Logout</Button>
                </Box>
            </Grid>
          </Grid>)}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar