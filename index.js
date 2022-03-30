require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const optionCors = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(optionCors));

const port = 8090;
app.get("/", (req, res) => {
  const filterBy = req.query.typeFilter;
  const value = req.query.value;
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
