const mongoose = require('mongoose')
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => {
    console.log('\x1b[35m', `Database Connected : ${process.env.DBURL}`
    )
}).catch(err => {
    console.error('\x1b[41m','Database Connection Error', err)
})