const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'lms_secret',
  resave: false,
  saveUninitialized: true
}));

app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.redirect('/login.html');
  });
  
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
