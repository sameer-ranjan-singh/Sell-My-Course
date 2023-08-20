import {BrowserRouter as Router, Routes, Route} from  "react-router-dom";
import Appbar  from "./components/Appbar";
import Signup from "./components/Signup"
import Signin from "./components/Signin";
import AddCourse from "./components/AddCourse"
import Courses from "./components/Courses";
import Course from "./components/Course"
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import { Base_URL } from "./config";

import { useState , useEffect } from "react";
import axios from "axios"

import {
  RecoilRoot,
  useSetRecoilState,
} from 'recoil';
import { userState } from "./store/atoms/user";

function App(){

 return (
  <div style={{
      width:"100vw",
      height:"100vh",
   }}>
      <RecoilRoot>
          <Router>
              <Appbar/>
              <InitUser/>
              <Routes>
                  <Route path="/" element = {<Landing/>}/>
                  <Route path="/addcourse" element={<AddCourse/>}/>
                  <Route path="/courses" element={<Courses/>}/>
                  <Route path="/course/:courseId" element={<Course/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/signin" element={<Signin/>}/>
              </Routes>
              <Footer/>
          </Router>
      </RecoilRoot>
  </div>
 )
}

function InitUser(){
  const setUser = useSetRecoilState(userState)
  const init = async () => {
    try {
      const response = await axios.get(`${Base_URL}/admin/me`, {
        headers: {
       "Authorization": "Bearer " + localStorage.getItem("token")
       }
    })

    if (response.data.username) {
       setUser({
        isLoading : false,
        userEmail : response.data.username
       })
     }else{
      setUser({
        isLoading : false,
        userEmail : null
       })
     }
    } catch (error) {
      setUser({
        isLoading : false,
        userEmail : null
       })
    }  
 } 

 useEffect(() => {
  init()
 }, [])
 
 return <></>
}

export default App