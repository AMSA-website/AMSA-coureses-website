const express = require("express");

const Courses = require("../models/courses");
const branches = require("../models/branches");
const Cities = require("../models/cities");

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

// /////////////////////////// get all courses

router.get("/list", (req, res ) => {
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
// /////////////////////////// get course by city
router.get("/ListByCity/:id", (req, res) => {
    let cityName;
    Cities.findOne({_id:req.params.id}).select('name -_id').then((city)=>{
            cityName= city.name
         Courses.find({type: { '$regex' :cityName , '$options' : 'i' }}).then((courses)=>{
        res.status(201).json(courses) 
    }).catch(err => {
        console.log(err);
        res.status(500).json({
        message: 'oooops something went wrong with courses'
        });
        })
    })
})


// /////////////////////////// get course by branch
router.get("/ListByBranch/:id", (req, res) => {
    var selectedBranch;
    branches.findOne({_id:req.params.id}).select('name -_id').then(branch=>{
        selectedBranch=branch.name
        console.log(selectedBranch)
    }).then(()=>{
        Courses.findOne({type: { '$regex' : selectedBranch, '$options' : 'i' }}).select('name -_id')
        .then(courses=>{
                console.log("you got "+courses.length+" courses in this branch")
                res.status(201).json(courses)   
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                message: 'oooops something went wrong with courses'
                });
            })
    })  
})

// /////////////////////////// get online courses
router.get("/online", (req, res ) => {
        Courses.find({type: { $ne:'online' }}).populate({path:'category',select:'name -_id'})
        .then(courses=>{
                console.log("you got "+courses.length+" courses online")
                res.status(201).json(courses)   
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                message: 'oooops something went wrong with courses'
                });
            })
      
})

// /////////////////////////// get offline courses
router.get("/offline", (req, res ) => {
    Courses.find({type: { $ne:'online' }}).populate({path:'category',select:'name -_id'})
    .then(courses=>{
            console.log("you got "+courses.length+" courses offline")
            res.status(201).json(courses)   
        }).catch(err => {
            console.log(err);
            res.status(500).json({
            message: 'oooops something went wrong with courses'
            });
        })
//   
})

module.exports = router;

