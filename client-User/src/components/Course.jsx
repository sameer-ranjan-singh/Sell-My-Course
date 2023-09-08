import * as React from 'react';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Typography,Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Base_URL } from "../config";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import axios from "axios"

function Course() {

    let { courseId } = useParams()
    let navigate = useNavigate()
    const [course, setCourse] = useState(null)
    const [purchased , setPurchased] = useState([])
    
    
    useEffect(() => {
        axios.get(`${Base_URL}/user/course/`+ courseId,
        {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res =>{
            setCourse(res.data.course)
            setPurchased(res.data.alreadyPurchased)
        })
    }, [])
    // console.log(purchased)

    if (!course) {
        return (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress />
            </Stack>
        );
    }

    return <>
        <div style={{
            display: "flex",
            justifyContent:"center"
        }}>
            <CourseCard course={course} purchased={purchased} key={courseId} />
        </div>
    </>
}

function CourseCard(props) {
    const course = props.course
    const purchased = props.purchased
    let { courseId } = useParams()

    return <section 
       style={{
        display: "flex",
        justifyContent: 'center',
        flexWrap:"wrap",
        paddingTop: 0,
        border:"1px solid #93c422",
        boxShadow:"0px 1px 10px  black",
        marginTop:15,
    }}>
         <Card 
         style={{
        width: 250,
        padding: "0px 0px 10px 0px",
        margin: 10,
        minHeight: 350,
        maxHeight: 350,
        boxShadow: "0px 0px 10px black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 40,
        // border: "1px solid black",
    }}>
        <div>
            <div style={{ display: "flex", textAlign: "center" }}>
                <img src={course.imageLink} alt="Course Image Unavailable"
                    style={{ width: 250, height: 150, boxShadow: "0px 5px 8px  black", }}
                />
            </div>
            <Typography style={{ backgroundColor: '#93c422' }} textAlign={"center"} variant="h6">{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
            <Typography textAlign={"center"} variant="h6">
                <span style={{ fontSize: "small", padding: 5, backgroundColor: "#bfd200" }}>
                    Rs.{course.price}
                </span>
            </Typography>
        </div>
    </Card>
    
    { purchased.length === 0 ? (
        <Button
        size={'large'} 
        variant="contained"
        fullWidth={true}
        style={{
           backgroundColor:"#93c422",
           color:"#000000",
           // border:"1px solid #000",
           padding:"10px 20px 10px 20px",
           Size:"large",
           letterSpacing:"4px",
           transition: "transform 0.2s",
           fontFamily: `"Gloock", "Gloock Placeholder", serif`,
           fontWeight:"bolder",
       }}
       onClick={async ()=>{
           const response = await axios.post(`${Base_URL}/user/courses/${courseId}`,
           // const response = await axios.post(`${Base_URL}/user/courses/`+ courseId,
           null,
           {
               headers: {
                   "Authorization": "Bearer " + localStorage.getItem("token")
               }
           })
           const data = response.data
           alert("Course Purchased Successfully")
           console.log(data)
       }}
       >Enroll now</Button>
    ) : null }   

   
  </section>
}

export default Course