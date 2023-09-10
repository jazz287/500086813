const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.redirect("/numbers");
});

app.get("/numbers", async (req, res) => {
    const urls = req.query.url;
    // const controllerArray = [];
    const texts = await Promise.all(urls.map(async (url, index) => {
        controllerArray.push(new AbortController());
        return fetch(url, { signal: controllerArray.at(index).signal, timeout : 500 }).then(resp => resp.json())
    }));

    // // abort all controllers after 2s of timeout
    // setTimeout(() => {
    //     controllerArray.forEach(controller => controller.abort());
    // }, 500);

    res.json(texts);
});

app.listen(8008, () => {
    console.log("Listen on the port 8008...");
});