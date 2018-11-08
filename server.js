// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Express and db
const PORT = 3000;
const app = express();
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/scrape", (req, res) => {
  axios
    .get("https://www.indeed.com/jobs?q=junior+web+developer&l=New+York%2C+NY")
    .then(response => {
      const $ = cheerio.load(response.data);
      const results = [];

      $("div.row").each((i, element) => {
        const job_title = $(element)
          .children("a")
          .attr("title");

        results.push({
          job_title: job_title
        });
      });
      console.log(results);
      res.json(results);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

app.listen(PORT, () => {
  mongoose.connect(
    "mongodb://localhost/Job-Scraper",
    { useNewUrlParser: true }
  );
  console.log("App is running on : http://localhost:3000");
});
