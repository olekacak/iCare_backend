const admin = require('firebase-admin');

let latestSensorData = { date: null, fall: false };

exports.postSensorData = (req, res) => {
  const { date, fall } = req.body;
  latestSensorData = { date, fall };
  console.log('Data received:', { date, fall });
  res.sendStatus(200);
};

exports.getSensorData = (req, res) => {
  res.json(latestSensorData);
};

exports.storeSensorData = async (req, res) => {
  const { date, fall } = req.body;

  if (date && fall !== undefined) {
    try {
      const db = admin.database();
      const ref = db.ref('falls');
      await ref.push({ date, fall });

      latestSensorData = { date, fall };  // Update latest data
      console.log('Data stored to Firebase:', { date, fall });

      res.status(200).send('Data sent to Firebase successfully');
    } catch (error) {
      console.error('Error sending data to Firebase:', error);
      res.status(500).send('Error sending data to Firebase');
    }
  } else {
    res.status(400).send('Invalid data');
  }
};
