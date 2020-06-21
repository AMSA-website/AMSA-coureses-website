const express = require("express");
const router = express.Router();

const branches = require("../models/branches");

router.post("/add", (req, res) => {
    
    const newBranch = new branches({
        name:req.body.name,
        yearStarted:req.body.yearStarted,
        cities:req.body.cities
    })
    
    newBranch.save().then(result=>{
        console.log(result);
        res.status(201).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
        message: 'oooops something went wrong with the new branch'
        });
    })
})

router.get("/citiesOfBrunch/:id", (req, res) => {
    branches.findOne({_id:req.params.id},).select('cities -_id').populate({path:'cities',select:'name -_id'})
    .then(cities=>{
        console.log(cities);
        res.status(201).json(cities);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
        message: 'oooops something went wrong with the branch'
        });
    })
})


module.exports = router;