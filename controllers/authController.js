const admin = require('firebase-admin');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate the user with Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);

    // If user exists, return a custom token for the user
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    // Retrieve user data from Firebase Realtime Database
    const userDataSnapshot = await admin.database().ref(`/users/${userRecord.uid}`).once('value');
    const userData = userDataSnapshot.val();

    // Return the custom token and user data to the client
    res.json({ token: customToken, user: userData });
  } catch (error) {
    // If an error occurs during authentication, return an error
    console.error('Error authenticating user:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};


// user signup
// Assuming this is your signup function in Node.js

exports.signup = async (req, res) => {
  const { email, password, name, phoneNo, address, birthDate, gender, profileImage } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email or password is missing' });
    }

    // Sign up the user with Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    // Save additional user data to Firebase Realtime Database
    const uid = userRecord.uid;
    const userData = {
      email,
      password, // Note: Saving password here; consider security implications
      name,
      phoneNo,
      address,
      birthDate,
      gender,
      profileImage
    };

    // Save user data to a specific path under `/users/${uid}`
    await admin.database().ref(`/users/${uid}`).set(userData);

    // Return success response
    return res.status(200).json({ message: 'User signed up successfully', user: userRecord.toJSON() });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
};



// Function to fetch user data by email
exports.getUserByEmail = async (req, res) => {
  const { email } = req.query;
  console.log("Email received:", email);

  try {
    // Authenticate the user with Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);

    // Retrieve user data from Firebase Realtime Database
    const userDataSnapshot = await admin.database().ref(`/users/${userRecord.uid}`).once('value');
    const userData = userDataSnapshot.val();

    // Return user data to the client
    res.json({ user: userData });
  } catch (error) {
    // If an error occurs during the process, return an error
    console.error('Error fetching user data:', error);
    res.status(404).json({ error: 'User not found' });
  }
};

// Function to update user profile data
exports.editUser = async (req, res) => {
  const email = req.params.email; // Retrieve email from URL parameter
  const userDataToUpdate = req.body; // Data to update, sent in request body

  try {
    // Retrieve user record from Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);
    const uid = userRecord.uid;

    // Update user data in Firebase Realtime Database
    await admin.database().ref(`/users/${uid}`).update(userDataToUpdate);

    // Optionally, you can fetch updated user data and return it as JSON response
    const updatedUserDataSnapshot = await admin.database().ref(`/users/${uid}`).once('value');
    const updatedUserData = updatedUserDataSnapshot.val();

    // Return updated user data as JSON response
    res.status(200).json({ user: updatedUserData });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};