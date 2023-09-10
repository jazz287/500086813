const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.redirect("/numbers");
});

app.get("/numbers", async (req, res) => {
    const urls = req.query.url;
    const response = [];
    const numbers = await Promise.all(urls.map(async (url, index) => {
        return fetch(url, { timeout : 500 }).then(async(resp) => {
            let json = await resp.json();
            return json['numbers'];
        }).catch((err) => {
            console.log(err);
            // return empty array if any of the urls is not reachable
            return [];
        });
    }));

    for (let arr in numbers){
        response.push(...numbers[arr]);
    }

    // make sure the response is sorted in ascending order
    response.sort((a, b) => a - b);

    // remove duplicate numbers
    let filteredResponse = response.filter((item, index) => response.indexOf(item) === index);

    res.json({ numbers: filteredResponse });
});

app.listen(8008, () => {
    console.log("Listen on the port 8008...");
});