const express = require('express')
const app = new express();
const path = require('path');
const ejs = require('ejs');
const BlogPost = require('./models/BlogPost.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const expressSession = require('express-session')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/my_database', {useNewUrlParser: true});

const validateMiddleWare = require('./middleware/validationMiddleware')

global.loggedIn = null;



app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(fileUpload());
app.use('/posts/store',validateMiddleWare);
app.listen(4000, ()=>{
console.log('App listening on port 4000')
})
app.use('*',(req,res, next)=> {
    loggedIn = req.session.userId;
    next()
});

app.get('/',homeController);

// app.get('/about',(req,res)=>{
//     res.render('about')
//     })
// app.get('/contact',(req,res)=>{
//     res.render('contact')
//     })


// new post, specific post, create post
app.get('/post/:id',getPostController)    
app.get('/posts/new',authMiddleware,newPostController);
app.post('/posts/store',authMiddleware, storePostController)
// new user register
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController);
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)
//login
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

// log out 
app.get('/auth/logout',logoutController)
app.use((req,res)=> {res.render('notfound')});