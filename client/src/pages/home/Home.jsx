import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Box, Card, CardContent, CardMedia, Typography, useMediaQuery } from '@mui/material'
import { request } from '../../utils/fetchApi'
import { Link } from 'react-router-dom'
import {FiArrowRight} from "react-icons/fi"
import {format} from "timeago.js"


const Home = () => {
  const [blogs, setBlogs] = useState([])
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

  useEffect(()=>{
    const fetchBlogs = async()=>{
      try {
        const data = await request("/blog/getAll", "GET")
        setBlogs(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogs()
  }, [])

  return (
      <>
      <Navbar />
      <Box>
      <Box 
      width={isNonMobileScreens ? "80%" : "80%"}
      display="grid"
      m="5rem auto"
      p="2rem"
      >
        {blogs?.map((blog)=>(
        <Card key={blog._id} sx={{mb: "2rem"}}>
          <Link to={`/blogDetails/${blog?._id}`}>
            <CardMedia
            sx={{height: 250}}
            image={`http://localhost:7000/images/${blog?.photo}`}
            />
          </Link>
          <CardContent>
            <Typography variant='h6' fontWeight="bold">{blog?.title}</Typography>
            <Typography variant='body2' mt="0.5rem" textAlign="justify" mb="1rem">{blog?.desc}</Typography>
            <Typography mb="0.5rem">
                <span>Author:</span> <span>{blog?.userId.username}</span><br/>
                <span>Created:</span> <span>{format(blog?.createdAt)}</span>
            </Typography>
            <Link to={`/blogDetails/${blog?._id}`}>
            Read More <FiArrowRight/>
            </Link>
          </CardContent>
        </Card>
        ))}
      </Box>
    </Box></>
  )
}

export default Home