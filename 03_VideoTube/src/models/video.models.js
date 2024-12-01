import mongoose , {Schema} from "mongoose"

const videoSchema = new Schema({
    videoFile: {
        type:String,//Cloudnary URL
        required:true,
    },
    thumbnail:{
        type:String,//Cloudnary URL
        required:true, 
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:Number,
        required:true
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectID,
        ref:"User"
    }
},{timestamps:true})

export const Video = mongoose.model("Video", videoSchema)