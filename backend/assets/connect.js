const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://samuel:monteiro@cluster0-ku2kl.mongodb.net/tindev?retryWrites=true&w=majority' , { useNewUrlParser: true });
