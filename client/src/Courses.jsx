import { useEffect, useState } from "react"
import { Card,Typography } from "@mui/material"

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import Switch from '@mui/material/Switch';

function Courses() {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        function callback2(data) {
            console.log(data)
            setCourses(data.courses)
        }

        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, [])

    return <> <hr style={{ margin: 0 }} />
        <div style={{
            position: "relative"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "end",
                backgroundColor: "transparent",
                position: 'fixed',
                bottom: 50,
                right: 20,
                zIndex: 1,
            }}>
                <Fab
                    onClick={(e) => {
                        navigate("/addCourse")
                    }}
                    color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
            <div style={{
                display: "flex",
                flexWrap: "wrap-reverse",
                justifyContent: "center",
                backgroundColor: "#e9edc9",
            }}>

                {courses.length === 0 ? ( // Check if courses array is empty
                    // Render loading spinner if courses are being fetched or not available
                    <Stack sx={{
                        width: '100%',
                        color: 'grey.100',
                    }}
                        spacing={1}>
                        <LinearProgress />
                    </Stack>
                ) : (
                    // Render Course components if courses are available
                    <>
                        {courses.map((course) => {
                            return <Course course={course} />;
                        })}
                    </>
                )}

                {/* {since you cant put courses directly into javasript as it an object } */}
            </div>
        </div>
    </>
}

export function Course(props) {
    const navigate = useNavigate()
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    return <div style={{ padding: 20 }}>
        <Card
            style={{
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
                <div style={{ display: "flex", }}>
                    <img src={props.course.imageLink} alt="Course Image Unavailable"
                        style={{ width: 250, height: 150, boxShadow: "0px 5px 8px  black" }}
                    />
                </div>
                <Typography style={{ backgroundColor: '#CC5803' }} textAlign={"center"} variant="h6">{props.course.title}</Typography>
                <Typography padding={"3px"} textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>

            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: 5 }}>


                <Switch {...label} defaultChecked color="warning" />
                <Typography textAlign={"end"} variant="h6">
                    <span style={{ fontSize: "small", padding: 5, backgroundColor: "#bfd200" }}>Rs.{props.course.price}</span>
                </Typography>
                <Fab onClick={(e) => {
                    navigate(`${"/course/" + props.course._id}`)
                }} color="success" aria-label="edit" size="small" >
                    <EditIcon />
                </Fab>
            </div>
        </Card>
    </div>

}


export default Courses