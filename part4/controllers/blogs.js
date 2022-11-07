const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')




blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name:1 })


    response.json(blogs)
})


 
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user



    if(body.title && body.url) {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id

        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)

    } else {
        response.status(400).end()
    }
  
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    const user = request.user
    console.log(user)
    const blog = await Blog.findById(request.params.id)

    if(!blog) {
        return response.status(404).json({ error: 'blog not found'})
    }

    if(blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()

    } else {

        return response.status(401).json({ error: 'user names do not match for blog'})
    }

    
})

module.exports = blogsRouter

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body


    console.log(body, 'this is what is in the backend')

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user.id
    }

    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    console.log(updatedNote, 'is what is being sent back')
    response.status(201).json(updatedNote)
})