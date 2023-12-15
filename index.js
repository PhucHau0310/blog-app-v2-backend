const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');

const authRoute = require('./Routes/auth');
const postRoute = require('./Routes/post');
const avaRoute = require('./Routes/avatar');
const userRoute = require('./Routes/user');

const app = express();

dotenv.config();

app.use(
    cors({
        origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
        // credentials: true,
    })
);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     if (req.method === 'OPTIONS') {
//         res.sendStatus(204);
//     } else {
//         next();
//     }
// });
// app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/v1/uploads', express.static('uploads/'));

// Connect DB
connectDB();

// Routes
app.use('/v1/auth', authRoute);
app.use('/v1/post', postRoute);
app.use('/v1/ava', avaRoute);
app.use('/v1/user', userRoute);

app.get('/v1', (req, res) => {
    res.status(200).json('Hello to my app blog');
});

app.listen(process.env.PORT || 9090, () => {
    console.log('Server is running ...');
});
