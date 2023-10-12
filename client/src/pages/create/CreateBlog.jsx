import React, { useState } from 'react'
import Navbar from "../../components/Navbar"
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material'
import {AiOutlineCloseCircle} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { request } from '../../utils/fetchApi'
import classes from "./create.module.css"

const CreateBlog = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [img, setImg] = useState("")
  const navigate = useNavigate()
  const {token} = useSelector((state)=>state.auth)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

  const onChangeFile = (e)=>{
    setImg(e.target.files[0])
  }

  const handleCloseImg = ()=>{
    setImg(null)
  }

  const handleCreateBlog = async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData()
      let filename = null
      if(img){
        filename = crypto.randomUUID() + img.name 
        formData.append("filename", filename)
        formData.append("image", img)
        await fetch(`http://localhost:7000/upload`, {
          method: "POST",
          body: formData
        })
      }else{
        return
      }

      const options = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const body = {
        title,
        desc,
        photo: filename
      }

      const data = await request("/blog", "POST", options, body)
      navigate(`/blogDetails/${data._id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Navbar/>
      <Box>
        <form onSubmit={handleCreateBlog} encType='multipart/form-data'>
          <Box
          width={isNonMobileScreens ? "40%" : "80%"}
          display="grid"
          gap="30px"
          sx={{backgroundColor: "#f6f9f1"}}
          m="5rem auto"
          p="2rem"
          borderRadius="1rem"
          >
            <Typography fontWeight="bold" fontSize="18px" color="primary" textAlign="center">Create Blog</Typography>
            <TextField label="Title" type="text" onChange={(e)=>setTitle(e.target.value)} />
            <TextField label="Description" type="text" multiline rows={7} onChange={(e)=>setDesc(e.target.value)} />
            <label htmlFor='image' className={classes.labelFileInput}>&nbsp;
              Image: &nbsp; <span>Upload here</span>
            </label>
            <input
            id="image"
            type="file"
            onChange={onChangeFile}
            style={{display: "none"}}
            />
            {img && <p>{img.name} <AiOutlineCloseCircle onClick={()=>handleCloseImg()} /></p>}
            <Button
            type="submit"
            sx={{
              m: "1rem 0",
              "&:hover": {backgroundColor: "#42aed6", color: "white"},
              fontSize: "14px",
            }}
            >
              Submit form
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default CreateBlog