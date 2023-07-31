import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card} from '@mui/material';
import { useState } from 'react';

function AddCourse(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    return <div style={{
        display:"flex",
        justifyContent:'center',
        paddingTop:100
    }}>
        <Card variant={"outlined"}
                style={{
                    width: 350,
                    padding:20,
                    borderRadius:20,
                    boxShadow:"0px 0px 10px black"
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
        <div style={{justifyContent:"end",display:"flex"}} >
            <Button
              size={'medium'} 
              variant={"contained"}
              onClick = {() => {
                function callback2(data){
                    alert("Course Created with token : "+ data.token)
                   
                    // localStorage.setItem("token",data.token)  :Important bug- resetting local storage , search and read about it . 
                }
                function callback1(res){
                    res.json().then(callback2)
                }
                fetch("http://localhost:3000/admin/courses",{
                    method:"POST",
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
            >Add Course</Button>
        </div>
        </Card>
    </div>
}

export default AddCourse