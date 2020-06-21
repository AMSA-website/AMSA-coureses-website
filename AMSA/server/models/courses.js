const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const courseSchema=new Schema({ 
    name:{ type: String, required:true },
    video:{ type: String, required:true  },
    description:{ type: String, required:true },
    price:{ type: Number, required:true },
    syllabus:{ type: [String], required:true },
    aboutProgram:{ type: String, required:true },
    type:{ type: String, required:true },
    skillLevel:{ type: String, required:true },
    startingDate:{ type: String, required:true },
    endingDate:{ type: String, required:true },
    duration:{ type: String, required:true },
    trainers:{ type: [String], required:true },
    category:{ type: Schema.Types.ObjectId, ref:'category'},
    learners:[{ type: Schema.Types.ObjectId, ref:'student'}],
    reviews:[{ type: Schema.Types.ObjectId, ref:'review'}]
});


module.exports=mongoose.model('course',courseSchema); 



