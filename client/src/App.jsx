import {BrowserRouter as Router, Routes, Route} from  "react-router-dom";
import Appbar  from "./Appbar";
import Signup from "./Signup"
import Signin from "./Signin";
import AddCourse from "./AddCourse"
import Courses from "./Courses";
import Course from "./Course"

function App(){
 return (
  <div style={{
      width:"100vw",
      height:"100vh",
      backgroundColor:"#eeeeee",
  }}>
          
    <Router>
     <Appbar/>
     <Routes>
       <Route path="/addcourse" element={<AddCourse/>}/>
       <Route path="/courses" element={<Courses/>}/>
       <Route path="/course/:courseId" element={<Course/>}/>
       <Route path="/Signup" element={<Signup/>}/>
       <Route path="/Signin" element={<Signin/>}/>
     </Routes>
  </Router>
  </div>
 )
}

export default App