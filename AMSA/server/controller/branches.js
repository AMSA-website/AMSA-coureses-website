const express = require("express");
const router = express.Router();

const branch = require("../models/branches");

router.post("/add", (req, res) => {
    
    const newBranch = new branch({
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




module.exports = router;