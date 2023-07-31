import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Typography } from "@mui/material"
import {TextField, Button} from "@mui/material"

 function Course(){

  let {courseId} =useParams() 
  const [courses, setCourses] = useState([])
    useEffect(() => {
        function callback2(data){
            console.log(data)
            setCourses(data.courses)
        }

        function callback1(res){
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/courses/", {
            method:"GET",
            headers:{
                "Authorization": "Bearer "+ localStorage.getItem("token")
            }
        }).then(callback1)
  },[])

let course = null;
for(let i = 0; i < courses.length ; i++){
    if(courses[i].id == courseId){
        course = courses[i]
    }
}  

if(!course){
    return <div>
        L O A D I N G...
    </div>
}
return <div>
       <CourseCard course = {course}/>
       <UpdateCard courses = {courses} course = {course} setCourses ={setCourses}/>
    </div>
}

function UpdateCard(props){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    const course = props.course
    
    return <div style={{
        display:"flex",
        justifyContent:'center',
        paddingTop:10
    }}>
        <Card variant={"outlined"}
                style={{
                    width: 350,
                    padding:20,
                    borderRadius:20,
                    boxShadow:"0px 0px 10px black"
                }}
            >
        <Typography variant="h6">Update Course Details</Typography>
        <div style={{marginBottom :20}}>
            <TextField
                onChange={(e) =>{
                    setTitle(e.target.value)
                }}
            fullWidth={true}
            id="outlined-basic"
            label="Title"
            variant="outlined"
           />
        </div>
        <div style={{marginBottom :20}}>
            <TextField
                onChange={(e) =>{
                    setDescription(e.target.value)   
                }}
            fullWidth={true}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            />
        </div>
        <div style={{marginBottom :20}}>
         <TextField
                onChange={(e) =>{
                    setImage(e.target.value)   
                }}
            fullWidth={true}
            id="outlined-basic"
            label="Image Link"
            variant="outlined"
            />
        </div>   
        <div style={{justifyContent:"end",display:"flex"}} >
            <Button
              size={'medium'} 
              variant={"contained"}
              onClick = {() => {
                function callback2(data){
                    // :Important bug- resetting local storage , search and read about it,significancwe and importance and use . 
                    // localStorage.getItem("token",data.token)  
                    // alert("Course Uupdated - with token : "+ data.token)
                    let updatedCourses = []
                    for(let i = 0 ;i < props.courses.length ; i ++){
                        if(props.courses[i].id == course.id){
                            updatedCourses.push({
                                id :course.id,
                                title : title,
                                description: description,
                                imageLink : image 
                            })
                        }else{
                            updatedCourses.push(props.courses[i])
                        }
                    }
                    props.setCourses(updatedCourses)
                }
                function callback1(res){
                    res.json().then(callback2)
                }
                fetch("http://localhost:3000/admin/courses/"+ course.id,{
                    method:"PUT",
                    body:JSON.stringify({
                        title: title,
                        description: description,
                        imageLink: image,
                        published : true
                    }),
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                .then(callback1)
              }}
            >Update Course</Button>
        </div>
        </Card>
    </div>
}

function CourseCard(props){
 const course = props.course
 {/* <Course course = {course}/>  ----This is how you use components again and again but alternative bad practice is also given below */}
    return <div style={{
        display:"flex",
        justifyContent:'center',
        paddingTop:10
    }}> <Card style ={{
        border:"1px solid black",
        width: 250,
        padding:5,
        margin:10,
        minHeight:200,
        borderRadius:15
    }}>
        <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
        <img  src={course.imageLink} alt ="Course Image Unavailable" 
         style={{width:250,borderRadius:"10px 10px 0px 0px",boxShadow:"0px 0px 5px  black"}}
        />
        </div>
        <Typography textAlign={"center"} variant="h6">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
    </Card>
    </div>
}

export default Course