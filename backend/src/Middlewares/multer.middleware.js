import multer from 'multer'


const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./public/images")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname) // the null in the callback function is for the error handling object 
    }
})


export const upload= multer({storage:storage
})