const express = require("express");
const app = express();
const dotenv = require("dotenv"); // to use .env file
const mongoose = require("mongoose"); // for connection 
const authRoute = require("./routes/auth"); // to use auth.js route
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer"); // to upload images
const path = require("path");

dotenv.config();
app.use(express.json()); // to use json object in post request
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, { // using env file
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // if something wrong with this mongoose version
    useFindAndModify: true
  })
  .then(console.log("Connected to MongoDB")) // to connect this url
  .catch((err) => console.log(err)); // if there is any error

  // its gonna take file and save inside image folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => { // callabck function will take care of any error
    cb(null, "images"); // here images is our destination
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // as we are goona send this file name to react application
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => { // single as w'll upload only one file
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute); // url used in postman, auth router
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});