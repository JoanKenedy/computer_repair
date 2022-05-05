const express = require('express');

// Routes

const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');
const { User } = require('./models/user.model');
const { Repair } = require('./models/repair.model');

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

// Global error handler
app.use('*', (err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    error: err,
  });
});

db.authenticate()
  .then(() => console.log('Conectado exitosamente a la base de datos'))
  .catch((err) => console.log(err));

db.sync({ force: true })
  .then(() => console.log('Datos sincronizados'))
  .catch((err) => console.log(err));
// User.hasMany(Post, { foreignKey: 'userId' });
User.hasMany(Repair);
Repair.belongsTo(User);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app runnning on port ${PORT} `);
});
