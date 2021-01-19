const express = require('express')
const router = express.Router()
const TrelloService = require('../services/trello')

const trelloService = new TrelloService()

router.get('/pizza-board', function(req, res, next) {
  trelloService.getPizzaBoardInfo()
    .then(result => res.json(result))
    .catch(next)
});

module.exports = router;
