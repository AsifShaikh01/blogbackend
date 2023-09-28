const express = require("express");
const dotenv = require("dotenv");
const {connection} = require("./config/db");
const {userRouter} = require("./routes/User.routes");
const {blogRouter} = require("./routes/Blog.routes");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api",userRouter);
app.use("/api", blogRouter);


app.listen(process.env.PORT , async()=>{
    try {
        await connection;
        console.log("connected to the database!!")
        
    } catch (error) {
        console.log("can't connect")
    }
    console.log(`server is running at port ${process.env.PORT}`)
})