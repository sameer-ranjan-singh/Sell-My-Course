import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Typography } from "@mui/material"
import {TextField, Button} from "@mui/material"
import { useNavigate } from "react-router-dom"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';

function Course() {

    let { courseId } = useParams()
    let navigate = useNavigate()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        function callback2(data) {
            console.log(data)
            setCourses(data.courses)
        }

        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, [])

    let course = null;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i]._id == courseId) {
            course = courses[i]
        }
    }

    if (!course) {
        return (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress />
            </Stack>
        );
    }

    return <>
        <hr style={{ margin: 0 }} />

        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
                variant=""
                style={{ padding: "0px 10px 0px 0px" }}
                onClick={() => {
                    navigate("/courses")
                }}
            >
                <IconButton aria-label="fingerprint" color="primary">
                    <Fingerprint />
                </IconButton>
                Home
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
            margin: 50,
            padding: "20px 0px 50px 0px",
        }}>
            <UpdateCard courses={courses} course={course} setCourses={setCourses} />
            <CourseCard course={course} />
        </div>
    </>
}

function UpdateCard(props) {
    const course = props.course

    const [title, setTitle] = useState()
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [published, setPublished] = useState(true)

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
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="Image Link"
                    variant="outlined"
                />
            </div>
            <div style={{ marginBottom: 20 }}>
                <TextField
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    fullWidth={true}
                    id="outlined-basic"
                    label="$$ Price"
                    variant="outlined"
                />
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }} >
                <Button
                    variant="outlined" startIcon={<DeleteIcon />}
                    onClick={() => {
                        const confirmDelete = prompt("Type 'delete' to confirm deletion:")
                        if (confirmDelete === "delete") {
                            function callback2(data) {
                                let empty = []
                                let deletedCourse = props.courses.find((c) => c._id == course._id)
                                let coursesAfterDeletion = props.courses.filter((c) => c._id !== course._id)
                                empty.push(coursesAfterDeletion)
                                props.setCourses(empty)

                                console.log(data)
                                navigate("/courses")

                            }

                            function callback1(res) {
                                res.json().then(callback2)
                            }

                            fetch("http://localhost:3000/admin/courses/" + course._id, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            }).then(callback1)
                        } else {
                            alert(" Failed to Delete ")
                        }

                    }}
                >Delete </Button>
                
                <Button
                    size={'medium'}
                    variant="contained" endIcon={<SendIcon />}
                    onClick={() => {
                        function callback2(data) {
                            alert("Course Updated Successfully")
                            let updatedCourses = []
                            for (let i = 0; i < props.courses.length; i++) {
                                if (props.courses[i]._id == course._id) {
                                    updatedCourses.push({
                                        _id: course._id,
                                        title: title,
                                        description: description,
                                        imageLink: image,
                                        price: price,
                                        published: published
                                    })
                                } else {
                                    updatedCourses.push(props.courses[i])
                                }
                            }
                            props.setCourses(updatedCourses)
                            alert("Course updated successfully")
                            navigate("/course/" + `${course._id}`)

                        }
                        function callback1(res) {
                            res.json().then(callback2)
                        }
                        fetch("http://localhost:3000/admin/courses/" + course._id, {
                            method: "PUT",
                            body: JSON.stringify({
                                title: title,
                                description: description,
                                price: price,
                                imageLink: image,
                                published: true,
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })
                            .then(callback1)
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
        boxShadow: "0px 0px 10px grey",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 40,
        border: "1px solid black",
    }}>
            <div>
                <div style={{ display: "flex", textAlign: "center" }}>
                    <img src={props.course.imageLink} alt="Course Image Unavailable"
                        style={{ width: 250, height: 150, boxShadow: "0px 5px 8px  black", }}
                    />
                </div>
                <Typography style={{ backgroundColor: '#CC5803' }} textAlign={"center"} variant="h6">{props.course.title}</Typography>
                <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
                <Typography textAlign={"center"} variant="h6">
                    <span style={{ fontSize: "small", padding: 5, backgroundColor: "#bfd200" }}>Rs.{props.course.price}</span>
                </Typography>
            </div>
        </Card>
    </section>
}

export default Course