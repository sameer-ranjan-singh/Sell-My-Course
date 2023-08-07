import { Typography } from "@mui/material"
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';


function Appbar() {
  const location = useLocation();
  const navigate = useNavigate()
  const [userEmail, setUserEamil] = useState(null)

  useEffect(() => {

    function callback2(data) {
      if (data.username) {
        setUserEamil(data.username)
        // setIsloading(false)
      }
    }
    function callback1(res) {
      res.json().then(callback2)
    }

    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(callback1)
  }, [])

  if (userEmail) {
    return <>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 10px 10px 10px",
        backgroundColor: location.pathname === "/" ? "#000000" : "",
      }}>

        <div>
          <Typography
            variant={"h6"}
            style={{ color: "#CC5803", fontWeight: "bold", fontFamily: `"Gloock", "Gloock Placeholder", serif`, }}>
            Sell-My-Course</Typography>
        </div>
        <div style={{
          display: "flex"
        }}>

          <div style={{
            marginRight: 10
          }}>
            <Button
              variant={"outlined"}
              style={{
                padding: "0px 10px 0px 0px",
                border: "1px solid #CC5803",
                fontFamily: `"Gloock", "Gloock Placeholder", serif`,
                fontWeight: "bold",
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