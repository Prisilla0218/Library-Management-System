const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=? AND role=?",
    [username, password, role],
    (err, result) => {
      if (result.length > 0) {
        req.session.user = username;
        req.session.role = role;

        db.query(
          "INSERT INTO login_logs(username,role,login_time) VALUES (?,?,NOW())",
          [username, role]
        );

        res.redirect(role === 'admin' ? '/admin.html' : '/user.html');
      } else {
        res.send("Invalid Login");
      }
    }
  );
});

router.get('/logout', (req, res) => {
  db.query(
    "UPDATE login_logs SET logout_time=NOW() WHERE username=? AND logout_time IS NULL",
    [req.session.user]
  );
  req.session.destroy();
  res.redirect('/login.html');
});

module.exports = router;
