const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const bp = require('body-parser')
const cookieParser = require("cookie-parser")
const connectDB = require('./db')
const userRoutes = require('./routes/userRoutes.js')
const path = require('path')
const APPDIR = path.resolve()
connectDB()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get('/hello', (req, res) => {
  res.json({ hello: 'world' })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(APPDIR, 'frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.join(APPDIR, 'frontend/build/index.html')))
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))