const express = require("express");
const body_parser = require("body-parser");
const pdf = require("html-pdf");
const port = 5000;
const document = require("./documents");
const app = express();
const fs = require("fs");

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

/* configure header http */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.post("/create-pdf", (req, res) => {
  pdf.create(document(req.body), {}).toFile("reports/ejemplo.pdf", (err) => {
    if (err) {
      res.send("Algo fallo");
    }
    return Promise.resolve();
  });
  res.send(pdf);
});

app.get("/get-pdf", (req, res) => {
  res.sendFile(`${__dirname}/reports/ejemplo.pdf`);
});

app.listen(port, () => {
  console.log("====================================");
  console.log(`http://localhost:${port}/`);
  console.log("====================================");
});
