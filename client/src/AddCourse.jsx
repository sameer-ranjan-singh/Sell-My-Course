import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import axios from "axios"


function AddCourse(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("data:image/jpeg;base64,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")
    const [price,setPrice] = useState("")

    const navigate = useNavigate()
    
    return <div style={{
        display:"flex",
        justifyContent:'center',
        paddingTop:70
    }}>
        <Card variant={"outlined"}
                style={{
                    width: 300,
                    padding:20,
                    borderRadius:0,
                    boxShadow:"0px 2px 10px black"
                }}
            >
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

        <div style={{marginBottom :20}}>
         <TextField
                onChange={(e) =>{
                    setPrice(e.target.value)   
                }}
            fullWidth={true}
            id="outlined-basic"
            label="$$ Price"
            variant="outlined"
            />
        </div>          

        <div style={{justifyContent:"end",display:"flex"}} >
            <Button
              size={'medium'} 
              variant={"contained"}
              onClick = {async () => {
                const response = await axios.post(
                    "https://sell-my-course.onrender.com/admin/courses",
                    {
                        title: title,
                        description: description,
                        price : price,
                        imageLink: image,
                        published : false
                    },
                    {
                    headers:{
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                const data =response.data
                alert("Course CREATED Successfully !")
                navigate("/courses")
              }}
            >Add Course</Button>
        </div>
        </Card>
    </div>
}

export default AddCourse