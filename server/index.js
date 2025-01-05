import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }));

// app.use(
//     cors({
//       origin: ['https://learnify-phi-seven.vercel.app', 'http://localhost:5173'], // Allowed frontend URL
//       methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//       credentials: true, // Agar cookies ya headers allow karne ho
//     })
//   );
 


const allowedOrigins = [
  "https://learnify-phi-seven.vercel.app",
  "http://localhost:3000",
];

// Dynamic CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
};

app.use(cors(corsOptions));


 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
 
 
app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})
app.get("/", ((req,res)=>{
  res.send("hello");
}))


