const express = require('express')
var cors = require('cors')


const app = new express()
app.use(cors())
app.use(express.json())


const usersRouter = require('./routes/users')
const adminRouter = require('./routes/admin')

app.use('/users',usersRouter)
app.use('/admin',adminRouter);

app.listen(8000,() =>
{
    console.log("server started")
})