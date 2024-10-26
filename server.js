const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const credentialsPath = path.join(__dirname, '../../../savejobs1-965277b38d22.json');
const credentials = require(credentialsPath);

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

app.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  const values = [[firstName, lastName, email, phone, message]];

  console.log("Request body: ", req.body);  // Check the incoming request data

  try {
    const range = 'datasheetproto1!A1'; 
    const response = await sheets.spreadsheets.values.append({
      
      spreadsheetId: '1zH46jNtr8HbzJazvxgXIeUecf7JmwojWHtW2h1AGUEU',
      range: range,
      valueInputOption: 'RAW',
      resource: {
        "values": [
    [
      "Test Entry"
    ]
  ]
      },
    });
    
      res.status(200).json({ code: 200, message: 'Data sent to Google Sheets successfully.' });
  } catch (error) {
      console.error('Error appending data to Google Sheets:', JSON.stringify(error, null, 2)); // Improved error logging
      res.status(500).json({ code: 500, message: 'An error occurred while sending data to Google Sheets.' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
