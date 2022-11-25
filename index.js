const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./src/routes'))

app.listen(8888, () => {
    console.log("app listening on port 8888")
})
