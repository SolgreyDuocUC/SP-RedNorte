const axios = require('axios');

async function test() {
  try {
    console.log("Logging in...");
    const loginRes = await axios.post('http://localhost:8002/api/v1/patients/auth/login', {
      identifierValue: "26823184-6",
      password: "M26823184-6"
    });
    console.log("Login Success! Token:", loginRes.data.accessToken);
    const token = loginRes.data.accessToken;
    const userId = loginRes.data.id;

    console.log(`Fetching patient ${userId}...`);
    const getRes = await axios.get(`http://localhost:8011/api/v1/patients/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Get Success! Data:", getRes.data);
  } catch (err) {
    if (err.response) {
      console.error(`Error! Status: ${err.response.status}`);
      console.error("Data:", err.response.data);
    } else {
      console.error("Error:", err.message);
    }
  }
}

test();
