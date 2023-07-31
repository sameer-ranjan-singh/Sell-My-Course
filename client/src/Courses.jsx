import { useEffect, useState } from "react"
import { Card,Typography } from "@mui/material"

function Courses(){
    const [courses, setCourses] = useState([])

    useEffect(() => {
        function callback2(data){
            console.log(data)
            setCourses(data.courses)
        }

        function callback1(res){
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/courses", {
            method:"GET",
            headers:{
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        }).then(callback1)
    }, [])

 return <div style ={{display:"flex", flexWrap:"wrap-reverse",justifyContent:"center"}}>
    {courses.map((course) => {
       return <Course course = {course}/>
    })}
    {/* {since you cant put courses directly into javasript as it an object } */}
 </div>
}
export function Course(props){
    return  <Card style ={{
        border:"1px solid black",
        width: 250,
        padding:5,
        margin:10,
        minHeight:200,
        borderRadius:15
    }}>
        <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
        <img  src={props.course.imageLink} alt ="Course Image Unavailable" 
         style={{width:250,borderRadius:"10px 10px 0px 0px",boxShadow:"0px 0px 5px  black"}}
        />
        </div>
        <Typography textAlign={"center"} variant="h6">{props.course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
    </Card>
 }


export default Courses