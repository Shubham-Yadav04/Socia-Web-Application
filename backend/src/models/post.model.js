import mongoose from "mongoose";

const postSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        unique: true,
    },

    textContent: {
        type: String,
        maxLength: 300
    },

    media: [
        {
            url: String,
            mediaType: {
                type: String,
                enum: ['image', 'video', 'gif']
            },
            public_id:{
                type:String,
                require:true
            }
        }
    ],
    likes: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
            },
            likedAt: {
                type: Date,
                default: Date.now
            },
        }]
    ,
    likeCount:{
        type:Number,
    },
    comments: [
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
       }
    ],
    caption: {
        type: String,
    } , 
    shares: [
        {
              user:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            sharedAt: {
                type: Date,
                default: new Date()
            }
        }
    ],
    sharesCount:  {
         type:Number,

},
commentsCount:{
    type:Number,
}
}, {
    timestamps: true
})

export const postModel = mongoose.model('Post', postSchema)