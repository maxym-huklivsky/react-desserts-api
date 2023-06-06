const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Database connection successful. Server running. Use our API on port: ${PORT}`);
    }),
  )
  .catch((err) => {
    console.log(`Database connected with error: ${err}`);
    process.exit(1);
  });
