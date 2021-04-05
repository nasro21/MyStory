const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");

// Load config
dotenv.config({ path: "./config/config.env" });

//  Connect to Database
const connectDB = require("./config/db");
connectDB();

const app = express();

// Logging with MORGAN
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Hndlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(` Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
