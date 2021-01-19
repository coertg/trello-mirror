const fetch = require('node-fetch')
const NotFoundError = require('./not-found-error')
require('dotenv').config()
const { URL, URLSearchParams } = require('url')

class TrelloService {
  constructor(){
    this.host = process.env.TRELLO_HOST
    this.apiKey = process.env.TRELLO_API_KEY
    this.apiToken = process.env.TRELLO_API_TOKEN

    this.boardName = 'The Pizza Project'
  }

  getPizzaBoardInfo(){
    let url = new URL(`${this.host}/1/members/me/boards`)
    url.search = new URLSearchParams({
      key: this.apiKey,
      token: this.apiToken,
      fields: 'name'
    }).toString()
    return fetch(url)
      .then( boardListResult => {
        switch (boardListResult.status){
          case 200: return boardListResult.json()
          case 404: throw NotFoundError('Could not find Trello boards')
          default: throw Error(`Trello boards call responded with ${boardListResult.status}`)
        } 
      })
      .then( json => {
        if(Array.isArray(json)){
          const possibleBoard = json.find(o => o.name === this.boardName)
          if(possibleBoard)
            return possibleBoard
          else 
            throw NotFoundError(`Could not find a Trello board named "${this.boardName}"`)
        } else throw TypeError('Trello boards call did not return an array')
      })
      .then( board => {
        if(board.id) 
          return Promise.all([
            this.getLists(board.id),
            this.getCards(board.id)
          ]).then( ([lists, cards]) => {
            return {...board, lists, cards}
          })
        else throw TypeError('Trello API did not provide board ID')
      })
      
  }

  getLists(boardId){
    let url = new URL(`${this.host}/1/boards/${boardId}/lists`)
    url.search = new URLSearchParams({
      key: this.apiKey,
      token: this.apiToken,
      fields: 'name'
    }).toString()
    return fetch(url)
      .then( listsResult => {
        switch (listsResult.status){
          case 200: return listsResult.json()
          case 404: throw NotFoundError('Could not find Trello lists')
          default: throw Error(`Trello lists call responded with ${listsResult.status}`)
        } 
      })
  }

  getCards(boardId){
    let url = new URL(`${this.host}/1/boards/${boardId}/cards`)
    url.search = new URLSearchParams({
      key: this.apiKey,
      token: this.apiToken,
      fields: 'name,idList'
    }).toString()
    return fetch(url)
      .then( listsResult => {
        switch (listsResult.status){
          case 200: return listsResult.json()
          case 404: throw NotFoundError('Could not find Trello cards')
          default: throw Error(`Trello cards call responded with ${listsResult.status}`)
        } 
      })
  }
}

module.exports = TrelloService