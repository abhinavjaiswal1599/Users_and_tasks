const axios = require('axios');

// Function to authenticate and obtain token
async function getToken(username, password) {
  try {
    const response = await axios.post('http://localhost:6000/authenticate', {
      username,
      password
    });
    // Assuming the token is returned in the response data
    return response.data.token;
  } catch (error) {
    console.error('Authentication failed:', error.response.data);
    throw new Error('Authentication failed');
  }
}

module.exports = getToken;
