const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use("/common",      express.static('resource/common'));
app.use("/components",  express.static('resource/components'));

app.get('/a', (req, res) => {
  res.send('Hello World!')
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});