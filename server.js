const express = require('express'); // Express framework for building web applications
const multer = require('multer'); // Multer for handling file uploads
const path = require('path');
const fs = require('fs'); // File system module for interacting with the file system
const cors = require('cors');


// Create an instance of the Express application
const app = express();

// Specify the port number for the server to listen on
const port = 8080;

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the filename of the uploaded file to its original name
    cb(null, file.originalname);
  }
});

// Set up multer upload configuration
const upload = multer({ storage });

// Handle file upload
app.post('/upload', upload.fields([{ name: 'file' }]), (req, res) => {

  // Check if any files were uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    // If no files were uploaded, send a response with an error status code and message
    res.status(400).send('No files uploaded.');
    return;
  }

  // If files were uploaded, send a response indicating successful upload
  res.send('Files uploaded successfully.');
});

// Handle file download
app.get('/download/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', fileName);

  if (!fs.existsSync(filePath)) {
    res.status(404).send('File not found.');
    return;
  }

  res.download(filePath, fileName);
});


app.use(cors());

// Retrieve list of uploaded files
app.get('/files', (req, res) => {
  const uploadDir = path.join(__dirname, 'uploads');
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to retrieve file list.');
      return;
    }
    res.send({ files });
  });
});



app.delete('/remove/:filename', (req, res) => {
  const fileName = decodeURIComponent(req.params.filename); // Decode the file name
  const filePath = path.join(__dirname, 'uploads', fileName);

  if (!fs.existsSync(filePath)) {
    res.status(404).send('File not found.');
    return;
  }

  try {
    fs.unlinkSync(filePath); // Use fs.unlinkSync for synchronous file removal
    res.send('File removed successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to remove file.');
  }
});




// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log('Visit http://localhost:8080/');
});

// PERFECTLY SHOWS THE LIST OF FILES UPLOADED AND THE DOWNLOAD OPTION WITH THEM