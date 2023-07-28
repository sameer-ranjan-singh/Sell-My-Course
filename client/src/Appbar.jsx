import { Typography } from "@mui/material"
import Button from '@mui/material/Button';



function  Appbar(){
  return (
    <>
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      padding:"10px 10px 0px 10px"
    }}>
      
      <div>
      <Typography variant={"h6"}>Campus-Course</Typography>
      </div>
      <div style={{
        display:"flex"
      }}>
         <div style={{
          marginRight:10
         }}>
           <Button  
           variant={"contained"}
           
           >Sign up</Button>
         </div>
         <div style={{
          marginRight:10
         }}>
           <Button  
           variant={"contained"}
           onClick={() => {
            
           }}
           >Login</Button>
         </div>
      </div>
    </div>
    <hr />
    </>
    
  )
}

export default Appbar