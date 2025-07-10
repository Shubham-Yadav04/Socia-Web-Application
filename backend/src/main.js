import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routes from './routes/user.routes.js';
import { connectDB } from './DbRepository/Dbconnection.js';
import { postRoutes } from './routes/post.routes.js';
const app = express();

connectDB()


app.listen(9090, () => {
    console.log("the server has started ")
})
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true,
   
}))
app.use(express.json({ limit: '20Kb' }))
app.use(express.static('public'))
app.use(cors({
    origin: "*"
}))


// user  routes 
app.use('/users', routes)

// post routes

app.use('/post',postRoutes)
