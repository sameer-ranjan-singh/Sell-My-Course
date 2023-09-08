const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth")
const { User, Course } = require("../db/index.js")

const router = express.Router()

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
  
  router.post('/signup', (req, res) => {
    const { username, password } = req.body;
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

  router.get('/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({published: true});
    res.json({courses});
  });
  
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
  
  router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });
  
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


  // router.get("/course/:courseId",authenticateJwt, async (req,res)=>{
  //   const courseId = req.params.courseId ;
  //   const course = await Course.findById(courseId)
  //   res.json({course})
  // })

  module.exports = router
