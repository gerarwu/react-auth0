const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../api/routes");

const PORT = 3005;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes);

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));