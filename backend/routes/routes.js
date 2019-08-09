const router = require('express').Router()
const dev = require('../controllers/dev') 
const like = require('../controllers/like') 
const dislike = require('../controllers/dislike') 

router.get('/devs', dev.controller.index)
router.post('/devs', dev.controller.store)
router.post('/devs/:devId/likes', like.controller.store)
router.post('/devs/:devId/dislikes', dislike.controller.store)

module.exports = router