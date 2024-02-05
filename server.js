const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'REST service operational' });
});
// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
const file = req.files.file;
console.log('from req.files', req.files.file);

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    } 

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
const port = 5000;

app.listen(port, () => console.log(`Server Started...at port ${port}`));
