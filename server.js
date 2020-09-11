const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Initial Middleware
app.use(express.json({ extended: false }));
// instead of this we used to do bodyParser.json();, its because now bodyParser is builtin in express framework

app.get('/', (req, res) => res.send('API running'));

// Defining routes
app.use('/api/users', require('./routes/api/users')); //we can import the file in two ways the one is shown and another is common way

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
