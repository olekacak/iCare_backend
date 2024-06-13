const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.post('/', sensorController.postSensorData);
router.get('/', sensorController.getSensorData);
router.post('/store', sensorController.storeSensorData);
router.get('/firebase', sensorController.getHistoricalSensorData); // New route for fetching historical data

module.exports = router;