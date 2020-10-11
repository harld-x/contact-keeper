const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) =>
    res.json({msg: 'Welcome to the ContactAPI...'}))

const PORT = process.env.PORT || 5000


app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.user(express.static('client-build'))

    app.get('*',
        (req,res) =>
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))