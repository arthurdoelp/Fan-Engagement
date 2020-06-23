const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Config .env to ./config/config.env
require('dotenv').config({
  path: './config/config.env'
});

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

// const authRouter = require('./routes/auth.route');
// const retailerRouter = require('./routes/retailer.route');
// const sommelierRouter = require('./routes/sommelier.route');


//Use Routes
// app.use('/api/', authRouter);
// app.use('/api/', retailerRouter);
// app.use('/api/', sommelierRouter);

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