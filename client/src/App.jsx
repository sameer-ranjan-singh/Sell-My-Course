import {BrowserRouter as Router, Routes, Route} from  "react-router-dom";
import Appbar  from "./Appbar";
import Signup from "./Signup"
import Signin from "./Signin";
import AddCourse from "./AddCourse"
import Courses from "./Courses";
import Course from "./Course"
import Landing from "./Landing";

function App(){
 return (
  <div style={{
      width:"100vw",
      height:"100vh",
  }}>

    <Router>
       <Appbar/>
       <Routes>
          <Route path="/" element = {<Landing/>}></Route>
          <Route path="/addcourse" element={<AddCourse/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/course/:courseId" element={<Course/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </Router>

  </div>
 )
}

export default App