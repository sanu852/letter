const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()
app.use(bodyParser.urlencoded());


app.post("/", function(req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/0e5e09a627"

    const options = {
        method: "POST",
        auth: "bla-bla-bla:164777700ba0a5ad0ae8cd53217f5950-us9"
    };
    const request = https.request(url, options, function(response) {
        const status = response.statusCode
        if (status == 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});





app.use(express.static("public"))
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})
app.listen(process.env.PORT || 3000, function() {
    console.log('server is running on port 3000')
})





// API Key
// 164777700ba0a5ad0ae8cd53217f5950-us9
//LIST ID
//0e5e09a627


// "https:// us9.api.mailchimp.com/3.0/lists/0e5e09a627"