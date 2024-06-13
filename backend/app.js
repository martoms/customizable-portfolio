const express = require('express');
const cors = require('cors');
const homeRoutes = require('./routes/homeRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.listen(4000, (err) => {
    if (err) {
      console.error('Failed to start server:', err.message);
    } else {
      console.log('Now listening to port 4000!');
    }
  });

app.use(homeRoutes);