const express = require('express');
const router = express.Router();
const Recod = require('./Model/Record')
const multer = require("multer")
const fs = require('fs')

const {
  addRecord,
  updateRecord,
  deleteRecord,
  createRecord
} = require('./controlar/Recod-controlar');
const { dirxml } = require('console');

// Add a record
router.post('/', addRecord);

// Update a record
router.put('/:id', updateRecord);

// Delete a record
router.delete('/:id', deleteRecord);

// add imeges 
// Configure multer storage

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    var dir = "./uploads";
    console.log(dir)
    if(!fs.existsSync(dir)){// Specify the directory where you want to save the uploaded images
          fs.mkdirSync(dir)
  }
        callback(null, dir)
  },
  filename: function(req, file, callback){
    callback(null, file.originalname); // Use the original filename for the uploaded image
  }
});


const upload = multer({ storage:storage}).array('files', 12);


// Route for creating a record
router.post('/add', (req,res,next)=>{
    upload(req, res, function(err){
      if(err){
        return res.send("something is wet wrong")
      }
      res.send('file uploaded' + req)
    })
    // next();
});

module.exports = router;
