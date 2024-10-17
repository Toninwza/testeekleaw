const express = require('express'); 
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const ACCESS_TOKEN = 'TUa8ce2d039ad7aeafd9ab6e229473ad9bf30e29ae6737b0f991266fb1544d5b29d1bf2ef2067e4a7254b126e385a722d6';

app.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const response = await axios.post('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
      Username,
      Password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Application-Key': ACCESS_TOKEN
      }
    });

    const data = response.data;

    if (data.status === true) {
      res.json({
        message: 'Login successful',
        email: data.email,
        username: data.username,
        displayname_en: data.displayname_en,
        faculty: data.faculty
      });
    } else {
      res.status(401).json({
        message: 'Login failed: ' + data.message
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'An error occurred: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
