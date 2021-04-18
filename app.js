const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

//  Connect to Database
const connectDB = require("./config/db");
connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extenden: false }));
app.use(express.json());

// Logging with MORGAN
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars Helpers
const { formatDate, stripTags, truncate } = require("./helpers/hbs");

// Hndlebars
app.engine(
  ".hbs",
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // saving Session to MongoDB
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(` Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
