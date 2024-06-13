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

  if (date !== undefined && fall !== undefined) {
    try {
      const db = admin.database();
      const ref = db.ref('falls');
      await ref.push({ date, fall });

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

exports.getHistoricalSensorData = async (req, res) => {
  try {
    const db = admin.database();
    const ref = db.ref('falls');
    const snapshot = await ref.once('value');

    const data = snapshot.val();
    const historicalData = Object.keys(data).map(key => {
      return {
        date: data[key].date,
        fall: data[key].fall
      };
    });
    console.error('Success fetching historical sensor data:', historicalData);

    res.status(200).json(historicalData);
  } catch (error) {
    console.error('Error fetching historical sensor data:', error);
    res.status(500).send('Error fetching historical sensor data');
  }
};

