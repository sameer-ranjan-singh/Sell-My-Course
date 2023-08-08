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
    const [image, setImage] = useState("https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q291cnNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60")
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
                // function callback2(data){
                //    alert("Course Created with token : "+ data.token)
                //    navigate("/courses")
                // }
                // function callback1(res){
                //     res.json().then(callback2)
                // }
                // fetch("http://localhost:3000/admin/courses",{
                //     method:"POST",
                //     body:JSON.stringify({
                //         title: title,
                //         description: description,
                //         price : price,
                //         imageLink: image,
                //         published : true
                //     }),
                //     headers:{
                //         "Content-Type": "application/json",
                //         "Authorization": "Bearer " + localStorage.getItem("token")
                //     }
                // })
                // .then(callback1)

                const response = await axios.post(
                    "http://localhost:3000/admin/courses",
                    {
                        title: title,
                        description: description,
                        price : price,
                        imageLink: image,
                        published : true
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