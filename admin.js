const express = require('express');
const db = require('../db');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req,file,cb)=>cb(null,file.originalname)
});
const upload = multer({ storage });

// ADD BOOK
router.post('/add', upload.single('pdf'), (req,res)=>{
  const { title, author } = req.body;
  const pdf = req.file.filename;

  db.query(
    "INSERT INTO books(title,author,pdf) VALUES (?,?,?)",
    [title, author, pdf],
    ()=>res.send("Book Added")
  );
});

// VIEW BOOKS
router.get('/books', (req,res)=>{
  db.query("SELECT * FROM books",(err,data)=>res.json(data));
});

// DELETE BOOK
router.get('/delete/:id',(req,res)=>{
  db.query("DELETE FROM books WHERE id=?", [req.params.id]);
  res.send("Deleted");
});

// VIEW LOGIN LOGS
router.get('/logs',(req,res)=>{
  db.query("SELECT * FROM login_logs",(err,data)=>res.json(data));
});

// VIEW POINTS
router.get('/points',(req,res)=>{
  db.query("SELECT * FROM points",(err,data)=>res.json(data));
});

module.exports = router;
