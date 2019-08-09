const Dev = require('../models/dev')
const axios = require('axios')

const index = async (req, res) => {
    const { user } = req.headers

    const loggedDev = await Dev.findById(user)

    const users = await Dev.find({
        $and: [
            { _id: { $ne: user } },
            { _id: { $nin: loggedDev.likes } },
            { _id: { $nin: loggedDev.dislikes } },
        ]
    })

    return res.json(users)
}

const store = async (req, res) => {
    const { username } = req.body

    const userExists = await Dev.findOne({ user: username })

    if (userExists)
        return res.send(userExists)


    const response = await axios.get(`https://api.github.com/users/${username}`)
    const { name, bio, avatar_url: avatar } = response.data

    const dev = await Dev.create({
        name,
        user: username,
        bio,
        avatar
    })

    return res.send(dev)
}

exports.controller = {
    store,
    index
}