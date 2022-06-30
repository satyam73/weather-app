require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const requests = require('requests');

//setting view engine
app.set('view engine', 'hbs');
//setting views pathss
app.set("views", templatePath);
//registering partials
hbs.registerPartials(partialsPath)
    //serving files with express.static() middleware
app.use(express.static(staticPath));
app.use(express.json())
    //routing 

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/weather", (req, res) => {
        res.render("weather");
    })
    // api for getting weather info
app.get("/api/weather/:cityName", (req, res) => {
    const city = req.params.cityName;
    let data;
    console.log("ln  ", city)
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`)
        .on('data', function(chunk) {
            data = chunk;
            console.log(chunk)
            console.log(data)
            res.json(data);
        })
        .on('end', function(err) {
            if (err) return console.log('connection closed due to errors', err);

            console.log('end');
        });

})

//listening to the port 
app.listen(port, () => {
    console.log(`listening to the port ${port}`);

})