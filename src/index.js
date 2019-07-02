let express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
let app = express();
// app.use(cors());
//app.options("*", cors());
// app.delete('*', cors());
//app.use("*", cors());

app.use(express.json());
// app.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// });

app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});


// DB Config
const MongoURI = require("./config/config").MongoURI;

// Connect to MongoDB Client
mongoose
  .connect(MongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected successfully ..."))
  .catch(err => console.log(err));

// app.options("*", cors());


let users = require("./routes/users");
app.use(users);

//400
app.use((req, res, next) => {
  res.status(400).send("400 : Page not found !");
});

// 500
app.use((err, req, res, next) => {
  res.status(500).send("500 : Interval server error !");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Listening at port ${PORT}...`));

//Mongodb Demo
// let demo = require('./service/demo');
// app.use(demo);
//Mongodb Demo End
