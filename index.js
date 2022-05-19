require("dotenv").config();
const express = require("express");
const app = express();const axios = require("axios");
const cors = require("cors");
var bodyParser = require('body-parser')

const optionCors = {
  origin: "http://localhost:3000",
  credentials: true,
};
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(optionCors));
app.use(express.urlencoded({extended: true}));

const port = 8090;

app.post("/", (req, res) => {
  const filterBy = req.body.typeFilter;
  const value = req.body.value;
  let paramsApi = new Object();
  paramsApi[filterBy] = value;

  axios({
    url: `${process.env.BASE_API_URL}/clans`,
    method: "GET",
    params: paramsApi,
    headers: {
      Authorization: "Bearer " + process.env.TOKEN_API,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`server por ${port}`);
});
