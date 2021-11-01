//
//*****************************************************************************************
//
const path = require("path");
const { response, query } = require("express");
const express = require("express");
const hbs = require("hbs");
const { get } = require("request");
const { getWeather } = require("./utils/weather");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup statuc directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("", {
    title: "Pleather",
    name: "Tim Tierney",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.address;
  var info = "";
  {
    // if (!location) {
    //   info = "Missing location info";
    //   res.render("weather", {
    //     title: "Weather",
    //     info,
    //     name: "Tim Tierney",
    //   });
    // } else {
    //   getWeather(location, (error, data) => {
    //     info = error ? error : data;
    //     console.log("info: ", info);
    //     if (error) {
    //       res.render("weather", {
    //         title: "Weather",
    //         info,
    //         name: "Tim Tierney",
    //       });
    //     } else if (data) {
    //       res.render("weather", {
    //         title: "Weather",
    //         info,
    //         name: "Tim Tierney",
    //       });
    //     }
    //   });
    // }
  }
  if (!location) {
    info = "Missing location info";
    error = "Missing location info";
    res.send({
      title: "Weather",
      error,
      info,
      name: "Tim Tierney",
    });
  } else {
    getWeather(location, (error, data) => {
      info = error ? error : data;
      console.log("info: ", info);
      if (error) {
        res.send({
          title: "Weather",
          error,
          info,
          name: "Tim Tierney",
        });
      } else if (data) {
        res.send({
          title: "Weather",
          error,
          info,
          name: "Tim Tierney",
        });
      }
    });
  }
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Tim Tierney",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "What do you need?",
    title: "Help",
    name: "Tim Tierney",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  } else {
    console.log(req.query);
    res.send({
      products: [],
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("my404", {
    helpText: "Help article not found",
    title: "Help",
    name: "Tim Tierney",
  });
});

app.get("*", (req, res) => {
  res.render("my404", {
    title: "Bad Page",
    helpText: "This page is invalid, please navigate back to a valid page.",
    name: "Tim Tierney",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//
//*****************************************************************************************
//
