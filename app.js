// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const patientsRouter = require('./routes/routes/patient');
const doctorsRouter = require('./routes/routes/routes/doctors');
const appointmentsRouter = require('./routes/routes/routes/routes/appointments');
const dashboardRouter = require('./routes/routes/routes/routes/routes/dashboard');

const app = express();
app.use(bodyParser.json());

// CORS for testing with Postman or frontend (allow all for dev)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/patients', patientsRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/dashboard', dashboardRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MediAssist API running on port ${PORT}`);
});
