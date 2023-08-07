import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';


function Signin(){
    let [username,setUsername] = useState("")
    let [password,setPassword] = useState("")
    let navigate = useNavigate()
    return <div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            paddingTop:150,
            marginBottom:10
        }}>
            <Typography variant={"h6"}>
                Welcome Back ! Login below.
            </Typography>
        </div>
        <div style={{
            display:"flex",
            justifyContent:'center'
        }}>
            <Card variant="outlined"
                style={{
                    width: 250,
                    padding:20,
                    borderRadius:20,
                    boxShadow:"0px 0px 3px black"
                }}
            >
                <div style={{marginBottom :20}}>
                    <TextField
                    onChange={(e) =>{
                        setUsername(e.target.value)
                    }}
                        fullWidth={true}
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                    />
                </div>
                <div style={{marginBottom :10}}>
                    <TextField
                        onChange={(e) =>{
                        setPassword(e.target.value)
                        }}
                        fullWidth={true}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                    />
                </div>
                <div style={{justifyContent:"end",display:"flex"}} >
                <Button
                size={'large'} 
                variant="contained"
                fullWidth={true}
                style={{
                backgroundColor:"#CC5803",
                color:"#000000",
                border:"1px solid #CC5803",
                padding:"10px 20px 10px 20px",
                Size:"large",
                letterSpacing:"4px",
                transition: "transform 0.2s",
                fontFamily: `"Gloock", "Gloock Placeholder", serif`,
            }}
            onClick={()=>{
            function callback2(data){
                localStorage.setItem("token",data.token)
                window.location = "/courses"
            }
            function callback1(res){
                if(res.status == 403){
                    console.log("navigate to signin")
                    window.location = "/signin"

                }else if(res.status == 200){
                    res.json().then(callback2)
                }
                
            }
            fetch("http://localhost:3000/admin/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    username : username,
                    password : password
                    
                }
            })
            .then(callback1)
            }}
            >Login</Button>
                </div>

            </Card>
        </div>
    
        
    </div>
}

export default Signin