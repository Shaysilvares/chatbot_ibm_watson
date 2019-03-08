const express = require('express');
const bodyParser = require('body-parser');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const app = express();
app.use(bodyParser.json());
app.use(express.static('./public'))

const port = 3000;

const assistant = new AssistantV1({
  username: 'apikey',
  password: 'oYYj20c-TyuPoVnoJpQEHIwfh8v4EDOkWiMYo0jlB8aU',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2019-03-08',
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id:'39e9972a-29f5-4214-b3c0-71cef0fd0fd4',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));