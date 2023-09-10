const express = require("express");
const app = express();

app.get("/numbers", async (req, res) => {
    const urls = req.query.url;
    const response = [];
    const numbers = await Promise.all(urls.map(async (url, index) => {
        return fetch(url, { timeout : 300 }).then(async(resp)  => resp.json()).catch((err) => {
            console.log(err);
            // return empty array if any of the urls is not reachable
            return [];
        });
    }));

    for (let obj in numbers){
        response.push(...numbers[obj].numbers);
    }

    // do sorting and filtering in one go
    let filteredResponse = [...new Set(response)].sort((a, b) => a - b);

    res.json({ numbers: filteredResponse });
});

app.listen(8008, () => {
    console.log("Listen on the port 8008...");
});