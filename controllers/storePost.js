const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = (req,res)=>{
    let image = req.files.image;
    // console.log(image.name);
    // console.log(path.resolve(__dirname,'public/img',image.name));
    image.mv(path.resolve(__dirname,'..','public/img',image.name),async(error) => {
    await BlogPost.create({...req.body,
    image: '/img/' + image.name})
    res.redirect('/')
    })
}
