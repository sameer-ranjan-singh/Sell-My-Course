const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth")
const { Admin , Course } = require("../db/index.js")
const z= require("zod")

const router = express.Router()

let signupInputProp = z.object({
  username : z.string().min(2).max(10),
  password : z.string().min(2).max(10)
})

router.get("/", async (req,res) => {
  res.status(200).send({
    message :"Hello from Render.com / sameer",
  })
})

router.get("/me",authenticateJwt , (req , res) => {
    res.json({
      username: req.user.username 
    })
  })

// SIGNUP  
  router.post('/signup', (req, res) => {
  /* zod validation */ 
    const parsedInput = signupInputProp.safeParse(req.body)
    if(!parsedInput.success){
       res.status(411).json({
        error : parsedInput.error
      })
      return
    } 
    const username = parsedInput.data.username
    const password = parsedInput.data.password

    // const { username, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ username }).then(callback);
  });
  
// LOGIN
  router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '3h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
// CREATE COURSE  
  router.post('/courses', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
  });

// EDIT COURSE
  router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
// GET ALL COURSES
  router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
  });

// GET SINGLE COURSE  
  router.get("/course/:courseId",authenticateJwt, async (req,res)=>{
    const courseId = req.params.courseId ;
    const course = await Course.findById(courseId)
    res.json({course})
  })

// DELETE A COURSE
  router.delete("/courses/:courseId", authenticateJwt, async (req,res) => {
    const courseId = req.params.courseId ;
    const deletedCourse = await Course.findByIdAndDelete(courseId, req.body, { new: true })
     try{
       if(!deletedCourse){
         res.status(404).json({message:"course not found"})
        }
        res.json({message:"Course deleted successfully",deletedCourse})
     }catch(error){
      res.status(500).json({ message: 'Error deleting course', error: error.message });
     }
  })

  module.exports = router