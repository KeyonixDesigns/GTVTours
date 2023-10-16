const mongoose=require('mongoose')

const querySchema=new mongoose.Schema({
    packageTitle:{
        type: String
    },
    travelDate:{
        type: Date,
        required:true
    },
    adults:{
        type:Number,
        required:true
    },
    child:{
        type:Number,
        required:true
    },
    infants:{
        type:Number,
        required:true
    },
    passenger:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    }
})

const Query=mongoose.model('Query',querySchema)
module.exports=Query