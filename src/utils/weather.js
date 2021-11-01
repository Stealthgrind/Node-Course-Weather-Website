const request = require("request");
const chalk = require("chalk");

const errorLog = chalk.bold.red;
const success = chalk.green.italic;
const warning = chalk.keyword("orange");
const info = chalk.grey;
const startEnd = chalk.bold.blue;

const log = console.log;

const baseUrl = "http://api.weatherstack.com/current";
const access_key = "access_key=96dfbe610af3e37cc1dc886584a4946d";
const units = "units=f";
const location = "query=Nags%20Head";

const getWeather = (location, callback) => {
  const url = baseUrl + "?" + access_key + "&" + units + "&query=" + location;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("No internet");
    } else if (body.error) {
      //callback(JSON.stringify(body.error));
      callback("Invalid location search string! - " + location);
    } else {
      const { temperature, wind_speed, wind_dir, feelslike } = body.current;
      const retString =
        "It is currently " +
        temperature +
        " degrees in " +
        body.location.name +
        ", " +
        body.location.region +
        ". It is blowing " +
        (wind_speed / 1.151).toFixed(2) +
        " knots from the " +
        wind_dir +
        ". It feels like " +
        feelslike +
        " degrees.";
      callback(undefined, retString);
    }
  });
};

module.exports = {
  getWeather: getWeather,
};
