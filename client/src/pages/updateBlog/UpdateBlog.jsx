import { useMediaQuery, Box, Typography, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { request } from '../../utils/fetchApi'

const UpdateBlog = () => {
    const [blogDetails, setBlogDetails] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const {id} = useParams()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    useEffect(()=>{
        const fetchBlogDetails = async()=>{
            try {
                const options = {
                    "Authorization": `Bearer ${token}`
                }
                const data = await request(`/blog/find/${id}`, "GET", options)
                setBlogDetails(data)
                setTitle(data.title)
                setDesc(data.desc)
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlogDetails()
        
    }, [id, token])

    const handleUpdateBlog = async(e)=>{
        e.preventDefault()
        try {
            const options = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
           await request(`/blog/updateBlog/${id}`, "PUT", options, {title, desc})
           navigate(`/blogDetails/${id}`)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
       <Navbar/>
       <Box>
           <form onSubmit={handleUpdateBlog}>
                <Box 
                width={isNonMobileScreens ? "40%" : "80%"}
                display="grid"
                gap="30px"
                m="5rem auto"
                p="2rem"
                borderRadius="1rem"
                sx={{backgroundColor: "#f6f9f1"}}
                >
                    <Typography fontWeight="bold" fontSize="18px" color="primary" textAlign="center">Update Blog</Typography>
                    <TextField value={title} label="Title" type="text" onChange={(e)=>setTitle(e.target.value)} />
                    <TextField value={desc} label="Description" type="text" multiline rows={7} onChange={(e)=>setDesc(e.target.value)} />
                    <Button
                    type="submit"
                    sx={{
                        m: "1rem 0",
                        "&:hover": {backgroundColor: "#42aed6", color: "white"}
                    }}
                    >Update</Button>
                </Box>
           </form>
       </Box>
    </>
  )
}

export default UpdateBlog