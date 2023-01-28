const { urlencoded } = require("express");
const express = require("express");
const { connectDB } = require("./config/db");
const app = express()
const noticeRoutes = require("./routes/noticeRoutes");

const PORT = 3001;


connectDB()
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api", noticeRoutes)

app.listen(PORT, ()=>{
    console.log("server is running at PORT=", PORT)
})