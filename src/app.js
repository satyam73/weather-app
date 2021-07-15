const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setting view engine
app.set('view engine', 'hbs');
//setting views path
app.set("views", templatePath);
//registering partials
hbs.registerPartials(partialsPath)
//serving files with express.static() middleware
app.use(express.static(staticPath));

//routing 

app.get("/", (req,res)=>{
    res.render("index");
});
app.get("/about", (req,res)=>{
    res.render("about");
});
app.get("/weather", (req,res)=>{
    res.render("weather");
})
app.get("*", (req,res)=>{
    res.render("404error" , {
        errorMsg : "Oops! Page Not Found"
    })
})
app.listen(port, ()=>{
    console.log(`listening to the port ${port}`);
    
})