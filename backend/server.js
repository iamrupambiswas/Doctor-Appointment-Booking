import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js';

dotenv.config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);


//app config
const app = express()
const port = process.env.PORT || 4000
// connectDB()

//middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.get('/', (req, res)=>{
    res.send('API working')
})

app.listen(port, ()=>{
    console.log("listening on port: ", port);
})