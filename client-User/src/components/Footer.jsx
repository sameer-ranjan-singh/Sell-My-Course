import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconButton from '@mui/material/IconButton';


function Footer() {
  return (
        <div style = {{
            position: 'fixed',
            top: 50,
            left: 0,
            // width: '40%',
            background: 'none', 
            display: 'flex',
            flexDirection:"column",
            justifyContent: 'center',
            padding: '10px',
    }}>

        <IconButton style={{color:"#93c422"}}
             onClick={(e) => {
                window.location ="https://www.linkedin.com/in/sameer-ranjan-singh/"
            }}>
            <LinkedInIcon />
        </IconButton>
        <IconButton style={{color:"#93c422"}}
             onClick={(e) => {
                window.location ="https://instagram.com/haan_wahe_sameer?igshid=YmMyMTA2M2Y="
            }}>
            <InstagramIcon />
        </IconButton>
    </div>
  )
}

export default Footer