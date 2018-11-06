// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");

// database structure (temp)
const database_url = "job_posts";
const collection = "indeed";

const app = express();
// const db = mongojs(database_url, collection);

// Catching db errors
// db.on("error", (error) => {
//   console.log(error);
// });

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
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
    
});

app.listen(3000, () => {
  console.log("App is running on : http://localhost:3000");
});
