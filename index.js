require("dotenv").config({
    path: ".env",
  });

const express = require("express")
const cors = require("cors")

const app = express()

app.use("/assets/uploads/profile", express.static("uploads/profile"));
app.use("/assets/uploads/movie", express.static("uploads/movie"));

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/', require('./src/routes'))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})
