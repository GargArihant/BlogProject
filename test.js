const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
mongoose.connect('mongodb://127.0.0.1:27017/my_databasecy', {useNewUrlParser: true});
BlogPost.create({
    title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
    body: 'If you have been here a long time, you might remember when I went on ITV Tonight to'
    }, (error, blogpost) =>{
    console.log(error,blogpost)
    })
    mongoose.set('strictQuery', false);