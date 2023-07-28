import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddCourse(){
    return <div style={{width: 350,}}>
        <div style={{marginBottom :20}}>
                    <TextField
                        onChange={() =>{
                            
                        }}
                        fullWidth={true}
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                    />
                </div>
                <div style={{marginBottom :10}}>
                    <TextField
                        onChange={() =>{
                        
                        }}
                        fullWidth={true}
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                    />
                </div>
                <div style={{justifyContent:"end",display:"flex"}} >
                    <Button
                     size='small' 
                     variant="contained"
                     onClick={()=>{
                       
                     }}
                     >Add Course</Button>
                </div>
    </div>
}

export default AddCourse