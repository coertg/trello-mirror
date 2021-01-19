# Trello mirror

This app shows a trello board, and allows some interaction with it.

## Config required
This app reads config from `api/.env`. The `.env` file will look as follows:

```
TRELLO_HOST='https://api.trello.com'
TRELLO_API_KEY='<your_key>'
TRELLO_API_TOKEN='<your_token>'
```

## Tools used
`express-generator` was used to set up the initial express app.

`create-react-app` was used to set up the initial react app.