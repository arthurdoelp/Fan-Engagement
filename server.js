// Config .env to ./config/config.env
require('dotenv').config({
  path: './config/config.env'
});

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const app = express();

// Body Parser
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(cors());
app.use(morgan('dev'));

//Load all routes

const artistRouter = require('./routes/artist.route');
const eventRouter = require('./routes/event.route');
const ratingRouter = require('./routes/rating.route');
const tipRouter = require('./routes/tip.route');
const userRouter = require('./routes/user.route');


//Use Routes
app.use('/fan/api/', artistRouter);
app.use('/fan/api/', eventRouter);
app.use('/fan/api/', ratingRouter);
app.use('/fan/api/', tipRouter);
app.use('/fan/api/', userRouter);

app.use( (req, res, next) => {
  res.status(404).json({
      success: false,
      message: "Page not found"
  })
});

var port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Yay! The server is running on port: " + port);
})