const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser'); // Import body-parser

const authRoutes = require('./routes/authRoutes');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Firebase Admin SDK
const serviceAccount = require('./config/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://icare-f2f42-default-rtdb.firebaseio.com',
});

// Set up body-parser middleware
app.use(bodyParser.json({ limit: '10mb' })); // Adjust limit as per your requirement
app.use(bodyParser.urlencoded({ extended: true }));


// Set up body-parser middleware
app.use(bodyParser.json({ limit: '10mb' })); // Adjust limit as per your requirement
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/sensor', sensorRoutes);

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
