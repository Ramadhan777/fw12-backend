const express = require("express")

const app = express()

app.get('/', (req, res) => {
    return res.status(200).send("backend running")
})

app.listen(8888, () => {
    console.log("app listening on port 8888")
})
