import { Typography } from "@mui/material"
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import {Loader} from 'react-loader-spinner'

function  Appbar(){

  const navigate = useNavigate()
  const [userEmail,setUserEamil ] = useState(null)
  
  // const [isLoading , setIsloading] = useState(true)

  useEffect(() => {

    function callback2(data){
      if(data.username){
        setUserEamil(data.username)
        // setIsloading(false)
      }
    }
    function callback1(res){
      res.json().then(callback2)
    }

    fetch("http://localhost:3000/admin/me",{
      method:"GET",
        headers:{
          "Authorization": "Bearer "+ localStorage.getItem("token")
        }
    }).then(callback1)
  },[])

  // if(isLoading){
  // return <div>
  // </div>
  // }

if(userEmail){
  return   <>
  <div style={{
    display:"flex",
    justifyContent:"space-between",
    padding:"10px 10px 0px 10px"
  }}>
    
    <div>
    <Typography variant={"h6"}>Campus-Course</Typography>
    </div>
    <div style={{
      display:"flex"
    }}>
       <div style={{
        marginRight:10
       }}>
        {userEmail}
         <Button  
         variant={"contained"}
         onClick={() => {
          //  navigate("/signup")
          
         }}
         >Profile</Button>
       </div>
       <div style={{
        marginRight:10
       }}>
         <Button  
         variant={"contained"}
         onClick={() => {
          localStorage.setItem("token", null )
         window.location = "/signin"
         }}
         >Logout</Button>
       </div>
    </div>
  </div>
  <hr />
  </>
}

  return (
    <>
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      padding:"10px 10px 0px 10px"
    }}>
      
      <div>
      <Typography variant={"h6"}>Campus-Course</Typography>
      </div>
      <div style={{
        display:"flex"
      }}>
         <div style={{
          marginRight:10
         }}>
           <Button  
           variant={"contained"}
           onClick={() => {
            navigate("/signup")
          }}
           >Sign up</Button>
         </div>
         <div style={{
          marginRight:10
         }}>
           <Button  
           variant={"contained"}
           onClick={() => {
             navigate("signin")
           }}
           >Login</Button>
         </div>
      </div>
    </div>
    <hr />
    </>
    
  )
}

export default Appbar