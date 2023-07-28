import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import { useState } from 'react';


function Signup(){

    let [username,setUsername] = useState("")
    let [password,setPassword] = useState("")
    return <div>     
        <div style={{
            display: "flex",
            justifyContent: "center",
            paddingTop:150,
            marginBottom:10,
            
        }}>
            
            <Typography variant={"h6"}>
                Welcome to Course. Sign-up below !
            </Typography>
        </div>
        <div style={{
            display:"flex",
            justifyContent:'center'
        }}>
            <Card variant="outlined"
                style={{
                    width: 300,
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
                        type={"password"}
                    />
                </div>
                <div >
                    <Button
                     size={'large'} 
                     variant="contained"
                     fullWidth={true}
                     onClick={()=>{
                        function callback2(data){
                            localStorage.setItem("token",data.token)
                            console.log(data)
                        }
                        function callback1(res){
                            res.json().then(callback2)
                        }
                        fetch("http://localhost:3000/admin/signup",{
                            method:"POST",
                            body:JSON.stringify({
                                username : username,
                                password: password
                            }),
                            headers:{
                                "Content-Type":"application/json"
                            }
                        })
                        .then(callback1)
                     }}
                     >Create Account</Button>
                </div>

            </Card>
        </div>
    
        
    </div>
}

export default Signup