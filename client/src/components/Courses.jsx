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
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Button from '@mui/material/Button';

import { Base_URL } from "../config";
import axios from "axios";
import { courseState } from "../store/atoms/course";


function Courses() {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    const init = async () => {
        const response = await axios.get(`${Base_URL}/admin/courses/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourses(response.data.courses)
    }
    
    useEffect(() => {
        init()
    }, [])
if(courses.length === 0 ){
    return <>
     <Stack sx={{
        width: '100%',
        color: 'grey.100',
     }}
        spacing={1}>
        <LinearProgress />
     </Stack>
     <div style={{
            position: "relative",

        }}>
            <div style={{
                backgroundColor: "transparent",
                position: 'fixed',
                bottom: 50,
                right: 15,
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
        </div>    
    </>
}
    return <> 
        <div style={{
            position: "relative",
            margin:60

        }}>
            <div style={{
                backgroundColor: "transparent",
                position: 'fixed',
                bottom: 50,
                right: 16,
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

            <div style={{ display: "flex", justifyContent: "center"}}>
              <Button
                variant=""
                style={{color:"#CC5803"}}
                onClick={() => {
                    navigate("/addCourse")
                }}
            >
                <IconButton aria-label="fingerprint" color="success">
                    <Fingerprint />
                </IconButton>
                Add Course
              </Button>
            </div>

            <div>
              <div style={{
                display: "flex",
                flexWrap: "wrap-reverse",
                justifyContent: "center",
                zIndex: 0
            }}>
                    <>
                        {courses.map((course) => {
                            return <Course course={course} />;
                        })}
                    </>
                {/* )} */}

              </div>
            </div>
        </div>
    </>
}

export function Course({course}) {
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
                    <img src={course.imageLink} alt="Course Image Unavailable"
                        style={{ width: 250, height: 150, boxShadow: "0px 5px 8px  black" }}
                    />
                </div>
                <Typography style={{ backgroundColor: '#CC5803' }} textAlign={"center"} variant="h6">{course.title}</Typography>
                <Typography padding={"3px"} textAlign={"center"} variant="subtitle1">{course.description}</Typography>

            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: 5 }}>


                <Switch {...label} defaultunchecked ="false" color="warning" 
                  onClick={ async () => {
                    
                    }
                   } 
                />
                <Typography textAlign={"end"} variant="h6">
                    <span style={{ fontSize: "small", padding: 5, backgroundColor: "#bfd200" }}>Rs.{course.price}</span>
                </Typography>
                <Fab onClick={(e) => {
                    navigate(`${"/course/" + course._id}`)
                }} color="success" aria-label="edit" size="small" >
                    <EditIcon />
                </Fab>
            </div>
        </Card>
    </div>

}


export default Courses