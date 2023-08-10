import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';
import { useState } from 'react';
import axios from "axios"

function Signup(){
let [username,setUsername] = useState("")
let [password,setPassword] = useState("")

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
        borderRadius:20,
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
                const response = await axios.post("https://sell-my-course.onrender.com/admin/signup",{
                    username:username,
                    passsword:password
                },{
                    headers:{
                        "Content-Type": "application/json",
                    }
                })
                const data =response.data
                localStorage.setItem("token",data.token)
                window.location = "/courses" 
            }}
            >Create Account</Button>
    </div>

</Card>
</div>


</div>
}

export default Signup