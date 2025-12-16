const express = require('express');
const db = require('../db');
const router = express.Router();

// VIEW BOOKS (+5 points)
router.get('/books',(req,res)=>{
  db.query("SELECT * FROM books",(err,data)=>{
    db.query(
      "INSERT INTO points VALUES (?,5) ON DUPLICATE KEY UPDATE points=points+5",
      [req.session.user]
    );
    res.json(data);
  });
});

// RATE BOOK (+10 points)
router.post('/rate',(req,res)=>{
  const { book_id, rating } = req.body;

  db.query(
    "INSERT INTO ratings(username,book_id,rating) VALUES (?,?,?)",
    [req.session.user, book_id, rating]
  );

  db.query(
    "UPDATE points SET points=points+10 WHERE username=?",
    [req.session.user]
  );

  res.send("Rated");
});

module.exports = router;
