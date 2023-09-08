import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../config";
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';


function Signin(){
    let [username,setUsername] = useState("")
    let [password,setPassword] = useState("")
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState);
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
                    // borderRadius:20,
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
                        variant="standard"
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
                        variant="standard"
                        type={"password"}
                    />
                </div>
                <div style={{justifyContent:"end",display:"flex"}} >
                <Button
                size={'large'} 
                variant="contained"
                fullWidth={true}
                style={{
                backgroundColor:"#93c422",
                color:"#000000",
                border:"1px solid #93c422",
                padding:"10px 20px 10px 20px",
                Size:"large",
                letterSpacing:"4px",
                transition: "transform 0.2s",
                fontFamily: `"Gloock", "Gloock Placeholder", serif`,
            }}
            onClick={async ()=>{
                const response = await axios.post(`${Base_URL}/user/login`,null,{
                    headers:{
                        username:username,
                        password:password
                    }
                })
            const data = response.data
            localStorage.setItem("token",data.token)
            // window.location = "/courses"
            setUser({
                isLoading : false,
                userEmail: username
              })
            navigate("/courses") 
          }}
            >Login</Button>
                </div>

            </Card>
        </div>
    
        
    </div>
}

export default Signin