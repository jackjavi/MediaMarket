require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
const imageRoute = require("./routes/imagesRoute");
const videoRoute = require("./routes/videosRoute");
const folderRoute = require("./routes/foldersRoute");
const albumRoute = require("./routes/albumsRoute");
const audioRoute = require("./routes/audioRoute");
const app = express();

const port = process.env.PORT || 8000;

// routers
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://mediamarket.netlify.app, http://localhost:3000"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", authenticateUser, productsRouter);
app.use("/api/v1/upload/image", imageRoute);
app.use("/api/v1/video", videoRoute);
app.use("/api/v1/upload/folder", folderRoute);
app.use("/api/v1/upload/album", albumRoute);
app.use("/api/v1/audio", audioRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
