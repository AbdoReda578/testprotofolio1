require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Deta Space uses port 8080

// CORS configuration for production
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(bodyParser.json());

// Google Sheets credentials - handles both local and production
let credentials;
let sheets;

try {
  if (process.env.GOOGLE_CREDENTIALS) {
    // Production: Use environment variable
    credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  } else {
    // Local: Use file path
    const credentialsPath = path.join(__dirname, '../../../savejobs1-965277b38d22.json');
    credentials = require(credentialsPath);
  }

  const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  sheets = google.sheets({ version: 'v4', auth });
  console.log('✅ Google Sheets initialized successfully');
} catch (error) {
  console.warn('⚠️ Google Sheets not configured - will rely on Telegram only');
  console.warn('Error:', error.message);
}

app.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  const values = [[firstName, lastName, email, phone, message]];

  console.log("Request body: ", req.body);

  // Try Telegram first if credentials are configured
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      const telegramMessage = `📬 New Contact Form Submission

👤 Name: ${firstName} ${lastName}
📧 Email: ${email}
📱 Phone: ${phone || 'Not provided'}

💬 Message:
${message}`;

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        }
      );

      if (telegramResponse.ok) {
        console.log('✅ Telegram sent successfully');
        return res.status(200).json({ code: 200, message: 'Message sent successfully.' });
      } else {
        console.log('⚠️ Telegram failed, falling back to Google Sheets');
      }
    } catch (telegramError) {
      console.error('⚠️ Telegram error:', telegramError.message);
      console.log('Falling back to Google Sheets');
    }
  } else {
    console.log('⚠️ Telegram credentials not configured, using Google Sheets');
  }

  // Fallback to Google Sheets
  if (!sheets) {
    console.error('❌ Google Sheets not configured and Telegram failed');
    return res.status(500).json({ code: 500, message: 'Unable to send message. Please try again later.' });
  }

  try {
    const range = process.env.GOOGLE_SHEETS_SHEET_NAME
      ? `${process.env.GOOGLE_SHEETS_SHEET_NAME}!A1`
      : 'datasheetproto1!A1';

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '1zH46jNtr8HbzJazvxgXIeUecf7JmwojWHtW2h1AGUEU',
      range: range,
      valueInputOption: 'RAW',
      resource: {
        values: values
      },
    });

    console.log('✅ Google Sheets backup successful');
    res.status(200).json({ code: 200, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('❌ Both Telegram and Google Sheets failed');
    console.error('Error:', JSON.stringify(error, null, 2));
    res.status(500).json({ code: 500, message: 'An error occurred while sending your message.' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
