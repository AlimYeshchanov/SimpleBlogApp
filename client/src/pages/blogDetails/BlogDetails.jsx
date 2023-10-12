import { Box, Card, CardContent, CardMedia, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { AiFillDelete, AiFillEdit, AiOutlineArrowRight } from 'react-icons/ai'
import FlexBetween from '../../components/FlexBetween'
import classes from "./blogDetails.module.css"
import { request } from '../../utils/fetchApi'
import {format} from "timeago.js"

const BlogDetails = () => {
    const [blogDetails, setBlogDetails] = useState("")
    const {id} = useParams()
    const {user, token} = useSelector((state)=>state.auth)
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchBlogDetails = async()=>{
            try {
                const options = {"Authorization": `Bearer ${token}`}
                const data = await request(`/blog/find/${id}`, "GET", options)
                setBlogDetails(data)

            } catch (error) {
                console.error(error)
            }
        }
        fetchBlogDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    //delete
    const handleDeleteBlog = async()=>{
        try {
            const options = {"Authorization": `Bearer ${token}`}
            await request(`/blog/deleteBlog/${id}`, "DELETE", options)
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
    <Navbar/>
    <Box>
        <Box 
        width={isNonMobileScreens ? "80%" : "80%"}
        display="grid"
        sx={{
            backgroundColor: "#f6f9f1",
        }}
        m="5rem auto"
        p="2rem"
        >
        <Box mb="1rem">
            <Link to="/">
            Go Back <AiOutlineArrowRight/>
            </Link>
        </Box>
        <Card>
            <CardMedia
            sx={{height: 250}}
            image={`http://localhost:7000/images/${blogDetails?.photo}`}
            title=""
            />
            <CardContent>
              {blogDetails?.userId?._id === user._id && (
                <FlexBetween justifyContent="flex-end" mt="0.5rem" gap="1.25rem" mb="0.5rem">
                    <Link to={`/updateBlog/${blogDetails?._id}`} className={classes.edit}>
                         <AiFillEdit/>
                    </Link>
                    <div className={classes.delete}>
                          <AiFillDelete onClick={handleDeleteBlog} />
                    </div>
                </FlexBetween>)}
            </CardContent>

            <CardContent>
                <p><span>Title: </span> {blogDetails?.title}</p>
                <p><span>Description: </span> {blogDetails?.desc}</p>
                <div>
                    <span><span>Author: </span> {blogDetails?.userId?.username}</span><br/>
                    <span><span>Created At:</span> {format(blogDetails?.createdAt)}</span>
                </div>
            </CardContent>
        </Card>
        </Box>
    </Box>
    </>
  )
}

export default BlogDetails