//  

const admin = require('firebase-admin');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Authenticate the user with Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);

    // If user exists, attempt to sign in with the provided password
    await admin.auth().signInWithEmailAndPassword(email, password);

    // If signInWithEmailAndPassword succeeds, return a custom token for the user
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    // Return the custom token to the client
    res.json({ token: customToken });
  } catch (error) {
    // If an error occurs during authentication, return an error
    console.error('Error authenticating user:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// user signup
exports.signup = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  try {
    console.log('Received email:', email);
    console.log('Received password:', password);

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email or password is missing' });
    }

    // Sign up the user with Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    console.log('User record created:', userRecord.toJSON());

    // Return success response
    return res.status(200).json({ message: 'User signed up successfully', user: userRecord.toJSON() });
  } catch (error) {
    console.error('Error creating user:', error); // Log the error to the console
    return res.status(500).json({ error: 'Failed to create user' });
  }
};