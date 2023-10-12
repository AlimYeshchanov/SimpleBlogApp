import { Button, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '../../utils/fetchApi'
import {login} from "../../redux/authSlice"
import { useDispatch } from 'react-redux'

const Login = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(e)=>{
    e.preventDefault()
    if(email === "" || password === "")return
    try {
      const options = {"Content-Type": "application/json"}
      const data = await request("/auth/login", "POST", options, {email, password})
      console.log(data)
      dispatch(login(data))
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Box>
      {/* <Box
      width="100%"
      textAlign="center"
      >

      </Box> */}
      <Box
      width={isNonMobileScreens ? "30%" : "80%"}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
      sx={{backgroundColor: "#f6f9f1"}}
      >
                <Typography mb="1rem" textAlign="center" fontWeight="bold" fontSize="24px" color="primary">
        Welcome to my BlogApp
        </Typography>
        <Typography fontWeight="500" variant='h5' sx={{mb: "1.5rem"}} textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Box
          display="grid"
          gap="30px"
          >
          <TextField label="Email" type="email" onChange={(e)=>setEmail(e.target.value)} />
          <TextField label="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
          <Button
          type="submit"
          sx={{
            m: "0.3rem 0",
            fontSize: "14px",
            p: "0.8rem",
            "&:hover": {color: "white", backgroundColor: "#42aed6"},
          }}
          >
            Login
          </Button>
          <p>Don't have an account? &nbsp; <Link to="/signup">Signup</Link></p>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login