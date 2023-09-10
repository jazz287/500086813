const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.redirect("/numbers");
});

app.get("/numbers", (request, response) => {
    
});

app.listen(8008, () => {
    console.log("Listen on the port 8008...");
});