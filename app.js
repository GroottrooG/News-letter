const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();



const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: "a3143d17fc8a056f0a937f128b74f50b-us1",
  server: "us1",
});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function (req , res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/" , function(req , res) {
  const firstName = req.body.fname;
  const lastName = req.body.sname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status : "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const run = async () => {
    try {
         const response = await mailchimp.lists.batchListMembers("69bb555ed0", data );
         res.sendFile( __dirname + "/success.html");
    } catch (err) {
      res.sendFile ( __dirname + "/failure.html");
    }
 };

 run();

});

app.post("/failure" , function(req , res){
  res.redirect("/")
})


app.listen(process.env.PORT || 3000 , function(req,res){
  console.log("server is live a local host 3000");
})


// ID: 69bb555ed0.

//api key a3143d17fc8a056f0a937f128b74f50b-us1
