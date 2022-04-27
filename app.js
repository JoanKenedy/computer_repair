const express = require('express');

// Routes

const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');

// Utils

const { db } = require('./utils/database');

//Init express app
const app = express();

// Dummy data

// Enable incoming JSON data

app.use(express.json());

// Enpoints
// http://localhost:4000/api/v1/users
app.use('/api/v1/users', usersRouter);

// http://localhost:4000/api/v1/repairs
app.use('/api/v1/repairs', repairsRouter);

db.authenticate()
  .then(() => console.log('Conectado exitosamente a la base de datos'))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log('Datos sincronizados'))
  .catch((err) => console.log(err));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express app runnning on port ${PORT} `);
});
