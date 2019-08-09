const Dev = require('../models/dev')

const store = async (req, res) => {
    const { devId } = req.params
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)
    const targetDev = await Dev.findById(devId)

    if (!targetDev)
        return res.status(400).send({ error: 'Dev not exists' })

    if (targetDev.likes.includes(user)){
        const loggedSocket = req.connectUsers[user]
        const targetSocket = req.connectUsers[devId]

        if (loggedSocket) {
            req.io.to(loggedSocket).emit('match', targetDev)
        }
        if (targetSocket) {
            req.io.to(targetSocket).emit('match', loggedDev)
        }
    }
        
    loggedDev.likes.push(targetDev._id)
    await loggedDev.save()

    return res.json(loggedDev)
}

exports.controller = {
    store,
}