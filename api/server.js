const express = require('express')
const app = express()
const PORT = process.env.PORT ||4000
const path = require('path')

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

app.listen(PORT, () => console.log(`server running on port ${PORT}`))