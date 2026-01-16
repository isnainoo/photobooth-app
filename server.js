const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Photobooth App berjalan di http://localhost:${port}`);
});