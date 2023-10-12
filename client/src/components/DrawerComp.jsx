import React, { useState } from 'react'
import { Button, Drawer, IconButton, List, ListItem} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from "../redux/authSlice";

const DrawerComp = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Drawer PaperProps={{
        sx: {backgroundColor: '#1b2a28'}
      }} open={open} onClose={()=>setOpen(false)}>
        <List>
          <ListItem>
            <Button onClick={()=>navigate("/")}>Home</Button>
          </ListItem>
          <ListItem>
            <Button onClick={()=>navigate("/createBlog")}>Create Blog</Button>
          </ListItem>
          <ListItem>
            <Button onClick={()=>navigate("/myBlogs")}>My Blogs</Button>
          </ListItem>
          <ListItem>
            <Button onClick={()=>dispatch(logout())}>Logout</Button>
          </ListItem>
        </List>
      </Drawer>

      <IconButton sx={{marginLeft: "auto", color: "white"}} onClick={()=>setOpen(!open)}>
        <MenuRoundedIcon/>
      </IconButton>
    </>
  )
}

export default DrawerComp