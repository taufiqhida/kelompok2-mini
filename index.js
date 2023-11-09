const express = require('express'),
app = express(),
PORT = process.env.PORT || 9000,
router = require('./routes/router')

require('dotenv').config()
app.use(express.json({strict: false}))
app.use('/api/v1', router) // Grupkan API

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
