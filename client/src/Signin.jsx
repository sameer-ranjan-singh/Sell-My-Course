import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Card, Typography} from '@mui/material';


function Signin(){
    return <div>
        <div style={{
            display: "flex",
            justifyContent: "center",
            paddingTop:150,
            marginBottom:10
        }}>
            <Typography variant={"h6"}>
                Welcome Back ! Sign-in below.
            </Typography>
        </div>
        <div style={{
            display:"flex",
            justifyContent:'center'
        }}>
            <Card variant="outlined"
                style={{
                    width: 350,
                    padding:20,
                    borderRadius:20,
                    boxShadow:"0px 0px 3px black"
                }}
            >
                <div style={{marginBottom :20}}>
                    <TextField
                        fullWidth={true}
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                    />
                </div>
                {/* <br /> */}
                <div style={{marginBottom :10}}>
                    <TextField
                        fullWidth={true}
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                    />
                </div>
                <div style={{justifyContent:"end",display:"flex"}} >
                    <Button size='small' variant="contained">Signin</Button>
                </div>

            </Card>
        </div>
    
        
    </div>
}

export default Signin