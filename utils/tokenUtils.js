// // tokenUtils.js

// const admin = require('firebase-admin');

// // Function to generate a custom token for a user
// const generateCustomToken = async (userId) => {
//   try {
//     const customToken = await admin.auth().createCustomToken(userId);
//     return customToken;
//   } catch (error) {
//     console.error('Error generating custom token:', error);
//     throw error;
//   }
// };

// module.exports = {
//   generateCustomToken,
// };