const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const cookieParser = require('cookie-parser');
const morgan = require("morgan");

// our own module
const routes = require("./routes")

const port = 3000

// Intializations
const app = express();

// Settings view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(cookieParser());

// Set JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "controllers")));

// morgan 
app.use(morgan("dev"));
// Routes
app.use(routes)

//Server Run
app.listen(port, () => {
    console.log(`Server running on ${Date(Date.now)}`)
    console.log(`Server listening on PORT: ${port}`)
});

