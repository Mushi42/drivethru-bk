//Import the mongoose module
const mongoose = require('mongoose');
//Set up default mongoose connection
mongoose
    .connect(process.env.CLOUD_MONGODB_KEY, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log(`MongoDb Connection :: Connected to ${process.env.CLOUD_MONGODB_KEY}`))
    .catch(err => console.log(`MongoDb Connection Error:: ${process.env.CLOUD_MONGODB_KEY} :: ${err}`))
