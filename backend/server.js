const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const bp = require('body-parser')
const cookieParser = require("cookie-parser")
const connectDB = require('./db')
const userRoutes = require('./routes/userRoutes.js')

connectDB()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json({ hello: 'world' })
})


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))