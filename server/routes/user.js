const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth")
const { User, Course } = require("../db/index.js")
const z= require("zod")

const router = express.Router()

let signupInputProp = z.object({
  username : z.string().min(2).max(10),
  password : z.string().min(2).max(10)
})

// Checking for backend working 
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
    function callback(user) {
      if (user) {
        res.status(403).json({ message: 'User already exists' });
      } else {
        const obj = { username: username, password: password };
        const newUser = new User(obj);
        newUser.save();
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
      }
  
    }
    User.findOne({ username }).then(callback);
  });

// LOGIN  
  router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '3h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

// GET ALL PUBLISHED COURSES
  router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({courses});
  });

// BUY SINGLE COURSE  
  router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      console.log(course)
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
// GET ALL USER PURCHASHED COURSES  
  router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });

// GET SINGLE COURSE DETAILS   
  router.get("/course/:courseId",authenticateJwt, async (req,res)=>{
    const courseId = req.params.courseId ;
    const course = await Course.findById(courseId)
    const user = await User.findOne({ username: req.user.username })
    const alreadyPurchased = user.purchasedCourses.filter( (ObjectId) =>{
      if(ObjectId == courseId){
        return courseId
      }
    })
    console.log(alreadyPurchased)
    res.json({course,alreadyPurchased})
  })

  module.exports = router
