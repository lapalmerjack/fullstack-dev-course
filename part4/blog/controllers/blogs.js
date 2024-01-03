const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/',  middleware.userExtractor, async (request, response) => {
    const  body = request.body
    const user = request.user

    if(!body.title || !body.url) {
        response.status(400).end()
    }
    console.log('past the end')

    const savedBlog = await new Blog({
        ...body,
        likes: body.likes || 0,
        user: user.id
    }).save()

    await savedBlog.populate('user')
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user
    console.log(user, 'is my user')
    const blog = await Blog.findById(request.params.id)
    console.log('my blog', blog)



    if(!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    if(blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()

    } else {

        return response.status(401).json({ error: 'user names do not match for blog' })
    }

})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    }
    console.log('This is the request param ', request.params.id )
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    console.log('Updated Blog from backend ', updatedBlog)
    await updatedBlog.populate('user')
    await user.save()
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter