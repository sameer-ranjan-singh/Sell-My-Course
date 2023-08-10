import { Typography } from "@mui/material"
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import * as React from 'react';
import { styled } from '@mui/material/styles';

function Appbar() {
  const location = useLocation();
  const navigate = useNavigate()
  const [userEmail, setUserEamil] = useState(null)

  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {

    function callback2(data) {
      if (data.username) {
        setUserEamil(data.username)
      }
    }
    function callback1(res) {
      res.json().then(callback2)
    }

    fetch("https://sell-my-course.onrender.com/admin/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(callback1)
  }, [])

  if (userEmail) {
   
    const handleDarkModeToggle = () => {
      setIsDarkMode((prevMode) => !prevMode);
      // Toggle body background color to black
      document.body.style.background = isDarkMode ? "radial-gradient(ellipse, #CC5803 1%,  #f0e0d5 68.73% )" : "#000000";
    };

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
      width: 62,
      height: 34,
      padding: 10,
      
      '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        
        '&.Mui-checked': {
          color: '#fff',
          transform: 'translateX(22px)',
          
          '& .MuiSwitch-thumb:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
              '#fff',
            )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
          },
          
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#CC5803',
          },
        },
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        
        '&:before': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
      },
      '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
        
      },
    }));

    return <>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems:"center",
        padding: "10px 10px 0px 30px",
        backgroundColor: location.pathname === "/" ? "#000000" : "",
      }}>

        <div>
          <Typography
            variant={"h6"}
            style={{ color: "#CC5803", fontSize: 25, fontFamily: `"Gloock", "Gloock Placeholder", serif`, }}>
            S A M E E R</Typography>
        </div>
        <div style={{
          display: "flex"
        }}>

          <div style={{
            marginRight: 0
          }}>
            <FormControlLabel
              control={<MaterialUISwitch sx={{ m: -2 }} 
              checked={isDarkMode} onChange={handleDarkModeToggle}      
              />}
            />

            <Button
              variant={""}
              style={{
                padding: "0px 5px 0px 0px",
                // border: "1px solid #CC5803",
                fontFamily: `"Gloock", "Gloock Placeholder", serif`,
                fontWeight: "bold",
                fontSize:"small",
                color: "#CC5803",
              }}
              onClick={() => {
                localStorage.setItem("token", null)
                window.location = "/signup"
              }}
            >
              <IconButton size="small" aria-label="fingerprint" color="success">
                <Fingerprint />
              </IconButton>
              Logout</Button>
          </div>
        </div>
      </div>
    </>

  }

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 10px 0px 30px",
        color: "#CC5803",
        backgroundColor: location.pathname === "/" ? "#000000" : "",
      }}>

        <div>
          <Typography
            style={{
              fontFamily: `"Gloock", "Gloock Placeholder", serif`,
              fontSize: 25
            }}
            variant={"h6"}>S A M E E R</Typography>
        </div>
        <div style={{
          display: "flex"
        }}>
          <div style={{
            marginRight: 10
          }}>
            <Button
              variant={"outlined"}
              onClick={() => {
                navigate("/signup")
              }}
              style={{
                border: "1px solid #CC5803",
                fontFamily: `"Gloock", "Gloock Placeholder", serif`,
                color: "#CC5803",
              }}
            >Sign up</Button>
          </div>
          <div style={{
            marginRight: 10
          }}>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("signin")
              }}
              style={{
                backgroundColor: "#CC5803",
                fontFamily: `"Gloock", "Gloock Placeholder", serif`,
              }}
            >Login</Button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Appbar