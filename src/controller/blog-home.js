const xss = require('xss')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')

async function create({content, image,userId}) {
    // services
    try{
        const blog = await createBlog({
            userId,
            content:xss(content),
            image
        })
        return new SuccessModel(blog)
    }catch(err){
        console.log(err.message, err.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}