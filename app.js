const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(3000,function () {
 console.log("Server is running at port 3000");
});

app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});


//Setting up MailChimp
mailchimp.setConfig({
    apiKey: "05e1ddbbcc07f750f478a6df9ee896ac-us17",
    server: "us17"
});
//As soon as the sign in button is pressed execute this


app.post("/", function (req,res) {
    const firstName = req.body.fName;
    const secondName = req.body.lName;
    const email = req.body.email;
    //*****************************ENTER YOU LIST ID HERE******************************
    const listId = "2256ad85fa";
    //Creating an object with the users data
    const subscribingUser = {
    firstName: firstName,
    lastName: secondName,
    email: email
    };
//Uploading the data to the server
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
//If all goes well logging the contact's id
    res.sendFile(__dirname + "/success.html");
    console.log(response.id);
// Successfully added contact as an audience member. The contact's id is ${
//  response.id
//  }.`
}
//Running the function and catching the errors
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});


// const express = require("express");
// const bodyParser = require("body-parser");
// const https = require("https");
// const client = require("@mailchimp/mailchimp_marketing");
// // const request = require("request");

// const app = express();

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));

// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/signup.html");
//     // res.send("Hello");
// });

// client.setConfig({apiKey: "05e1ddbbcc07f750f478a6df9ee896ac-us17",  server: "us17",});

// app.post("/", function(req, res){
//     const firstName = req.body.fName;
//     const lastName = req.body.lName;
//     const email = req.body.email;
//     console.log(firstName, lastName, email);
   
//     const subscribingUser = {
//       firstName: firstName,
//       lastName: lastName,
//       email: email
//     }
//     const run = async () => {
//       const response = await client.lists.addListMember("2256ad85fa", {
//         email_address: subscribingUser.email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: subscribingUser.firstName,
//           LNAME: subscribingUser.lastName
//         }
        
//       });
   
//       if (response.statusCode===200){
        
//         res.send("Succesfully subscribing to our Newsletters");
//       } else {
//         res.send("Subcribing failed, please try again");
//       }
   
//       console.log(response);
//     }
    
   
//       run();
//   });

// // app.post("/",function(req,res){
// //     const firstName=req.body.fname;
// //     const lastName=req.body.lname;
// //     const emailid=req.body.mail;
// //     // console.log(firstName);
// //     const data=
// //         {
// //             email_address: emailid,
// //             status: "subscribed",
// //             merge_fields: {
// //                 FNAME: firstName,
// //                 LNAME: lastName,

// //             }
// //         }
    
// //     const jsonData = JSON.stringify(data);

// //     const url = "https://us17.api.mailchimp.com/3.0/lists/2256ad85fa";

// //     const options={
// //         method: "POST",
// //         auth: "ekansh:05e1ddbbcc07f750f478a6df9ee896ac-us17",
// //     }

// //     const request = https.request(url,options,function(respone){
// //         respone.on("data",function(data){
// //             console.log(JSON.parse(data));
// //         });
// //     });
// //     request.write(jsonData); request.end();
// // });


// app.listen(3000,function(){
//     console.log("Server started on Port 3000.");
// });

// //api key -> 05e1ddbbcc07f750f478a6df9ee896ac-us17
// //list id -> 2256ad85fa