import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Base_URL } from "./config";

function Signup({userEmail , setUserEmail}){
let [username,setUsername] = useState("")
let [password,setPassword] = useState("")
const navigate = useNavigate()

 return <div>     
    <div style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 150,
        marginBottom: 10,
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
        width: 250,
        padding:20,
        // borderRadius:20,
        boxShadow:"0px 0px 3px black",
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
                backgroundColor:"#CC5803",
                color:"#000000",
                border:"1px solid #CC5803",
                padding:"10px 20px 10px 20px",
                Size:"large",
                letterSpacing:"4px",
                transition: "transform 0.2s",
                fontFamily: `"Gloock", "Gloock Placeholder", serif`,
            }}
            onClick={async ()=>{
                const response = await axios.post(`${Base_URL}/admin/signup`,{
                    username:username,
                    password:password
                })
                const data =response.data
                localStorage.setItem("token",data.token)
                // window.location = "/courses"
                setUserEmail(username)
                navigate("/courses") 
            }}
            >Create Account</Button>
    </div>

</Card>
</div>


</div>
}

export default Signup