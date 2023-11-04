const express = require('express');
const bodyParser = require('body-parser')
// ------------Importing Routes---------------
const adminRoute = require('./routes/adminRoute')
const facultyRoute = require('./routes/facultyRoute')
const studentRoute = require('./routes/studentRoute');
const authMiddleware = require('./middleware/authMiddleware')
const markedAttendance = require('./controllers/markedAttendance')
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
const session = require('express-session');

app.use(session({
    secret: 'abhinav', 
    resave: false,
    saveUninitialized: false
}));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
app.set('view-engine', 'ejs')

app.get('/marking', markedAttendance);

app.use('/auth', authMiddleware.router)

app.use('/admin', authMiddleware.isAdmin, adminRoute);
app.use('/faculty', authMiddleware.isFaculty, facultyRoute);
app.use('/student', authMiddleware.isStudent, studentRoute);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'))
})
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'html', '404.html'));

})


app.listen(3000, () => {
    console.log("Server Listening on http://localhost:3000");

});




// const plaintextPassword = 'password';

// const saltRounds = 10;
// bcrypt.genSalt(saltRounds, function (err, salt) {
//     if (err) {
//         console.error(err);
//     } else {
//         bcrypt.hash(plaintextPassword, salt, function (err, hash) {
//             if (err) {
//                 console.error(err);
//             } else {
//                 console.log('Hashed Password:', hash);
//             }
//         });
//     }
// })
// $2b$10$16MsiFej61u3ULfsQzdeLuakUOZcAAFpMLL7QEDL40C0pJBR7WIKi