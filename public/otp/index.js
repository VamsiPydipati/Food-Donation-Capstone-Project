const express = require('express');
const fast2sms = require('fast-two-sms');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Default phone number and message for testing
const defaultNumber = '8374036276'; // Replace with your number
const defaultMessage = 'This is a default test message. Your OTP code is 1234.';

app.post('/sendMessage', async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const message = req.body.message || defaultMessage;
        const number = req.body.number || defaultNumber;

        console.log(`Message to send: ${message}`);
        console.log(`Number to send to: ${number}`);

        const response = await fast2sms.sendMessage({
            authorization: process.env.API_KEY,
            message: message,
            numbers: [number]
        });

        console.log('Fast2SMS API response:', response);

        res.send({ return: true, status_code: response.status_code, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send({ return: false, status_code: 500, message: 'Internal Server Error' });
    }
});


app.get('/', (req, res) => {
    console.log('Rendering index.ejs');
    res.render('index.ejs');
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
