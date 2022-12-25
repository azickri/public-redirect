const express = require('express');
const axios = require('axios');

const app = express();
app.use(cors())

app.get('/redirect-url', async (req, res) => {
  console.log('REQUEST', req.query.url);

  try {
    if(!isMatchUrl(req.query.url)) {
      throw new Error('hehe');
    }

    const request = await axios.get(req.query.url, {
      timeout: 2000,
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
      }
    });

    return res.send(request.request.res?.responseUrl);
  } catch(error) {
    const url = error.request._currentUrl;
    if(url) return res.send(url);
    
    return res.status(500).send('bojomuuuuu');
  }
})

function isMatchUrl(url) {
  if(url.match('tiktok')) return true;

  return false;
}

app.listen('3000', () => {
  console.log('listening...');
});