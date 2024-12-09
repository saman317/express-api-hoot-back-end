require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const testJwtRouter = require('./controllers/test-jwt')
const userRouter = require("./controllers/users")
const verifyToken = require("./middleware/verify-token");
const profileRouter = require('./controllers/profiles')
const cors = require("cors")

mongoose.connect(process.env.MONGODB_URI);
 
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

// MIDDLEWARES
// allows our app to handle incoming json data (express.urlencoded({extended: true}) for form data)
app.use(express.json());
app.use(cors());
// app.use(verifyToken);

// ROUTES
app.use('/test-jwt', testJwtRouter)
app.use('/users', userRouter)

app.use(verifyToken); // All routes under this must be logged in
app.use('/profiles', profileRouter)

app.listen(3000, () => {
  console.log("Feel the power on port 3000");
});