import React, { useState } from 'react'
import {Box, Button, TextField, Typography, useMediaQuery} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../../redux/authSlice'
import {request} from "../../utils/fetchApi"


const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async(e)=>{
    e.preventDefault()
    if(username === "" || email === "" || password === "") return 
    try {
      const options = {"Content-Type": "application/json"}
      const data = await request("/auth/signup", "POST", options, {username, email, password})
      console.log(data)
      dispatch(signup(data))
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box>
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
            Signup
        </Typography>
        <form onSubmit={handleSignup}>
            <Box display="grid" gap="30px">
                <TextField label="Username" type="text" onChange={(e)=>setUsername(e.target.value)}/>
                <TextField label="Email" type="email" onChange={(e)=>setEmail(e.target.value)} />
                <TextField label="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                <Button
                type="submit"
                sx={{
                  m: "0.3rem 0",
                  "&:hover": {color: "white", backgroundColor: "#42aed6"},
                  fontSize: "14px",
                  p: "0.8rem"
                }}
                >
                Signup
                </Button>
                <p>Already have an account? &nbsp; <Link to="/login">Login</Link></p>
            </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Signup