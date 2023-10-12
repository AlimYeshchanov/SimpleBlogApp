import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import CreateBlog from "./pages/create/CreateBlog";
import BlogDetails from "./pages/blogDetails/BlogDetails";
import UpdateBlog from "./pages/updateBlog/UpdateBlog";
import { useSelector } from "react-redux";
import MyBlogs from "./pages/myBlogs/MyBlogs";


function App() {
   const {user} = useSelector((state)=>state.auth)
  return (
      <div className="app">
      <BrowserRouter>
         <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>} />
            <Route path="/createBlog" element={user ? <CreateBlog/> : <Navigate to="/login"/>}/>
            <Route path="/myBlogs" element={user ? <MyBlogs/> : <Navigate to="/login"/>} />
            <Route path="/blogDetails/:id" element={user ? <BlogDetails/> : <Navigate to="/login"/>}/>
            <Route path="/updateBlog/:id" element={user ? <UpdateBlog/> : <Navigate to="/login"/>} />
         </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
