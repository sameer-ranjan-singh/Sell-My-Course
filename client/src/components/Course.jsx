import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import {TextField, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import axios from "axios";
import { Base_URL } from "../config";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

function Course() {

    let { courseId } = useParams()
    let navigate = useNavigate()
    const [course, setCourse] = useState(null)
    
    useEffect(() => {
        axios.get(`${Base_URL}/admin/course/`+ courseId,
        {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("token")

            }
        }).then(res =>{
            setCourse(res.data.course)
        })
    }, [])

    if (!course) {
        return (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress />
            </Stack>
        );
    }

    return <>
        <div style={{ display: "flex", justifyContent: "center",marginTop:60 }}>
            <Button
                variant=""
                style={{ padding: "0px 10px 0px 0px",color:"#CC5803"}}
                onClick={() => {
                    navigate("/courses")
                }}
            >
                <IconButton aria-label="fingerprint" color="success">
                    <Fingerprint />
                </IconButton>
                H o m e
            </Button>
        </div>

        <div style={{
            display: "flex",
            justifyContent: 'center',
            flexWrap: "wrap",
            alignItems: "center",
            backgroundColor: "#1976d2",
            height: "auto",
            borderRadius: "20px 20px 0px 0px",
            margin: "10px 50px 50px 50px",
            padding: "20px 0px 50px 0px",
        }}>
            <UpdateCard  course={course} setCourse={setCourse} />
            <CourseCard course={course} />
        </div>
    </>
}

function UpdateCard({course,setCourse}) {
    // const course = props.course

    const [title, setTitle] = useState(course.title)
    const [description, setDescription] = useState(course.description)
    const [image, setImage] = useState(course.imageLink)
    const [price, setPrice] = useState(course.price)
    const [published, setPublished] = useState(course.published)

    const navigate = useNavigate()

    return <section style={{
        display: "flex",
        justifyContent: 'center',
        paddingTop: 0,
        margin: 20
    }}>
        <Card variant={"outlined"}
            style={{
                width: 300,
                padding: 20,
                borderRadius: 20,
                boxShadow: "0px 0px 10px black"
            }}
        >
            <Typography textAlign={"center"} variant="h6">Update Course Details</Typography>
            <div style={{ marginBottom: 20 }}>
                <TextField
                    value ={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                />
            </div>
            <div style={{ marginBottom: 20 }}>
                <TextField
                    value ={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                />
            </div>
            <div style={{ marginBottom: 20 }}>
                <TextField
                    value ={price}
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="$$ Price"
                    variant="outlined"
                />
            </div>
            <div style={{ marginBottom: 20 }}>
                <TextField
                    value ={image}
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Paste image URL"
                    variant="outlined"
                />
            </div>
            <div style={{}}>
                <FormControl variant="standard" sx={{ mb: 3, minWidth: 100 }} size="small">
                  <InputLabel id="demo-select-small-label">Publish</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        label="publish"
                        value={published}
                        onChange={(e) => {
                            setPublished(e.target.value)
                            console.log(setPublished)
                        }}
                    >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }} >
                <Button
                    variant="outlined" startIcon={<DeleteIcon />}
                    onClick={async () => {
                        const confirmDelete = prompt("Type 'delete' to confirm deletion:")
                        if (confirmDelete === "delete") {
                           
                            const response = await axios.delete(`${Base_URL}/admin/courses/${course._id}`,
                            {
                                headers: {
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            })
                            const data = response.data
                            console.log(data)
                            navigate("/courses")
                            
                        } else {
                            alert("Incorrect (delete) ! Failed to Delete ")
                        }

                    }}
                >Delete </Button>
                
                <Button
                    size={'medium'}
                    variant="contained" endIcon={<SendIcon />}
                    onClick={async () => {
                      
                            const response = await axios.put(`${Base_URL}/admin/courses/${course._id}`,
                            {
                                title: title,
                                description: description,
                                price: price,
                                imageLink: image,
                                published: published
                            },
                            {
                                headers: {
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            })
                            const data =response.data
                            let updatedCourses ={
                                _id: course._id,
                                title: title,
                                description: description,
                                imageLink: image,
                                price: price,
                                published: published
                            }
                            setCourse(updatedCourses)
                            // alert("Course UPDATED successfully")                          
                    }}
                >Update</Button>
            </div>
        </Card>
    </section>

}

function CourseCard(props) {
    const course = props.course
    return <section style={{
        display: "flex",
        justifyContent: 'center',
        paddingTop: 0,
    }}> <Card style={{
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
            <Typography style={{ backgroundColor: '#CC5803' }} textAlign={"center"} variant="h6">{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
            <Typography textAlign={"center"} variant="h6">
                <span style={{ fontSize: "small", padding: 5, backgroundColor: "#bfd200" }}>
                    Rs.{course.price}
                </span>
            </Typography>
        </div>
    </Card>
  </section>
}

export default Course