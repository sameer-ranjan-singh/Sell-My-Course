import {BrowserRouter as Router, Routes, Route} from  "react-router-dom";
import Appbar  from "./Appbar";
import Signup from "./Signup"
import Signin from "./Signin";
import AddCourse from "./AddCourse"
// import './App.css'

function App(){
 return (
  <div style={{
      width:"100vw",
      height:"100vh",
      backgroundColor:"#eeeeee",
         }}>
          <Appbar/>
    <Router>
     <Routes>
       <Route path="/addcourse" element={<AddCourse/>}/>
       <Route path="/" element={<Signup/>}/>
       <Route path="/Signup" element={<Signup/>}/>
       <Route path="/Signin" element={<Signin/>}/>
     </Routes>
  </Router>
  </div>
 )
}

export default App