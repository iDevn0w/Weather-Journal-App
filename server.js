var projectData = {};
// require the express framework
const express = require("express");
// initailize the app
const app = express();
// require path
const path = require("path");
// init static path app
app.use(express.static(path.join(__dirname, "assets")));

// setup the PORT if local 5050 is not availble use 3000
const PORT = process.env.PORT || 3000;
// trace the endpoint in the terminal
const tracer = require("./middleware/trace");
app.use(tracer);

// body parser midleware to parse income data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// cors middleware for comunications
const cors = require("cors");
const { response } = require("express");
app.use(cors());

/*

routing begin here

*/
// GET route send all projectData api to the weather/data  URI endpoint
app.get("/get/data", (request, response) => response.send(projectData));

// POST route that add income data
app.post("/add/data", (request, response) => {
  projectData.temp = request.body.temp;
  projectData.date = request.body.date;
  projectData.content = request.body.content;
  response.send(projectData);
});
// server listen on PORT
app.listen(PORT, () => console.log(`server running on port: ${PORT}}`));
