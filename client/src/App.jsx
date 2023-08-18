import {BrowserRouter as Router, Routes, Route} from  "react-router-dom";
import Appbar  from "./Appbar";
import Signup from "./Signup"
import Signin from "./Signin";
import AddCourse from "./AddCourse"
import Courses from "./Courses";
import Course from "./Course"
import Landing from "./Landing";

import { useState , useEffect } from "react";
import axios from "axios"


function App(){
  const [userEmail, setUserEmail] = useState(null)

  const adminCheck = async () => {
         const response = await axios.get("https://sell-my-course.onrender.com/admin/me", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    if (response.data.username) {
      setUserEmail(response.data.username)
    }
  } 

  useEffect(() => {
   adminCheck()
  }, [])
 return (
  <div style={{
      width:"100vw",
      height:"100vh",
  }}>

    <Router>
       <Appbar userEmail ={userEmail} setUserEmail ={setUserEmail}/>
       <Routes>
          <Route path="/" element = {<Landing/>}/>
          <Route path="/addcourse" element={<AddCourse/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/course/:courseId" element={<Course/>}/>
          <Route path="/signup" element={<Signup setUserEmail ={setUserEmail}/>}/>
          <Route path="/signin" element={<Signin setUserEmail ={setUserEmail}/>}/>
      </Routes>
    </Router>

  </div>
 )
}

export default App