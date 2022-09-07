const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { initDB } = require('./common/db')
//enable cors
const cors = require("cors")
const { todoRouter } = require('./controller/todos')

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

dotenv.config();

app.use(cors(corsOptions))

//enable send json
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.use(express.json());
app.use(todoRouter);
app.listen(4000, () => console.log("Server Up and running"));

//connection to db
initDB();

