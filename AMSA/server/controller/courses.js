const express = require("express");

const Courses = require("../models/courses");
const router = express.Router();
  
router.post("/add", (req, res , next) => {
    const newCourse = new Courses({
        name: req.body.name,
        video: req.body.video,
        description: req.body.description,
        price: req.body.price,
        syllabus: req.body.syllabus,
        aboutProgram: req.body.aboutProgram,
        type: req.body.type,
        skillLevel: req.body.skillLevel,
        startingDate: req.body.startingDate,
        endingDate: req.body.endingDate,
        duration: req.body.duration,
        trainers: req.body.trainers,
        category: req.body.category,
        learners:req.body.learners,
        reviews: req.body.reviews
    })
    newCourse.save().then(result=>{
        // console.log(result);
        res.status(201).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
        message: 'oooops something went wrong with the new course'
        });
    })
})


router.get("/list", (req, res , next) => {
    Courses.find().populate({path:'category',select:'name -_id'}).then(courses=>{
        console.log("you got "+courses.length+" courses")
        res.status(201).json(courses)   
    }).catch(err => {
        console.log(err);
        res.status(500).json({
        message: 'oooops something went wrong with courses'
        });
    })
})

module.exports = router;
