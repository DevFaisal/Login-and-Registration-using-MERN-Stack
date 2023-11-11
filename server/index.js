const express = require('express')
const app = express()
const PORT = 8000
const router = require("./router/User")
const connectDB = require('./connection')


app.use('/user', router);
app.use(express.json())

express.urlencoded({ extended: true })
connectDB();

app.listen(PORT, () => {
    console.log("Server has Started", PORT);
})

