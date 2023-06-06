const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")


const app = express() ;
app.use(bodyParser.urlencoded({extended: true})) ;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})



app.listen(3000, function() {
  console.log("Server is running on Port 3000.");
})


app.post("/", function(req, res) {
  const query = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=bbc6dca6ea9f82ff2bffa6a7b8eb7744"

  https.get(url, function(response) {

    console.log(response.statusCode);

    response.on("data", function(data) {
      const WeatherData = JSON.parse(data);
      const temp = WeatherData.main.temp
      const WeatherDescription = WeatherData.weather[0].description
      const icon = WeatherData.weather[0].icon
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png" ;

      res.write("<h1>The temp in "+ query +" is : " + temp + " degrees Celsius.<br>The WeatherDescription of " + query + " is : " + WeatherDescription + "</h1>") ;
      res.write("<img src=" + imageUrl + ">");
      res.send() ;
    })

  })


})

/*

*/
