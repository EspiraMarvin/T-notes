require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions =  require('./config/corsOrigin')
const connectDb = require('./config/dbConn')
const mongoose = require('mongoose')

const PORT = process.env.PORT ||4000

console.log(process.env.NODE_ENV)

connectDb()

// save logs to file middleware
app.use(logger)

app.use(cors(corsOptions))

// middleware to use json
app.use(express.json())

// middleware passes cookies
app.use(cookieParser()) 

// middleware to serve static/html content
app.use('/', express.static(path.join(__dirname, '/public'))) 

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
// 404 not found error
    res.status(404)
    if ((req.accepts('html'))){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if (req.accepts('json')){
        res.json({ message:'"4040 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }

})

app.use(errorHandler) // error handler middleware
console.log('eror handler middleware passed')

mongoose.connection.once('open',  () => {
    console.log('connected to mongo db')
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
} )