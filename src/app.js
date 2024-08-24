require("dotenv").config();
require("express-async-errors");

//imp extract security
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

//imp connect db
const connectDB = require("./config/db");
//const authenticatedUser = require("./middleware/auth");

//imp routes
const authRouter = require("./routes/auth");

//imp middleware
const tooManyRequest = require("./middleware/tooManyRequest");
const errorHandler = require("./middleware/errorHandler");

app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 60 * 1000 * 15,
    max: 100,
    message: tooManyRequest,
  })
);

app.use(express.json());

app.use(helmet());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(cors());

// routes
app.use("/api/v1/auth", authRouter);

app.use(tooManyRequest);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Server on listening http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
