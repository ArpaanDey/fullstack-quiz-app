import mongoose from "mongoose";

 export const connectDB=async ()=>{ 
    await mongoose.connect('mongodb+srv://prabhasdey816_db_user:QuizApp@cluster0.q9ewykh.mongodb.net/QuizApp')
    .then(()=>{console.log('connected to db')})
}  