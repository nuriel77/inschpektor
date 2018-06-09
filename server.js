/* eslint-disable no-param-reassign */
const express = require('express');
const axios = require('axios');
const history = require('connect-history-api-fallback');

const app = express();

app.set('port', (process.env.PORT || 3000));

if (process.env.NODE_ENV === 'production') {
  // Enables 'external' routing
  app.use(history());
  // Middleware, only static files
  app.use(express.static(path.join(__dirname, '/dist')));
}

// A fake API token our server validates
const API_TOKEN = 'D6W69PRgCoDKgHZGJmRUNA';

// Make things more noticeable in the UI by introducing a fake delay
// to logins
const FAKE_DELAY = 500; // ms
app.post('/login', (req, res) => {
  setTimeout(() => (
    res.json({
      success: true,
      token: API_TOKEN,
    })
  ), FAKE_DELAY);
});

app.get('/api/coins', function(req, res) {
  console.log('fetching coins...')
  axios.get('https://api.coinmarketcap.com/v2/ticker/?limit=100')
    .then(function(response) {
      console.log('Success!')
      res.setHeader('Cache-Control', 'no-cache');
      res.json(response.data);
    })
    .catch(function(error) {
      console.log('Failed!', error)
    })
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
