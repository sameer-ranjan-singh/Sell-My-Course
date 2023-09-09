import "../App.css" 
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Intro(){
    const navigate = useNavigate()
    // if(location.pathname === "/"){
    //     document.body.style.background = "#000000"
    // }

  return (
    <div className='top-layer fRFipN'>
        <div className='mid-layer'>
            <h1 className='mid-h1'>
            Unlock Your  
            <br />
            <span className='mid-span'>Potential,</span> Share Your Knowledge
            </h1>
            <p className='mid-p'>
            Learn, Teach, Succeed Together.
            </p>
            <div className='mid-div'>
                <button className="mid-div-btn-p"
                    onClick={()=>{
                        navigate("/landing")
                    }}
                >Create Course
                </button>
                
                <Link to="https://sameer-user.vercel.app" target="_blank" rel="noopener noreferrer">
                  <button className="mid-div-btn-s" >Explore Courses</button>
               </Link>
            </div>
        </div>
    </div>
  )
}

export default Intro