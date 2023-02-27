const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const contactRoute = require("./routes/contactRoute");
const productRoute = require("./routes/productRoute");
const errorHandler = require("./middleWare/errorMiddleWare");
const cookieParser = require("cookie-parser");
const path = require("path")


const app = express()

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    origin:["http://localhost:3000", "https://maitechy-invent.vercel.app" ],
    credentials:true
}));

//uploads image
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

//ROUTES MIDDLEWARE
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/contactus", contactRoute)

//ROUTES
app.get("/", (req,res) => {
    res.send("Homepage")
})



const PORT = process.env.PORT || 5000

//ERROR MIDDLEWARE
app.use(errorHandler)

//CONNECT TO MONGODB AND START SERVER
//username:maitechy
//password:GQCOwC7VaD5aHNnc
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
            app.listen(PORT, () => {
                console.log(`SERVER RUNNING ON PORT ${PORT}`)
            })


        })
    .catch(err => console.log(err))
        
     
